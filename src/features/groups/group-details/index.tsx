import { ArrowRightIcon } from 'lucide-react';
import {
  useGroupAdmins,
  useGroupChats,
  useGroupJoinRequests,
  useGroupLeaveRequests,
  useGroupMembers,
  useGroupMetadata,
  useGroupRoles,
  useGroupThreadComments,
  useGroupThreads,
} from 'nostr-hooks/nip29';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import { Muted } from '@/shared/components/ui/typography/muted';

import { CardContainer } from '@/shared/components/card-container';
import { InformationDialog } from '@/shared/components/information-dialog';
import { Badge } from '@/shared/components/ui/badge';

import { GroupSummary } from '@/features/groups';
import { UserInfoRow } from '@/features/users';

import { useActiveGroupId, useActiveRelay } from '@/shared/hooks';
import { getHostFromRelay } from '@/shared/utils';

export const GroupDetails = () => {
  const { activeRelay } = useActiveRelay();
  const { activeGroupId } = useActiveGroupId();

  const { admins } = useGroupAdmins(activeRelay, activeGroupId);
  const { chats } = useGroupChats(activeRelay, activeGroupId);
  const { joinRequests } = useGroupJoinRequests(activeRelay, activeGroupId);
  const { leaveRequests } = useGroupLeaveRequests(activeRelay, activeGroupId);
  const { members } = useGroupMembers(activeRelay, activeGroupId);
  const { metadata, metadataEvents } = useGroupMetadata(activeRelay, activeGroupId);
  // const { reactions} = useGroupReactions(activeRelay, activeGroupId);
  const { threadComments } = useGroupThreadComments(activeRelay, activeGroupId);
  const { threads } = useGroupThreads(activeRelay, activeGroupId);
  const { roles } = useGroupRoles(activeRelay, activeGroupId);

  const host = getHostFromRelay(activeRelay);

  const metadataEvent = metadataEvents?.[0];

  if (!activeGroupId) return null;

  return (
    <>
      <GroupSummary metadata={metadata} />

      <div className="flex flex-col gap-4">
        {activeGroupId && (
          <CardContainer title="Information">
            <div className="flex gap-4">
              {metadataEvent && (
                <InformationDialog
                  buttonLabel="View Raw Information"
                  title="Raw Information"
                  description="This is the raw information of the group."
                  content={JSON.stringify(metadataEvent.rawEvent(), null, 2)}
                />
              )}

              <InformationDialog
                buttonLabel="View Group Identifier"
                title="Group Identifier"
                description="This is the identifier of the group."
                content={`${host}'${activeGroupId}`}
              />
            </div>
          </CardContainer>
        )}

        <div className="grid grid-cols-1 gap-4 w-full h-full md:grid-cols-2">
          <CardContainer
            title={`Admins (${admins?.length})`}
            linkTo={`${location.pathname}/group-admins`}
          >
            {admins?.length == 0 ? (
              <p className="text-muted-foreground text-xs">Empty List</p>
            ) : (
              admins?.slice(0, 5).map((admin) => (
                <UserInfoRow key={admin.pubkey} pubkey={admin.pubkey}>
                  <div className="flex gap-2 flex-wrap w-full">
                    {admin.roles.map((role) => (
                      <Badge key={role} variant="outline" className="shrink-0">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </UserInfoRow>
              ))
            )}

            {admins && admins.length > 5 && (
              <div>
                <Button variant="ghost" size="sm">
                  <Link to={`${location.pathname}/group-admins`} className="flex">
                    View All Admins <ArrowRightIcon className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            )}
          </CardContainer>

          <CardContainer
            title={`Members (${members?.length || 0})`}
            linkTo={`${location.pathname}/group-members`}
          >
            {members?.length == 0 ? (
              <p className="text-muted-foreground text-xs">Empty List</p>
            ) : (
              members
                ?.slice(0, 5)
                .map((member) => <UserInfoRow pubkey={member.pubkey} key={member.pubkey} />)
            )}

            {members && members.length > 5 && (
              <div>
                <Button variant="ghost" size="sm">
                  <Link to={`${location.pathname}/group-members`} className="flex">
                    View All Members <ArrowRightIcon className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            )}
          </CardContainer>

          <CardContainer title="Roles" linkTo={`${location.pathname}/group-roles`}>
            {roles?.length == 0 ? (
              <p className="text-muted-foreground text-xs">Empty List</p>
            ) : (
              roles?.slice(0, 5).map((role) => (
                <div
                  key={role.name}
                  className="p-2 w-full rounded-lg border border-transparent hover:border-border transition-colors duration-500 ease-out"
                >
                  <b>{role.name}</b>
                  <Muted>{role.description}</Muted>
                </div>
              ))
            )}

            {roles && roles.length > 5 && (
              <div>
                <Button variant="ghost" size="sm">
                  <Link to={`${location.pathname}/group-roles`} className="flex">
                    View All Roles <ArrowRightIcon className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            )}
          </CardContainer>

          <CardContainer title="Chats" linkTo={`${location.pathname}/group-chats`}>
            {chats?.length == 0 ? (
              <p className="text-muted-foreground text-xs">Empty List</p>
            ) : (
              chats?.slice(0, 5).map((chat) => (
                <div className="truncate" key={chat.id}>
                  <Muted>{chat.content}</Muted>
                </div>
              ))
            )}

            {chats && chats.length > 5 && (
              <div>
                <Button variant="ghost" size="sm">
                  <Link to={`${location.pathname}/group-chats`} className="flex">
                    View All Chats <ArrowRightIcon className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            )}
          </CardContainer>

          <CardContainer title="Join Requests" linkTo={`${location.pathname}/group-join-requests`}>
            {joinRequests?.length == 0 ? (
              <p className="text-muted-foreground text-xs">Empty List</p>
            ) : (
              joinRequests?.slice(0, 5).map((joinRequest) => (
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

            {joinRequests && joinRequests.length > 5 && (
              <div>
                <Button variant="ghost" size="sm">
                  <Link to={`${location.pathname}/group-join-requests`} className="flex">
                    View All Join Requests <ArrowRightIcon className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            )}
          </CardContainer>

          <CardContainer
            title="Leave Requests"
            linkTo={`${location.pathname}/group-leave-requests`}
          >
            {leaveRequests?.length == 0 ? (
              <p className="text-muted-foreground text-xs">Empty List</p>
            ) : (
              leaveRequests?.slice(0, 5).map((leaveRequest) => (
                <div key={leaveRequest.id}>
                  <UserInfoRow pubkey={leaveRequest.pubkey} key={leaveRequest.id} />
                </div>
              ))
            )}

            {leaveRequests && leaveRequests.length > 5 && (
              <div>
                <Button variant="ghost" size="sm">
                  <Link to={`${location.pathname}/group-leave-requests`} className="flex">
                    View All Leave Requests <ArrowRightIcon className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            )}
          </CardContainer>

          <CardContainer title="Threads" linkTo={`${location.pathname}/group-threads`}>
            {threads?.length == 0 ? (
              <p className="text-muted-foreground text-xs">Empty List</p>
            ) : (
              threads?.slice(0, 5).map((thread) => (
                <div className="truncate" key={thread.id}>
                  <Muted>{thread.content}</Muted>
                </div>
              ))
            )}

            {threads && threads.length > 5 && (
              <div>
                <Button variant="ghost" size="sm">
                  <Link to={`${location.pathname}/group-threads`} className="flex">
                    View All Threads <ArrowRightIcon className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            )}
          </CardContainer>

          <CardContainer
            title="Thread Comments"
            linkTo={`${location.pathname}/group-thread-comments`}
          >
            {threadComments?.length == 0 ? (
              <p className="text-muted-foreground text-xs">Empty List</p>
            ) : (
              threadComments?.slice(0, 5).map((thread) => (
                <div className="truncate" key={thread.id}>
                  <Muted>{thread.content}</Muted>
                </div>
              ))
            )}

            {threadComments && threadComments.length > 5 && (
              <div>
                <Button variant="ghost" size="sm">
                  <Link to={`${location.pathname}/group-thread-comments`} className="flex">
                    View All Thread Comments <ArrowRightIcon className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            )}
          </CardContainer>
        </div>
      </div>
    </>
  );
};
