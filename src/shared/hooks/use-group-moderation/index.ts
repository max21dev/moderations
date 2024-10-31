import { NDKKind } from '@nostr-dev-kit/ndk';
import { useNewEvent } from 'nostr-hooks';
import { useNavigate, useParams } from 'react-router-dom';

import { useToast } from '@/shared/components/ui/use-toast';

import { useGroupMetadata, useNip29Ndk } from '@/shared/hooks';
import { GroupMetadata } from '@/shared/types';

export const useGroupModeration = ({ groupId }: { groupId: string | undefined }) => {
  const { toast } = useToast();

  const navigate = useNavigate();

  const { relay } = useParams();

  const { nip29Ndk } = useNip29Ndk();

  const { metadataEvent } = useGroupMetadata(groupId);

  const { createNewEvent } = useNewEvent({ customNdk: nip29Ndk });

  const toastSuccess = ({ message }: { message: string }) => {
    toast({
      title: 'Success',
      description: message,
    });
  };

  const toastError = ({ message }: { message: string }) => {
    toast({
      title: 'Error',
      description: message,
      variant: 'destructive',
    });
  };

  const deleteGroup = () => {
    if (!groupId || !metadataEvent) return;

    const event = createNewEvent();
    event.kind = 9008;
    event.tags = [['h', groupId]];
    event.publish().then(
      (r) => {
        if (r.size > 0) {
          nip29Ndk.cacheAdapter?.deleteEvent?.(metadataEvent);

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

  const updateMetadata = (metadata: Omit<GroupMetadata, 'id'>) => {
    if (!groupId) return;

    const event = createNewEvent();
    event.kind = NDKKind.GroupAdminEditMetadata;
    event.tags = [
      ['h', groupId],
      ['name', metadata.name],
      ['about', metadata.about],
      ['picture', metadata.picture],
      [metadata.isPublic ? 'public' : 'private'],
      [metadata.isOpen ? 'open' : 'closed'],
    ];

    event.publish().then(
      (r) => {
        if (r.size > 0) {
          toastSuccess({ message: 'Group metadata updated' });
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
    updateMetadata,
  };
};
