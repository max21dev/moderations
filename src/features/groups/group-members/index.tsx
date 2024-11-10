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
      <div className="mb-4 w-full">{metadata && <GroupSummary metadata={metadata} />}</div>

      <div className="flex flex-col gap-4">
        <CardContainer title={`Members (${members.length})`}>
          {members.map((member) => (
            <UserInfoRow key={member.publicKey} pubkey={member.publicKey} />
          ))}
        </CardContainer>
      </div>
    </>
  );
};
