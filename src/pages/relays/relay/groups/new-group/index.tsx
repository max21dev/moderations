import { NDKEvent, NDKKind, NDKPublishError } from '@nostr-dev-kit/ndk';
import { Nip29GroupMetadata } from 'nostr-hooks/nip29';

import { useToast } from '@/shared/components/ui/use-toast';

import { Breadcrumbs } from '@/features/breadcrumbs';
import { GroupMetadataForm } from '@/features/groups';

import { useActiveRelay } from '@/shared/hooks';

export const NewGroupPage = () => {
  const { toast } = useToast();

  const { activeRelay } = useActiveRelay();

  const onSubmit = ({ about, isOpen, isPublic, name, picture }: Nip29GroupMetadata) => {
    // TODO: NIP-29 doesn't support creating groups yet
    toast({
      title: 'Error',
      description: 'Creating groups is not supported yet',
      variant: 'destructive',
      action: (
        <a
          href={decodeURIComponent(activeRelay || '')
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

    const event = new NDKEvent();
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

      <div className="w-full flex items-center">
        <h3>New Group</h3>
      </div>

      <GroupMetadataForm submitLabel="Create Group" onSubmit={onSubmit} />
    </>
  );
};
