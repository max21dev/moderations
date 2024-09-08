import { UserInfoRow } from '@/features/users';

import { useGroupDetails } from './hooks';
import { loader } from '@/shared/utils';
import { useParams } from 'react-router-dom';

export const GroupDetails = () => {
  const { groupId } = useParams();
  if (!groupId) return null;

  const { admins, group, members } = useGroupDetails({ groupId });

  return (
    <div className="h-full overflow-y-auto">
      <div className="flex flex-col items-center min-h-3">
        {group?.picture && (
          <img alt={group?.picture} src={loader(group?.picture, { w: 50, h: 50 })} />
        )}

        <div className="text-sm font-light mt-2">{group?.id}</div>
        <div className="text-lg font-medium">{group?.name}</div>
        <div className="text-sm text-gray-600 mb-4">{group?.about}</div>
      </div>
      <div className="m-0">
        {admins && (
          <div>
            <h5 className="font-medium pb-2 m-4 border-b-2 border-b-blue-100">
              Admins ({admins.length})
            </h5>
            {admins.map((admin) => (
              <UserInfoRow pubkey={admin.publicKey} key={admin.publicKey} />
            ))}
          </div>
        )}
        {members && (
          <div>
            <h5 className="font-medium pb-2 m-4 border-b-2 border-b-blue-100">
              Members ({members.length})
            </h5>
            {members.map((member) => (
              <UserInfoRow pubkey={member.publicKey} key={member.publicKey} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
