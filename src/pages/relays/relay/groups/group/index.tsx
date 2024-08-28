import { Outlet } from 'react-router-dom';
import { GroupDetails } from '@/features/group';

export const GroupPage = () => {
  return (
    <div>
      <h5>Group Page</h5>
      <GroupDetails />
      <Outlet />
    </div>
  );
};
