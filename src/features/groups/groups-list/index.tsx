import { columns } from '@/features/groups/groups-list/columns';
import { DataTable } from '@/features/groups/groups-list/data-table';

import { useGroupsList } from './hooks';

export const GroupsList = () => {
  const { groups } = useGroupsList();

  if (!groups) {
    return null;
  }

  return <DataTable columns={columns} data={groups} />;
};
