import { useGroupsList } from './hooks';
import { columns } from '@/features/groups/groups-list/columns';
import { DataTable } from '@/features/groups/groups-list/data-table.tsx';

export const GroupsList = () => {
  const { groups } = useGroupsList();

  return (
    <div className="container mx-auto py-10">
      {groups && <DataTable columns={columns} data={groups} />}
    </div>
  );
};
