import { useParams } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

import { CardContainer } from '@/shared/components/card-container';

import { GroupSummary } from '@/features/groups';
import { UserInfoRow } from '@/features/users';

import { useGroupJoinRequests, useGroupMetadata } from '@/shared/hooks';

export const GroupJoinRequests = () => {
  const { groupId } = useParams();

  const { metadata } = useGroupMetadata(groupId);
  const { joinRequests, hasMoreJoinRequests, loadMoreJoinRequests } = useGroupJoinRequests(groupId);

  if (!groupId) return null;

  return (
    <>
      <GroupSummary metadata={metadata} />

      <div className="flex flex-col gap-4">
        <CardContainer title={`Join Requests`}>
          {joinRequests.length == 0 ? (
            <p className="text-muted-foreground text-xs">Empty List</p>
          ) : (
            joinRequests.length > 0 &&
            joinRequests.map((joinRequest) => (
              <div key={joinRequest.pubkey}>
                <UserInfoRow pubkey={joinRequest.pubkey} key={joinRequest.pubkey}>
                  {(joinRequest.reason || joinRequest.code) && (
                    <p className="p-2 text-xs text-muted-foreground">
                      {joinRequest.reason && (
                        <>
                          <b>Reason: </b>
                          <span>{joinRequest.reason}</span>
                          <br />
                        </>
                      )}

                      {joinRequest.code && (
                        <>
                          <b>Code: </b>
                          <span>{joinRequest.code}</span>
                        </>
                      )}
                    </p>
                  )}
                </UserInfoRow>
              </div>
            ))
          )}

          <Button
            variant="outline"
            className="w-full"
            onClick={() => loadMoreJoinRequests(50)}
            disabled={!hasMoreJoinRequests}
          >
            Load more
          </Button>
        </CardContainer>
      </div>
    </>
  );
};
