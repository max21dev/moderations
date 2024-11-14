import { useParams } from 'react-router-dom';

import { CardContainer } from '@/shared/components/card-container';

import { GroupSummary } from '@/features/groups';
import { UserInfoRow } from '@/features/users';

import { useGroupMembers, useGroupMetadata } from '@/shared/hooks';

export const GroupMembers = () => {
  const { groupId } = useParams();

  const { metadata } = useGroupMetadata(groupId);
  const { members } = useGroupMembers(groupId);

  if (!groupId) return null;

  return (
    <>
      <GroupSummary metadata={metadata} />

      <div className="flex flex-col gap-4">
        <CardContainer title={`Members (${members.length})`}>
          {members.length == 0 ? (
            <p className="text-muted-foreground text-xs">Empty List</p>
          ) : (
            members.length > 0 &&
            members.map((member) => (
              <UserInfoRow key={member.publicKey} pubkey={member.publicKey} />
            ))
          )}
        </CardContainer>
      </div>
    </>
  );
};
