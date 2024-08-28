import { Outlet } from 'react-router-dom';

import { GroupsList } from '@/features/groups';

export const GroupsPage = () => {
  return (
    <div>
      <h1>Groups Page</h1>

      <GroupsList />

      <Outlet />
    </div>
  );
};
