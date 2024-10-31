import { NDKKind, NDKPublishError } from '@nostr-dev-kit/ndk';
import { useNewEvent } from 'nostr-hooks';
import { useParams } from 'react-router-dom';

import { useToast } from '@/shared/components/ui/use-toast';

import { useNip29Ndk } from '@/shared/hooks';
import { GroupMetadata } from '@/shared/types';

import { Breadcrumbs } from '@/features/breadcrumbs';
import { GroupMetadataForm } from '@/features/groups';

export const NewGroupPage = () => {
  const { toast } = useToast();

  const { relay } = useParams();

  const { nip29Ndk } = useNip29Ndk();
  const { createNewEvent } = useNewEvent({ customNdk: nip29Ndk });

  const onSubmit = ({ about, isOpen, isPublic, name, picture }: Omit<GroupMetadata, 'id'>) => {
    // TODO: NIP-29 doesn't support creating groups yet
    toast({
      title: 'Error',
      description: 'Creating groups is not supported yet',
      variant: 'destructive',
      action: (
        <a
          href={decodeURIComponent(relay || '')
            .replace('wss://', 'https://')
            .replace('ws://', 'http://')}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 hover:underline"
        >
          Open Relay
        </a>
      ),
    });
    return;

    const event = createNewEvent();
    event.kind = NDKKind.GroupAdminCreateGroup;
    event.tags = [
      ['name', name],
      ['picture', picture],
      ['about', about],
      [isPublic ? 'public' : 'private'],
      [isOpen ? 'open' : 'closed'],
    ];
    event
      .publish()
      .catch(() => {
        if (event.publishError) {
          const ndkPublishError = event.publishError as NDKPublishError;
          const errors = ndkPublishError.errors.values();
          for (const error of errors) {
            console.error(error.message);
          }
        }
      })
      .then(() => {});
  };

  return (
    <>
      <Breadcrumbs />

      <div className="mb-4 w-full flex items-center">
        <h3>New Group</h3>
      </div>

      <GroupMetadataForm submitLabel="Create Group" onSubmit={onSubmit} />
    </>
  );
};
