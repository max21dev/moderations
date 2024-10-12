import { createBrowserRouter, Outlet } from 'react-router-dom';

import { Layout } from '@/pages';

/**
 * Folder Structure:
 *
 * pages/
 * ├── index.tsx
 * ├── relays/
 * │   ├── index.tsx
 * │   ├── new-relay/
 * │   │   └── index.tsx
 * │   ├── relay/
 * │   │   ├── index.tsx
 * │   │   ├── edit-relay/
 * │   │   │   └── index.tsx
 * │   │   ├── groups/
 * │   │   │   ├── index.tsx
 * │   │   │   ├── new-group/
 * │   │   │   │   └── index.tsx
 * │   │   │   ├── group/
 * │   │   │   │   ├── index.tsx
 * │   │   │   │   ├── edit-group/
 * │   │   │   │   │   └── index.tsx
 * │   │   │   │   ├── group-admins/
 * │   │   │   │   │   ├── index.tsx
 * │   │   │   │   │   ├── add-group-admin/
 * │   │   │   │   │   │   └── index.tsx
 * │   │   │   │   │   ├── group-admin/
 * │   │   │   │   │   │   ├── index.tsx
 * │   │   │   │   │   │   ├── edit-group-admin/
 * │   │   │   │   │   │   │   └── index.tsx
 * │   │   │   │   │   │   ├── group-admin-events/
 * │   │   │   │   │   │   │   ├── index.tsx
 * │   │   │   │   │   │   │   ├── group-admin-event/
 * │   │   │   │   │   │   │   │   └── index.tsx
 * │   │   │   │   ├── group-members/
 * │   │   │   │   │   ├── index.tsx
 * │   │   │   │   │   ├── add-group-member/
 * │   │   │   │   │   │   └── index.tsx
 * │   │   │   │   │   ├── group-member/
 * │   │   │   │   │   │   ├── index.tsx
 * │   │   │   │   │   │   ├── edit-group-member/
 * │   │   │   │   │   │   │   └── index.tsx
 * │   │   │   │   │   │   ├── group-member-events/
 * │   │   │   │   │   │   │   ├── index.tsx
 * │   │   │   │   │   │   │   ├── group-member-event/
 * │   │   │   │   │   │   │   │   └── index.tsx
 * │   │   │   │   ├── group-events/
 * │   │   │   │   │   ├── index.tsx
 * │   │   │   │   │   ├── new-group-event/
 * │   │   │   │   │   │   └── index.tsx
 * │   │   │   │   │   ├── group-event/
 * │   │   │   │   │   │   └── index.tsx
 *
 */

const HomePage = () => import('@/pages');

const LogoutPage = () => import('@/pages/logout');

const RelaysPage = () => import('@/pages/relays');
const NewRelayPage = () => import('@/pages/relays/new-relay');
const RelayPage = () => import('@/pages/relays/relay');
const EditRelayPage = () => import('@/pages/relays/relay/edit-relay');

const GroupsPage = () => import('@/pages/relays/relay/groups');
const NewGroupPage = () => import('@/pages/relays/relay/groups/new-group');
const GroupPage = () => import('@/pages/relays/relay/groups/group');
const EditGroupPage = () => import('@/pages/relays/relay/groups/group/edit-group');

const GroupAdminsPage = () => import('@/pages/relays/relay/groups/group/group-admins');
const AddGroupAdminPage = () =>
  import('@/pages/relays/relay/groups/group/group-admins/add-group-admin');
const GroupAdminPage = () => import('@/pages/relays/relay/groups/group/group-admins/group-admin');
const EditGroupAdminPage = () =>
  import('@/pages/relays/relay/groups/group/group-admins/group-admin/edit-group-admin');
const GroupAdminEventsPage = () =>
  import('@/pages/relays/relay/groups/group/group-admins/group-admin/group-admin-events');
const GroupAdminEventPage = () =>
  import(
    '@/pages/relays/relay/groups/group/group-admins/group-admin/group-admin-events/group-admin-event'
  );

const GroupMembersPage = () => import('@/pages/relays/relay/groups/group/group-members');
const AddGroupMemberPage = () =>
  import('@/pages/relays/relay/groups/group/group-members/add-group-member');
const GroupMemberPage = () =>
  import('@/pages/relays/relay/groups/group/group-members/group-member');
const EditGroupMemberPage = () =>
  import('@/pages/relays/relay/groups/group/group-members/group-member/edit-group-member');
const GroupMemberEventsPage = () =>
  import('@/pages/relays/relay/groups/group/group-members/group-member/group-member-events');
const GroupMemberEventPage = () =>
  import(
    '@/pages/relays/relay/groups/group/group-members/group-member/group-member-events/group-member-event'
  );

const GroupEventsPage = () => import('@/pages/relays/relay/groups/group/group-events');
const NewGroupEventPage = () =>
  import('@/pages/relays/relay/groups/group/group-events/new-group-event');
const GroupEventPage = () => import('@/pages/relays/relay/groups/group/group-events/group-event');

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        async lazy() {
          return { Component: (await HomePage()).HomePage };
        },
      },
      {
        path: 'relays',
        element: <Outlet />,
        children: [
          {
            path: '/relays',
            loader: () => ({ crumbs: [{ label: 'Relays' }] }),
            async lazy() {
              return { Component: (await RelaysPage()).RelaysPage };
            },
          },
          {
            path: 'new-relay',
            loader: () => ({
              crumbs: [{ label: 'Relays', to: '/relays' }, { label: 'New Relay' }],
            }),
            async lazy() {
              return { Component: (await NewRelayPage()).NewRelayPage };
            },
          },
          {
            path: ':relay',
            element: <Outlet />,
            children: [
              {
                path: '/relays/:relay',
                loader: ({ params }) => ({
                  crumbs: [{ label: 'Relays', to: '/relays' }, { label: params.relay }],
                }),
                async lazy() {
                  return { Component: (await RelayPage()).RelayPage };
                },
              },
              {
                path: 'edit-relay',
                loader: ({ params }) => ({
                  crumbs: [
                    { label: 'Relays', to: '/relays' },
                    {
                      label: params.relay,
                      to: `/relays/${encodeURIComponent(params.relay || '')}`,
                    },
                    { label: 'Edit Relay' },
                  ],
                }),
                async lazy() {
                  return { Component: (await EditRelayPage()).EditRelayPage };
                },
              },
              {
                path: 'groups',
                element: <Outlet />,
                children: [
                  {
                    path: '/relays/:relay/groups',
                    loader: ({ params }) => ({
                      crumbs: [
                        { label: 'Relays', to: '/relays' },
                        {
                          label: params.relay,
                          to: `/relays/${encodeURIComponent(params.relay || '')}`,
                        },
                        { label: 'Groups' },
                      ],
                    }),
                    async lazy() {
                      return { Component: (await GroupsPage()).GroupsPage };
                    },
                  },
                  {
                    path: 'new-group',
                    loader: ({ params }) => ({
                      crumbs: [
                        { label: 'Relays', to: '/relays' },
                        {
                          label: params.relay,
                          to: `/relays/${encodeURIComponent(params.relay || '')}`,
                        },
                        {
                          label: 'Groups',
                          to: `/relays/${encodeURIComponent(params.relay || '')}/groups`,
                        },
                        { label: 'New Group' },
                      ],
                    }),
                    async lazy() {
                      return { Component: (await NewGroupPage()).NewGroupPage };
                    },
                  },
                  {
                    path: ':groupId',
                    element: <Outlet />,
                    children: [
                      {
                        path: '/relays/:relay/groups/:groupId',
                        loader: ({ params }) => ({
                          crumbs: [
                            { label: 'Relays', to: '/relays' },
                            {
                              label: params.relay,
                              to: `/relays/${encodeURIComponent(params.relay || '')}`,
                            },
                            {
                              label: 'Groups',
                              to: `/relays/${encodeURIComponent(params.relay || '')}/groups`,
                            },
                            { label: params.groupId },
                          ],
                        }),
                        async lazy() {
                          return { Component: (await GroupPage()).GroupPage };
                        },
                      },
                      {
                        path: 'edit-group',
                        loader: ({ params }) => ({
                          crumbs: [
                            { label: 'Relays', to: '/relays' },
                            {
                              label: params.relay,
                              to: `/relays/${encodeURIComponent(params.relay || '')}`,
                            },
                            {
                              label: 'Groups',
                              to: `/relays/${encodeURIComponent(params.relay || '')}/groups`,
                            },
                            {
                              label: params.groupId,
                              to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}`,
                            },
                            { label: 'Edit Group' },
                          ],
                        }),
                        async lazy() {
                          return { Component: (await EditGroupPage()).EditGroupPage };
                        },
                      },
                      {
                        path: 'group-admins',
                        element: <Outlet />,
                        children: [
                          {
                            path: '/relays/:relay/groups/:groupId/group-admins',
                            loader: ({ params }) => ({
                              crumbs: [
                                { label: 'Relays', to: '/relays' },
                                {
                                  label: params.relay,
                                  to: `/relays/${encodeURIComponent(params.relay || '')}`,
                                },
                                {
                                  label: 'Groups',
                                  to: `/relays/${encodeURIComponent(params.relay || '')}/groups`,
                                },
                                {
                                  label: params.groupId,
                                  to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}`,
                                },
                                { label: 'Group Admins' },
                              ],
                            }),
                            async lazy() {
                              return { Component: (await GroupAdminsPage()).GroupAdminsPage };
                            },
                          },
                          {
                            path: 'add-group-admin',
                            loader: ({ params }) => ({
                              crumbs: [
                                { label: 'Relays', to: '/relays' },
                                {
                                  label: params.relay,
                                  to: `/relays/${encodeURIComponent(params.relay || '')}`,
                                },
                                {
                                  label: 'Groups',
                                  to: `/relays/${encodeURIComponent(params.relay || '')}/groups`,
                                },
                                {
                                  label: params.groupId,
                                  to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}`,
                                },
                                {
                                  label: 'Group Admins',
                                  to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}/group-admins`,
                                },
                                { label: 'Add Group Admin' },
                              ],
                            }),
                            async lazy() {
                              return { Component: (await AddGroupAdminPage()).AddGroupAdminPage };
                            },
                          },
                          {
                            path: ':group-admin',
                            element: <Outlet />,
                            children: [
                              {
                                path: '/relays/:relay/groups/:groupId/group-admins/:group-admin',
                                loader: ({ params }) => ({
                                  crumbs: [
                                    { label: 'Relays', to: '/relays' },
                                    {
                                      label: params.relay,
                                      to: `/relays/${encodeURIComponent(params.relay || '')}`,
                                    },
                                    {
                                      label: 'Groups',
                                      to: `/relays/${encodeURIComponent(params.relay || '')}/groups`,
                                    },
                                    {
                                      label: params.groupId,
                                      to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}`,
                                    },
                                    {
                                      label: 'Group Admins',
                                      to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}/group-admins`,
                                    },
                                    { label: params.groupAdmin },
                                  ],
                                }),
                                async lazy() {
                                  return { Component: (await GroupAdminPage()).GroupAdminPage };
                                },
                              },
                              {
                                path: 'edit-group-admin',
                                loader: ({ params }) => ({
                                  crumbs: [
                                    { label: 'Relays', to: '/relays' },
                                    {
                                      label: params.relay,
                                      to: `/relays/${encodeURIComponent(params.relay || '')}`,
                                    },
                                    {
                                      label: 'Groups',
                                      to: `/relays/${encodeURIComponent(params.relay || '')}/groups`,
                                    },
                                    {
                                      label: params.groupId,
                                      to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}`,
                                    },
                                    {
                                      label: 'Group Admins',
                                      to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}/group-admins`,
                                    },
                                    {
                                      label: params.groupAdmin,
                                      to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}/group-admins/${params.groupAdmin}`,
                                    },
                                    { label: 'Edit Group Admin' },
                                  ],
                                }),
                                async lazy() {
                                  return {
                                    Component: (await EditGroupAdminPage()).EditGroupAdminPage,
                                  };
                                },
                              },
                              {
                                path: 'group-admin-events',
                                element: <Outlet />,
                                children: [
                                  {
                                    path: '/relays/:relay/groups/:groupId/group-admins/:group-admin/group-admin-events',
                                    loader: ({ params }) => ({
                                      crumbs: [
                                        { label: 'Relays', to: '/relays' },
                                        {
                                          label: params.relay,
                                          to: `/relays/${encodeURIComponent(params.relay || '')}`,
                                        },
                                        {
                                          label: 'Groups',
                                          to: `/relays/${encodeURIComponent(params.relay || '')}/groups`,
                                        },
                                        {
                                          label: params.groupId,
                                          to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}`,
                                        },
                                        {
                                          label: 'Group Admins',
                                          to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}/group-admins`,
                                        },
                                        {
                                          label: params.groupAdmin,
                                          to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}/group-admins/${params.groupAdmin}`,
                                        },
                                        { label: 'Group Admin Events' },
                                      ],
                                    }),
                                    async lazy() {
                                      return {
                                        Component: (await GroupAdminEventsPage())
                                          .GroupAdminEventsPage,
                                      };
                                    },
                                  },
                                  {
                                    path: ':group-admin-event',
                                    loader: ({ params }) => ({
                                      crumbs: [
                                        { label: 'Relays', to: '/relays' },
                                        {
                                          label: params.relay,
                                          to: `/relays/${encodeURIComponent(params.relay || '')}`,
                                        },
                                        {
                                          label: 'Groups',
                                          to: `/relays/${encodeURIComponent(params.relay || '')}/groups`,
                                        },
                                        {
                                          label: params.groupId,
                                          to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}`,
                                        },
                                        {
                                          label: 'Group Admins',
                                          to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}/group-admins`,
                                        },
                                        {
                                          label: params.groupAdmin,
                                          to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}/group-admins/${params.groupAdmin}`,
                                        },
                                        {
                                          label: 'Group Admin Events',
                                          to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}/group-admins/${params.groupAdmin}/group-admin-events`,
                                        },
                                        { label: params.groupAdminEvent },
                                      ],
                                    }),
                                    async lazy() {
                                      return {
                                        Component: (await GroupAdminEventPage())
                                          .GroupAdminEventPage,
                                      };
                                    },
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        path: 'group-members',
                        element: <Outlet />,
                        children: [
                          {
                            path: '/relays/:relay/groups/:groupId/group-members',
                            loader: ({ params }) => ({
                              crumbs: [
                                { label: 'Relays', to: '/relays' },
                                {
                                  label: params.relay,
                                  to: `/relays/${encodeURIComponent(params.relay || '')}`,
                                },
                                {
                                  label: 'Groups',
                                  to: `/relays/${encodeURIComponent(params.relay || '')}/groups`,
                                },
                                {
                                  label: params.groupId,
                                  to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}`,
                                },
                                { label: 'Group Members' },
                              ],
                            }),
                            async lazy() {
                              return { Component: (await GroupMembersPage()).GroupMembersPage };
                            },
                          },
                          {
                            path: 'add-group-member',
                            loader: ({ params }) => ({
                              crumbs: [
                                { label: 'Relays', to: '/relays' },
                                {
                                  label: params.relay,
                                  to: `/relays/${encodeURIComponent(params.relay || '')}`,
                                },
                                {
                                  label: 'Groups',
                                  to: `/relays/${encodeURIComponent(params.relay || '')}/groups`,
                                },
                                {
                                  label: params.groupId,
                                  to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}`,
                                },
                                {
                                  label: 'Group Members',
                                  to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}/group-members`,
                                },
                                { label: 'Add Group Member' },
                              ],
                            }),
                            async lazy() {
                              return { Component: (await AddGroupMemberPage()).AddGroupMemberPage };
                            },
                          },
                          {
                            path: ':group-member',
                            element: <Outlet />,
                            children: [
                              {
                                path: '/relays/:relay/groups/:groupId/group-members/:group-member',
                                loader: ({ params }) => ({
                                  crumbs: [
                                    { label: 'Relays', to: '/relays' },
                                    {
                                      label: params.relay,
                                      to: `/relays/${encodeURIComponent(params.relay || '')}`,
                                    },
                                    {
                                      label: 'Groups',
                                      to: `/relays/${encodeURIComponent(params.relay || '')}/groups`,
                                    },
                                    {
                                      label: params.groupId,
                                      to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}`,
                                    },
                                    {
                                      label: 'Group Members',
                                      to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}/group-members`,
                                    },
                                    { label: params.groupMember },
                                  ],
                                }),
                                async lazy() {
                                  return { Component: (await GroupMemberPage()).GroupMemberPage };
                                },
                              },
                              {
                                path: 'edit-group-member',
                                loader: ({ params }) => ({
                                  crumbs: [
                                    { label: 'Relays', to: '/relays' },
                                    {
                                      label: params.relay,
                                      to: `/relays/${encodeURIComponent(params.relay || '')}`,
                                    },
                                    {
                                      label: 'Groups',
                                      to: `/relays/${encodeURIComponent(params.relay || '')}/groups`,
                                    },
                                    {
                                      label: params.groupId,
                                      to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}`,
                                    },
                                    {
                                      label: 'Group Members',
                                      to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}/group-members`,
                                    },
                                    {
                                      label: params.groupMember,
                                      to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}/group-members/${params.groupMember}`,
                                    },
                                    { label: 'Edit Group Member' },
                                  ],
                                }),
                                async lazy() {
                                  return {
                                    Component: (await EditGroupMemberPage()).EditGroupMemberPage,
                                  };
                                },
                              },
                              {
                                path: 'group-member-events',
                                element: <Outlet />,
                                children: [
                                  {
                                    path: '/relays/:relay/groups/:groupId/group-members/:group-member/group-member-events',
                                    loader: ({ params }) => ({
                                      crumbs: [
                                        { label: 'Relays', to: '/relays' },
                                        {
                                          label: params.relay,
                                          to: `/relays/${encodeURIComponent(params.relay || '')}`,
                                        },
                                        {
                                          label: 'Groups',
                                          to: `/relays/${encodeURIComponent(params.relay || '')}/groups`,
                                        },
                                        {
                                          label: params.groupId,
                                          to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}`,
                                        },
                                        {
                                          label: 'Group Members',
                                          to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}/group-members`,
                                        },
                                        {
                                          label: params.groupMember,
                                          to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}/group-members/${params.groupMember}`,
                                        },
                                        { label: 'Group Member Events' },
                                      ],
                                    }),
                                    async lazy() {
                                      return {
                                        Component: (await GroupMemberEventsPage())
                                          .GroupMemberEventsPage,
                                      };
                                    },
                                  },
                                  {
                                    path: ':group-member-event',
                                    loader: ({ params }) => ({
                                      crumbs: [
                                        { label: 'Relays', to: '/relays' },
                                        {
                                          label: params.relay,
                                          to: `/relays/${encodeURIComponent(params.relay || '')}`,
                                        },
                                        {
                                          label: 'Groups',
                                          to: `/relays/${encodeURIComponent(params.relay || '')}/groups`,
                                        },
                                        {
                                          label: params.groupId,
                                          to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}`,
                                        },
                                        {
                                          label: 'Group Members',
                                          to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}/group-members`,
                                        },
                                        {
                                          label: params.groupMember,
                                          to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}/group-members/${params.groupMember}`,
                                        },
                                        {
                                          label: 'Group Member Events',
                                          to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}/group-members/${params.groupMember}/group-member-events`,
                                        },
                                        { label: params.groupMemberEvent },
                                      ],
                                    }),
                                    async lazy() {
                                      return {
                                        Component: (await GroupMemberEventPage())
                                          .GroupMemberEventPage,
                                      };
                                    },
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        path: 'group-events',
                        element: <Outlet />,
                        children: [
                          {
                            path: '/relays/:relay/groups/:groupId/group-events',
                            loader: ({ params }) => ({
                              crumbs: [
                                { label: 'Relays', to: '/relays' },
                                {
                                  label: params.relay,
                                  to: `/relays/${encodeURIComponent(params.relay || '')}`,
                                },
                                {
                                  label: 'Groups',
                                  to: `/relays/${encodeURIComponent(params.relay || '')}/groups`,
                                },
                                {
                                  label: params.groupId,
                                  to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}`,
                                },
                                { label: 'Group Events' },
                              ],
                            }),
                            async lazy() {
                              return { Component: (await GroupEventsPage()).GroupEventsPage };
                            },
                          },
                          {
                            path: 'new-group-event',
                            loader: ({ params }) => ({
                              crumbs: [
                                { label: 'Relays', to: '/relays' },
                                {
                                  label: params.relay,
                                  to: `/relays/${encodeURIComponent(params.relay || '')}`,
                                },
                                {
                                  label: 'Groups',
                                  to: `/relays/${encodeURIComponent(params.relay || '')}/groups`,
                                },
                                {
                                  label: params.groupId,
                                  to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}`,
                                },
                                {
                                  label: 'Group Events',
                                  to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}/group-events`,
                                },
                                { label: 'New Group Event' },
                              ],
                            }),
                            async lazy() {
                              return { Component: (await NewGroupEventPage()).NewGroupEventPage };
                            },
                          },
                          {
                            path: ':group-event',
                            loader: ({ params }) => ({
                              crumbs: [
                                { label: 'Relays', to: '/relays' },
                                {
                                  label: params.relay,
                                  to: `/relays/${encodeURIComponent(params.relay || '')}`,
                                },
                                {
                                  label: 'Groups',
                                  to: `/relays/${encodeURIComponent(params.relay || '')}/groups`,
                                },
                                {
                                  label: params.groupId,
                                  to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}`,
                                },
                                {
                                  label: 'Group Events',
                                  to: `/relays/${encodeURIComponent(params.relay || '')}/groups/${params.groupId}/group-events`,
                                },
                                { label: params.groupEvent },
                              ],
                            }),
                            async lazy() {
                              return { Component: (await GroupEventPage()).GroupEventPage };
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/logout',
    async lazy() {
      return { Component: (await LogoutPage()).LogoutPage };
    },
  },
]);
