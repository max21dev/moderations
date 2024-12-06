import { useGroupMetadata, useGroupRoles } from 'nostr-hooks/nip29';

import { CardContainer } from '@/shared/components/card-container';

import { GroupSummary } from '@/features/groups';

import { Muted } from '@/shared/components/ui/typography/muted';
import { useActiveGroupId, useActiveRelay } from '@/shared/hooks';

export const GroupRoles = () => {
  const { activeRelay } = useActiveRelay();
  const { activeGroupId } = useActiveGroupId();

  const { metadata } = useGroupMetadata(activeRelay, activeGroupId);
  const { roles } = useGroupRoles(activeRelay, activeGroupId);

  if (!activeGroupId) return null;

  return (
    <>
      <GroupSummary metadata={metadata} />

      <div className="flex flex-col gap-4">
        <CardContainer title={`Roles (${roles?.length || 0})`}>
          {roles?.length == 0 ? (
            <p className="text-muted-foreground text-xs">Empty List</p>
          ) : (
            (roles || []).map((role) => (
              <div
                key={role.name}
                className="p-2 w-full rounded-lg border border-transparent hover:border-border transition-colors duration-500 ease-out"
              >
                <b>{role.name}</b>
                <Muted>{role.description}</Muted>
              </div>
            ))
          )}
        </CardContainer>
      </div>
    </>
  );
};
