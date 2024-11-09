import { ArrowRightIcon } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import { Muted } from '@/shared/components/ui/typography/muted';

import { CardContainer } from '@/shared/components/card-container';
import { InformationDialog } from '@/shared/components/information-dialog';
import { Badge } from '@/shared/components/ui/badge';

import {
  useGroupAdmins,
  useGroupChats,
  useGroupHost,
  useGroupJoinRequests,
  useGroupLeaveRequests,
  useGroupMembers,
  useGroupMetadata,
  useGroupNotes,
} from '@/shared/hooks';

import { GroupSummary } from '@/features/groups';
import { UserInfoRow } from '@/features/users';

export const GroupDetails = () => {
  const { groupId } = useParams();

  const { metadata, metadataEvent } = useGroupMetadata(groupId);
  const { host } = useGroupHost();
  const { members } = useGroupMembers(groupId);
  const { admins } = useGroupAdmins(groupId);
  const { chats } = useGroupChats(groupId);
  const { notes } = useGroupNotes(groupId);
  const { joinRequests } = useGroupJoinRequests(groupId);
  const { leaveRequests } = useGroupLeaveRequests(groupId);

  if (!groupId) return null;

  return (
    <>
      <div className="mb-4 w-full">{metadata && <GroupSummary metadata={metadata} />}</div>

      <div className="flex flex-col gap-4">
        {groupId && (
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
                content={`${host}'${groupId}`}
              />
            </div>
          </CardContainer>
        )}

        <div className="grid grid-cols-1 gap-4 w-full h-full md:grid-cols-2">
          <CardContainer
            title={`Admins (${admins.length})`}
            linkTo={`${location.pathname}/group-admins`}
          >
            {admins.slice(0, 5).map((admin) => (
              <UserInfoRow key={admin.publicKey} pubkey={admin.publicKey}>
                <div className="flex gap-2 flex-wrap w-full">
                  {admin.roles.map((role) => (
                    <Badge variant="outline" className="shrink-0">
                      {role}
                    </Badge>
                  ))}
                </div>
              </UserInfoRow>
            ))}

            {admins.length > 5 && (
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
            title={`Members (${members.length})`}
            linkTo={`${location.pathname}/group-members`}
          >
            {members.slice(0, 5).map((member) => (
              <UserInfoRow pubkey={member.publicKey} key={member.publicKey} />
            ))}

            {members.length > 5 && (
              <div>
                <Button variant="ghost" size="sm">
                  <Link to={`${location.pathname}/group-members`} className="flex">
                    View All Members <ArrowRightIcon className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            )}
          </CardContainer>
        </div>

        <div className="grid grid-cols-1 gap-4 w-full h-full md:grid-cols-2">
          <CardContainer title="Chats">
            {chats.slice(0, 5).map((chat) => (
              <div className="truncate" key={chat.id}>
                <Muted>{chat.content}</Muted>
              </div>
            ))}

            {/* TODO: Add Routes and Pages */}

            {chats.length > 5 && (
              <div>
                <Button variant="ghost" size="sm" disabled>
                  <Link to={`${location.pathname}/group-chats`} className="flex">
                    View All Chats <ArrowRightIcon className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            )}
          </CardContainer>

          <CardContainer title="Notes">
            {notes.slice(0, 5).map((note) => (
              <div className="truncate" key={note.id}>
                <Muted>{note.content}</Muted>
              </div>
            ))}

            {/* TODO: Add Routes and Pages */}
            {notes.length > 5 && (
              <div>
                <Button variant="ghost" size="sm" disabled>
                  <Link to={`${location.pathname}/group-notes`} className="flex">
                    View All Notes <ArrowRightIcon className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            )}
          </CardContainer>
        </div>

        <div className="grid grid-cols-1 gap-4 w-full h-full md:grid-cols-2">
          <CardContainer title="Join Requests">
            {joinRequests.slice(0, 5).map((joinRequest) => (
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
            ))}

            {/* TODO: Add Routes and Pages */}

            {joinRequests.length > 5 && (
              <div>
                <Button variant="ghost" size="sm" disabled>
                  <Link to={`${location.pathname}/group-join-requests`} className="flex">
                    View All Join Requests <ArrowRightIcon className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            )}
          </CardContainer>

          <CardContainer title="Leave Requests">
            {leaveRequests.slice(0, 5).map((leaveRequest) => (
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
            ))}

            {/* TODO: Add Routes and Pages */}
            {leaveRequests.length > 5 && (
              <div>
                <Button variant="ghost" size="sm" disabled>
                  <Link to={`${location.pathname}/group-leave-requests`} className="flex">
                    View All Leave Requests <ArrowRightIcon className="ml-2 w-4 h-4" />
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
