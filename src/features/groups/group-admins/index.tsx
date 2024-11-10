import { useParams } from 'react-router-dom';

import { CardContainer } from '@/shared/components/card-container';
import { Badge } from '@/shared/components/ui/badge';

import { GroupSummary } from '@/features/groups';
import { UserInfoRow } from '@/features/users';

import { useGroupAdmins, useGroupMetadata } from '@/shared/hooks';

export const GroupAdmins = () => {
  const { groupId } = useParams();

  const { metadata } = useGroupMetadata(groupId);
  const { admins } = useGroupAdmins(groupId);

  if (!groupId) return null;

  return (
    <>
      <GroupSummary metadata={metadata} />

      <div className="flex flex-col gap-4">
        <CardContainer title={`Admins (${admins.length})`}>
          {admins.map((admin) => (
            <div className="flex items-center gap-2">
              <UserInfoRow key={admin.publicKey} pubkey={admin.publicKey}>
                <div className="flex gap-2 flex-wrap">
                  {admin.roles.map((role) => (
                    <Badge variant="outline" className="shrink-0">
                      {role}
                    </Badge>
                  ))}
                </div>
              </UserInfoRow>
            </div>
          ))}
        </CardContainer>
      </div>
    </>
  );
};
