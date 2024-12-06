import { useGroupMembers, useGroupMetadata } from 'nostr-hooks/nip29';

import { CardContainer } from '@/shared/components/card-container';

import { GroupSummary } from '@/features/groups';
import { UserInfoRow } from '@/features/users';

import { useActiveGroupId, useActiveRelay } from '@/shared/hooks';

export const GroupMembers = () => {
  const { activeRelay } = useActiveRelay();
  const { activeGroupId } = useActiveGroupId();

  const { metadata } = useGroupMetadata(activeRelay, activeGroupId);
  const { members } = useGroupMembers(activeRelay, activeGroupId);

  if (!activeGroupId) return null;

  return (
    <>
      <GroupSummary metadata={metadata} />

      <div className="flex flex-col gap-4">
        <CardContainer title={`Members (${members?.length || 0})`}>
          {members?.length == 0 ? (
            <p className="text-muted-foreground text-xs">Empty List</p>
          ) : (
            (members || []).map((member) => (
              <UserInfoRow
                key={member.pubkey}
                relay={activeRelay}
                groupId={activeGroupId}
                pubkey={member.pubkey}
              />
            ))
          )}
        </CardContainer>
      </div>
    </>
  );
};
