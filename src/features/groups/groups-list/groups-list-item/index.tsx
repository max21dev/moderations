import { ArrowRightIcon } from 'lucide-react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { InformationDialog } from '@/shared/components/information-dialog';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';

import { Group } from '@/shared/types';

import { GroupSummary } from '@/features/groups';

export const GroupsListItem = ({ group }: { group: Group }) => {
  const groupHost = useMemo(
    () => group.relay.replace('wss://', '').replace('ws://', '').replace('/', ''),
    [group.relay],
  );

  return (
    <Card className="transition-colors duration-300 hover:border-purple-600">
      <CardContent className="mt-4 flex flex-col gap-4">
        <GroupSummary group={group} />

        <div className="flex items-center gap-4">
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

          <Link to={`${location.pathname}/${encodeURIComponent(group.id)}`} className="ml-auto">
            <Button size="sm">
              <ArrowRightIcon size={16} />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
