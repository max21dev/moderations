import { ArrowRightIcon } from 'lucide-react';
import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import { H3 } from '@/shared/components/ui/typography/h3';
import { Muted } from '@/shared/components/ui/typography/muted';

import { CardContainer } from '@/shared/components/card-container';
import { InformationDialog } from '@/shared/components/information-dialog';

import { UserInfoRow } from '@/features/users';

import { loader } from '@/shared/utils';

import { useGroupDetails } from './hooks';

export const GroupDetails = () => {
  const { groupId } = useParams();

  const { admins, group, members } = useGroupDetails({ groupId });

  const groupHost = useMemo(
    () => (group ? group.relay.replace('wss://', '').replace('ws://', '').replace('/', '') : ''),
    [group],
  );

  if (!groupId) return null;

  return (
    <>
      <div className="mb-4 w-full flex items-center">
        <div className="flex items-center gap-2">
          <div className="bg-secondary w-12 h-12 rounded-md overflow-hidden">
            {group && group.picture && (
              <img alt={group.name} src={loader(group.picture, { w: 48, h: 48 })} />
            )}
          </div>

          <div>
            <H3>{group?.name || '<unnamed>'}</H3>

            {group && group.about && <Muted>{group.about}</Muted>}
          </div>
        </div>

        <Button className="ml-auto" variant="outline" asChild>
          <Link to={`${location.pathname}/edit-group`}>Edit Group</Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {group && (
          <CardContainer title="Information">
            <InformationDialog
              buttonLabel="View Raw Information"
              title="Raw Information"
              description="This is the raw information of the group."
              content={JSON.stringify(group.event.rawEvent(), null, 2)}
            />

            <InformationDialog
              buttonLabel="View Group Identifier"
              title="Group Identifier"
              description="This is the identifier of the group."
              content={`${groupHost}'${group.id}`}
            />
          </CardContainer>
        )}

        <div className="flex gap-4 w-full h-full">
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

            {members.length > 5 && (
              <Link to={`${location.pathname}/group-members`}>
                <Button variant="ghost" size="sm">
                  View All Members <ArrowRightIcon className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            )}
          </CardContainer>
        </div>
      </div>
    </>
  );
};
