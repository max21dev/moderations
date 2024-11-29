import {
  deleteGroup,
  editGroupMetadata,
  Nip29GroupId,
  Nip29GroupMetadata,
  Nip29Relay,
} from 'nostr-hooks/nip29';
import { useNavigate } from 'react-router-dom';

import { useToast } from '@/shared/components/ui/use-toast';

export const useGroupModeration = (relay: Nip29Relay, groupId: Nip29GroupId) => {
  const { toast } = useToast();

  const navigate = useNavigate();

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

  const handleDeleteGroup = () => {
    groupId &&
      deleteGroup({
        groupId,
        onError: () => {
          toastError({ message: 'Failed to delete group' });
        },
        onSuccess: () => {
          navigate(`/relays/${encodeURIComponent(relay || '')}/groups/`, { replace: true });
        },
      });
  };

  const handleEditMetadata = (metadata: Nip29GroupMetadata) => {
    groupId &&
      editGroupMetadata({
        groupId,
        metadata: metadata,
        onError: () => {
          toastError({ message: 'Failed to update metadata' });
        },
        onSuccess: () => {
          toastSuccess({ message: 'Metadata updated' });
        },
      });
  };

  return {
    handleDeleteGroup,
    handleEditMetadata,
  };
};
