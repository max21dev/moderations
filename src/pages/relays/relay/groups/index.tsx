import { Outlet } from 'react-router-dom';

import { GroupsList } from '@/features/groups';

export const GroupsPage = () => {
  return (
    <div>
      <h5>Groups Page</h5>

      <GroupsList />

      <Outlet />
    </div>
  );
};
