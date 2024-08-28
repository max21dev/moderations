import { Outlet } from 'react-router-dom';
import { RelaysList } from '@/features/relays';

export const RelaysPage = () => {
  return (
    <div>
      <h5>Relays Page</h5>
      <RelaysList />
      <Outlet />
    </div>
  );
};
