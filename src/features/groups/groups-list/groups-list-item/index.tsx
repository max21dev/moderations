import { ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { CardContainer } from '@/shared/components/card-container';
import { InformationDialog } from '@/shared/components/information-dialog';
import { Button } from '@/shared/components/ui/button';

import { useGroupHost, useGroupMetadata } from '@/shared/hooks';
import { GroupMetadata } from '@/shared/types';

import { GroupSummary } from '@/features/groups';

import { GroupsListItemShortcuts } from './groups-list-item-shortcuts';

export const GroupsListItem = ({ metadata }: { metadata: GroupMetadata }) => {
  const { host } = useGroupHost();

  const { metadataEvent } = useGroupMetadata(metadata.id);

  return (
    <CardContainer>
      <GroupSummary metadata={metadata} />

      <div className="flex items-center gap-4">
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
          content={`${host}'${metadata.id}`}
        />

        <div className="ml-auto flex items-center gap-4">
          <GroupsListItemShortcuts groupId={metadata.id} />

          <Link to={`${location.pathname}/${encodeURIComponent(metadata.id)}`}>
            <Button size="sm">
              <ArrowRightIcon size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </CardContainer>
  );
};
