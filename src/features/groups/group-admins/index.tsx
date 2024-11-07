import { useParams } from 'react-router-dom';

import { CardContainer } from '@/shared/components/card-container';

import { UserInfoRow } from '@/features/users';

import { useGroupAdmins } from '@/shared/hooks';

export const GroupAdmins = () => {
  const { groupId } = useParams();

  const { admins } = useGroupAdmins(groupId);

  if (!groupId) return null;

  return (
    <>
      <div className="flex flex-col gap-4">
        <CardContainer
          title={`Admins (${admins.length})`}
          linkTo={`${location.pathname}/group-admins`}
        >
          {admins.map((admin) => (
            <UserInfoRow key={admin.publicKey} pubkey={admin.publicKey} />
          ))}
        </CardContainer>
      </div>
    </>
  );
};
