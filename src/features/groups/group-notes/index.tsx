import { useParams } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

import { CardContainer } from '@/shared/components/card-container';

import { GroupSummary } from '@/features/groups';
import { UserInfoRow } from '@/features/users';

import { useGroupNotes, useGroupMetadata } from '@/shared/hooks';

export const GroupNotes = () => {
  const { groupId } = useParams();

  const { metadata } = useGroupMetadata(groupId);
  const { notes, hasMoreNotes, loadMoreNotes } = useGroupNotes(groupId);

  if (!groupId) return null;

  return (
    <>
      <GroupSummary metadata={metadata} />

      <div className="flex flex-col gap-4">
        <CardContainer title={`Notes`}>
          {notes.length == 0 ? (
            <p className="text-muted-foreground text-xs">Empty List</p>
          ) : (
            notes.length > 0 &&
            notes.map((chat) => (
              <div className="flex items-center gap-2">
                <UserInfoRow key={chat.id} pubkey={chat.pubkey} openByDefault>
                  <p className="truncate text-xs font-light">{chat.content}</p>
                </UserInfoRow>
              </div>
            ))
          )}

          <Button
            variant="outline"
            className="w-full"
            onClick={() => loadMoreNotes(50)}
            disabled={!hasMoreNotes}
          >
            Load more
          </Button>
        </CardContainer>
      </div>
    </>
  );
};
