import { useParams } from 'react-router-dom';

import { CardContainer } from '@/shared/components/card-container';

import { UserInfoRow } from '@/features/users';

import { useGroupMembers } from '@/shared/hooks';

export const GroupMembers = () => {
  const { groupId } = useParams();

  const { members } = useGroupMembers(groupId);

  if (!groupId) return null;

  return (
    <>
      <div className="flex flex-col gap-4">
        <CardContainer
          title={`Members (${members.length})`}
          linkTo={`${location.pathname}/group-members`}
        >
          {members.map((member) => (
            <UserInfoRow key={member.publicKey} pubkey={member.publicKey} />
          ))}
        </CardContainer>
      </div>
    </>
  );
};
