import { useAllGroupsMetadataRecords } from 'nostr-hooks/nip29';

import { Spinner } from '@/shared/components/spinner';
import { Button } from '@/shared/components/ui/button';

import { useActiveRelay } from '@/shared/hooks';

import { EmptyGroupsList } from './empty-groups-list';
import { GroupsListItem } from './groups-list-item';

export const GroupsList = () => {
  const { activeRelay } = useActiveRelay();

  const { metadataRecords, isLoadingMetadata, hasMoreMetadata, loadMoreMetadata } =
    useAllGroupsMetadataRecords(activeRelay);

  if (isLoadingMetadata) return <Spinner />;

  if (Object.keys(metadataRecords).length === 0) return <EmptyGroupsList />;

  return (
    <div className="flex flex-col w-full gap-4">
      {Object.entries(metadataRecords).map(([id, metadata]) => {
        return <GroupsListItem key={id} groupId={id} relay={activeRelay} metadata={metadata} />;
      })}

      <Button
        onClick={() => loadMoreMetadata()}
        disabled={!hasMoreMetadata}
        className="w-full"
        variant="outline"
      >
        Load More
      </Button>
    </div>
  );
};
