import { useGroupMetadata, useGroupThreadComments } from 'nostr-hooks/nip29';

import { Button } from '@/shared/components/ui/button';

import { CardContainer } from '@/shared/components/card-container';

import { GroupSummary } from '@/features/groups';
import { UserInfoRow } from '@/features/users';

import { useActiveGroupId, useActiveRelay } from '@/shared/hooks';

export const GroupThreadComments = () => {
  const { activeRelay } = useActiveRelay();
  const { activeGroupId } = useActiveGroupId();

  const { metadata } = useGroupMetadata(activeRelay, activeGroupId);
  const { threadComments, hasMoreThreadComments, loadMoreThreadComments } = useGroupThreadComments(
    activeRelay,
    activeGroupId,
  );

  if (!activeGroupId) return null;

  return (
    <>
      <GroupSummary metadata={metadata} />

      <div className="flex flex-col gap-4">
        <CardContainer title={`Thread Comments`}>
          {threadComments?.length == 0 ? (
            <p className="text-muted-foreground text-xs">Empty List</p>
          ) : (
            (threadComments || []).map((threadComment) => (
              <UserInfoRow
                key={threadComment.id}
                relay={activeRelay}
                groupId={activeGroupId}
                pubkey={threadComment.pubkey}
                openByDefault
              >
                <p className="truncate text-xs font-light">{threadComment.content}</p>
              </UserInfoRow>
            ))
          )}

          <Button
            variant="outline"
            className="w-full"
            onClick={() => loadMoreThreadComments(50)}
            disabled={!hasMoreThreadComments}
          >
            Load more
          </Button>
        </CardContainer>
      </div>
    </>
  );
};
