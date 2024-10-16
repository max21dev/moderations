import { Spinner } from '@/shared/components/spinner';

import { useGroupsList } from '@/shared/hooks';

import { EmptyGroupsList } from './empty-groups-list';
import { GroupsListItem } from './groups-list-item';

export const GroupsList = () => {
  const { groups, isLoading } = useGroupsList();

  if (isLoading) return <Spinner />;

  if (groups.length == 0) return <EmptyGroupsList />;

  return (
    <div className="flex flex-col w-full gap-4">
      {groups.map((group) => (
        <GroupsListItem key={group.id} group={group} />
      ))}
    </div>
  );
};
