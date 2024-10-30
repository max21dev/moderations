import { useNavigate, useParams } from 'react-router-dom';
import { useNewEvent } from 'nostr-hooks';

import { useToast } from '@/shared/components/ui/use-toast';

import { useGroup, useNip29Ndk } from '@/shared/hooks';

export const useGroupModeration = ({ groupId }: { groupId: string | undefined }) => {
  const { toast } = useToast();

  const navigate = useNavigate();

  const { relay } = useParams();

  const { nip29Ndk } = useNip29Ndk();

  const { group } = useGroup(groupId);

  const { createNewEvent } = useNewEvent({ customNdk: nip29Ndk });

  const toastError = ({ message }: { message: string }) => {
    toast({
      title: 'Error',
      description: message,
      variant: 'destructive',
    });
  };

  const deleteGroup = () => {
    if (!groupId || !group) return;

    const event = createNewEvent();
    event.kind = 9008;
    event.tags = [['h', groupId]];
    event.publish().then(
      (r) => {
        if (r.size > 0) {
          nip29Ndk.cacheAdapter?.deleteEvent?.(group.event);

          navigate(`/relays/${encodeURIComponent(relay || '')}/groups/`, { replace: true });
        } else {
          toastError({ message: 'Failed to delete group' });
        }
      },
      () => {
        toastError({ message: 'Failed to delete group' });
      },
    );
  };

  return {
    deleteGroup,
  };
};
