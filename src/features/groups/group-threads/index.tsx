import { useGroupMetadata, useGroupThreads } from 'nostr-hooks/nip29';

import { Button } from '@/shared/components/ui/button';

import { CardContainer } from '@/shared/components/card-container';

import { GroupSummary } from '@/features/groups';
import { UserInfoRow } from '@/features/users';

import { useActiveGroupId, useActiveRelay } from '@/shared/hooks';

export const GroupThreads = () => {
  const { activeRelay } = useActiveRelay();
  const { activeGroupId } = useActiveGroupId();

  const { metadata } = useGroupMetadata(activeRelay, activeGroupId);
  const { threads, hasMoreThreads, loadMoreThreads } = useGroupThreads(activeRelay, activeGroupId);

  if (!activeGroupId) return null;

  return (
    <>
      <GroupSummary metadata={metadata} />

      <div className="flex flex-col gap-4">
        <CardContainer title={`Threads`}>
          {threads?.length == 0 ? (
            <p className="text-muted-foreground text-xs">Empty List</p>
          ) : (
            (threads || []).map((thread) => (
              <UserInfoRow
                key={thread.id}
                relay={activeRelay}
                groupId={activeGroupId}
                pubkey={thread.pubkey}
                openByDefault
              >
                <p className="truncate text-xs font-light">{thread.content}</p>
              </UserInfoRow>
            ))
          )}

          <Button
            variant="outline"
            className="w-full"
            onClick={() => loadMoreThreads(50)}
            disabled={!hasMoreThreads}
          >
            Load more
          </Button>
        </CardContainer>
      </div>
    </>
  );
};
