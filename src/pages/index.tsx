import { Outlet, createBrowserRouter } from 'react-router-dom';

import { ZapModal } from '@/shared/components/zap-modal';
import { UserLoginModal } from '@/features/users';

const Layout = () => {
  return (
    <>
      <Outlet />
      <UserLoginModal />
      <ZapModal />
    </>
  );
};

const RelaysPage = () => import('@/pages/relays');
const GroupsPage = () => import('@/pages/groups');
const GroupPage = () => import('@/pages/groups/group');
// const UsersPage = () => import('@/pages/users');

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        async lazy() {
          return { Component: (await RelaysPage()).RelaysPage };
        },
      },
      {
        path: 'relays',
        async lazy() {
          return { Component: (await RelaysPage()).RelaysPage };
        },
      },
      {
        path: 'relays/:relayUrl',
        async lazy() {
          return { Component: (await GroupsPage()).GroupsPage };
        },
      },
      {
        path: 'relays/:relayUrl/groups',
        async lazy() {
          return { Component: (await GroupsPage()).GroupsPage };
        },
      },
      {
        path: 'relays/:relayUrl/groups/:groupId',
        async lazy() {
          return { Component: (await GroupPage()).GroupPage };
        },
      },
      // {
      //   path: 'relays/:relayUrl/groups/:groupId/users',
      //   async lazy() {
      //     return { Component: (await UsersPage()).UsersPage };
      //   },
      // },
    ],
  },
]);
