import { useGroupAdmins, useGroupMetadata } from 'nostr-hooks/nip29';

import { CardContainer } from '@/shared/components/card-container';
import { Badge } from '@/shared/components/ui/badge';

import { GroupSummary } from '@/features/groups';
import { UserInfoRow } from '@/features/users';

import { useActiveGroupId, useActiveRelay } from '@/shared/hooks';

export const GroupAdmins = () => {
  const { activeRelay } = useActiveRelay();
  const { activeGroupId } = useActiveGroupId();

  const { metadata } = useGroupMetadata(activeRelay, activeGroupId);
  const { admins } = useGroupAdmins(activeRelay, activeGroupId);

  if (!activeGroupId) return null;

  return (
    <>
      <GroupSummary metadata={metadata} />

      <div className="flex flex-col gap-4">
        <CardContainer title={`Admins (${admins?.length || 0})`}>
          {admins?.length == 0 ? (
            <p className="text-muted-foreground text-xs">Empty List</p>
          ) : (
            (admins || []).map((admin) => (
              <div className="flex items-center gap-2">
                <UserInfoRow
                  key={admin.pubkey}
                  relay={activeRelay}
                  groupId={activeGroupId}
                  pubkey={admin.pubkey}
                >
                  <div className="flex gap-2 flex-wrap">
                    {admin.roles.map((role) => (
                      <Badge key={role} variant="outline" className="shrink-0">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </UserInfoRow>
              </div>
            ))
          )}
        </CardContainer>
      </div>
    </>
  );
};
