import { useGroupLeaveRequests, useGroupMetadata } from 'nostr-hooks/nip29';

import { Button } from '@/shared/components/ui/button';

import { CardContainer } from '@/shared/components/card-container';

import { GroupSummary } from '@/features/groups';
import { UserInfoRow } from '@/features/users';

import { useActiveGroupId, useActiveRelay } from '@/shared/hooks';

export const GroupLeaveRequests = () => {
  const { activeRelay } = useActiveRelay();
  const { activeGroupId } = useActiveGroupId();

  const { metadata } = useGroupMetadata(activeRelay, activeGroupId);
  const { leaveRequests, hasMoreLeaveRequests, loadMoreLeaveRequests } = useGroupLeaveRequests(
    activeRelay,
    activeGroupId,
  );

  if (!activeGroupId) return null;

  return (
    <>
      <GroupSummary metadata={metadata} />

      <div className="flex flex-col gap-4">
        <CardContainer title={`Leave Requests`}>
          {leaveRequests?.length == 0 ? (
            <p className="text-muted-foreground text-xs">Empty List</p>
          ) : (
            (leaveRequests || []).map((leaveRequest) => (
              <UserInfoRow
                key={leaveRequest.id}
                relay={activeRelay}
                groupId={activeGroupId}
                pubkey={leaveRequest.pubkey}
              />
            ))
          )}

          <Button
            variant="outline"
            className="w-full"
            onClick={() => loadMoreLeaveRequests(50)}
            disabled={!hasMoreLeaveRequests}
          >
            Load more
          </Button>
        </CardContainer>
      </div>
    </>
  );
};
