import { useGroupChats, useGroupMetadata } from 'nostr-hooks/nip29';

import { Button } from '@/shared/components/ui/button';

import { CardContainer } from '@/shared/components/card-container';

import { GroupSummary } from '@/features/groups';
import { UserInfoRow } from '@/features/users';

import { useActiveGroupId, useActiveRelay } from '@/shared/hooks';

export const GroupChats = () => {
  const { activeRelay } = useActiveRelay();
  const { activeGroupId } = useActiveGroupId();

  const { metadata } = useGroupMetadata(activeRelay, activeGroupId);
  const { chats, hasMoreChats, loadMoreChats } = useGroupChats(activeRelay, activeGroupId);

  if (!activeGroupId) return null;

  return (
    <>
      <GroupSummary metadata={metadata} />

      <div className="flex flex-col gap-4">
        <CardContainer title={`Chats`}>
          {chats?.length == 0 ? (
            <p className="text-muted-foreground text-xs">Empty List</p>
          ) : (
            (chats || []).map((chat) => (
              <div key={chat.id} className="flex items-center gap-2">
                <UserInfoRow
                  key={chat.id}
                  relay={activeRelay}
                  groupId={activeGroupId}
                  pubkey={chat.pubkey}
                  openByDefault
                >
                  <p className="truncate text-xs font-light">{chat.content}</p>
                </UserInfoRow>
              </div>
            ))
          )}

          <Button
            variant="outline"
            className="w-full"
            onClick={() => loadMoreChats(50)}
            disabled={!hasMoreChats}
          >
            Load more
          </Button>
        </CardContainer>
      </div>
    </>
  );
};
