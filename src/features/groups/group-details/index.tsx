import { ArrowRightIcon } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import { Muted } from '@/shared/components/ui/typography/muted';

import { CardContainer } from '@/shared/components/card-container';
import { InformationDialog } from '@/shared/components/information-dialog';

import {
  useGroupAdmins,
  useGroupChats,
  useGroupHost,
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
              <UserInfoRow key={admin.publicKey} pubkey={admin.publicKey} />
            ))}

            {admins.length > 5 && (
              <Link to={`${location.pathname}/group-admins`}>
                <Button variant="ghost" size="sm">
                  View All Admins <ArrowRightIcon className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            )}
          </CardContainer>

          <CardContainer
            title={`Members (${members.length})`}
            linkTo={`${location.pathname}/group-members`}
          >
            {members.slice(0, 5).map((member) => (
              <UserInfoRow pubkey={member.publicKey} key={member.publicKey} />
            ))}

            <div className="mt-4">
              {members.length > 5 && (
                <Link to={`${location.pathname}/group-members`}>
                  <Button variant="ghost" size="sm">
                    View All Members <ArrowRightIcon className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              )}
            </div>
          </CardContainer>
        </div>

        <div className="grid grid-cols-1 gap-4 w-full h-full md:grid-cols-2">
          <CardContainer title={`Chats`}>
            {chats.slice(0, 5).map((chat) => (
              <div className="truncate" key={chat.id}>
                <Muted>{chat.content}</Muted>
              </div>
            ))}

            {/* TODO: Add Routes and Pages */}
            {/* <div className="mt-4">
              {chats.length > 5 && (
                <Link to={`${location.pathname}/group-chats`}>
                  <Button variant="ghost" size="sm">
                    View All Chats <ArrowRightIcon className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              )}
            </div> */}
          </CardContainer>

          <CardContainer title={`Notes`}>
            {notes.slice(0, 5).map((note) => (
              <div className="truncate" key={note.id}>
                <Muted>{note.content}</Muted>
              </div>
            ))}

            {/* TODO: Add Routes and Pages */}
            {/* <div className="mt-4">
              {notes.length > 5 && (
                <Link to={`${location.pathname}/group-notes`}>
                  <Button variant="ghost" size="sm">
                    View All Notes <ArrowRightIcon className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              )}
            </div> */}
          </CardContainer>
        </div>
      </div>
    </>
  );
};
