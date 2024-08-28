import { Outlet } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>

      <Outlet />
    </div>
  );
};
