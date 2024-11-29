import { useGroupJoinRequests, useGroupMetadata } from 'nostr-hooks/nip29';

import { Button } from '@/shared/components/ui/button';

import { CardContainer } from '@/shared/components/card-container';

import { GroupSummary } from '@/features/groups';
import { UserInfoRow } from '@/features/users';

import { useActiveGroupId, useActiveRelay } from '@/shared/hooks';

export const GroupJoinRequests = () => {
  const { activeRelay } = useActiveRelay();
  const { activeGroupId } = useActiveGroupId();

  const { metadata } = useGroupMetadata(activeRelay, activeGroupId);
  const { joinRequests, hasMoreJoinRequests, loadMoreJoinRequests } = useGroupJoinRequests(
    activeRelay,
    activeGroupId,
  );

  if (!activeGroupId) return null;

  return (
    <>
      <GroupSummary metadata={metadata} />

      <div className="flex flex-col gap-4">
        <CardContainer title={`Join Requests`}>
          {joinRequests?.length == 0 ? (
            <p className="text-muted-foreground text-xs">Empty List</p>
          ) : (
            (joinRequests || []).map((joinRequest) => (
              <div key={joinRequest.id}>
                <UserInfoRow pubkey={joinRequest.pubkey} key={joinRequest.id}>
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
