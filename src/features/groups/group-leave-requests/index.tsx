import { useParams } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

import { CardContainer } from '@/shared/components/card-container';

import { GroupSummary } from '@/features/groups';
import { UserInfoRow } from '@/features/users';

import { useGroupLeaveRequests, useGroupMetadata } from '@/shared/hooks';

export const GroupLeaveRequests = () => {
  const { groupId } = useParams();

  const { metadata } = useGroupMetadata(groupId);
  const { leaveRequests, hasMoreLeaveRequests, loadMoreLeaveRequests } =
    useGroupLeaveRequests(groupId);

  if (!groupId) return null;

  return (
    <>
      <GroupSummary metadata={metadata} />

      <div className="flex flex-col gap-4">
        <CardContainer title={`Leave Requests`}>
          {leaveRequests.length == 0 ? (
            <p className="text-muted-foreground text-xs">Empty List</p>
          ) : (
            leaveRequests.length > 0 &&
            leaveRequests.map((leaveRequest) => (
              <div key={leaveRequest.pubkey}>
                <UserInfoRow pubkey={leaveRequest.pubkey} key={leaveRequest.pubkey}>
                  {leaveRequest.reason && (
                    <p className="p-2 text-xs text-muted-foreground">
                      <b>Reason: </b>
                      <span>{leaveRequest.reason}</span>
                    </p>
                  )}
                </UserInfoRow>
              </div>
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
