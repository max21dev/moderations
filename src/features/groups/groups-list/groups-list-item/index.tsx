import { ArrowRightIcon } from 'lucide-react';
import { Nip29GroupId, Nip29GroupMetadata, Nip29Relay, useGroupMetadata } from 'nostr-hooks/nip29';
import { Link } from 'react-router-dom';

import { CardContainer } from '@/shared/components/card-container';
import { InformationDialog } from '@/shared/components/information-dialog';
import { Button } from '@/shared/components/ui/button';

import { GroupSummary } from '@/features/groups';

import { GroupsListItemShortcuts } from './groups-list-item-shortcuts';

export const GroupsListItem = ({
  relay,
  groupId,
  metadata,
}: {
  relay: Nip29Relay;
  groupId: Nip29GroupId;
  metadata: Nip29GroupMetadata;
}) => {
  const { metadataEvents } = useGroupMetadata(relay, groupId);

  const metadataEvent = metadataEvents?.[0];

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
          content={`${relay}'${groupId}`}
        />

        <div className="ml-auto flex items-center gap-4">
          <GroupsListItemShortcuts groupId={groupId} relay={relay} />

          <Link to={`${location.pathname}/${encodeURIComponent(groupId || '')}`}>
            <Button size="sm">
              <ArrowRightIcon size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </CardContainer>
  );
};
