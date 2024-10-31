import { Spinner } from '@/shared/components/spinner';

import { useGroupsMetadataList } from '@/shared/hooks';

import { EmptyGroupsList } from './empty-groups-list';
import { GroupsListItem } from './groups-list-item';

export const GroupsList = () => {
  const { metadataList, isLoading } = useGroupsMetadataList();

  if (isLoading) return <Spinner />;

  if (metadataList.length == 0) return <EmptyGroupsList />;

  return (
    <div className="flex flex-col w-full gap-4">
      {metadataList.map((metadata) => (
        <GroupsListItem key={metadata.id} metadata={metadata} />
      ))}
    </div>
  );
};
