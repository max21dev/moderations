import { createBrowserRouter } from 'react-router-dom';

import { App } from '@/app';

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
    element: <App />,
    children: [
      {
        path: '/',
        async lazy() {
          return { Component: (await HomePage()).HomePage };
        },
      },
      {
        path: 'relays',
        async lazy() {
          return { Component: (await RelaysPage()).RelaysPage };
        },
        children: [
          {
            path: 'new-relay',
            async lazy() {
              return { Component: (await NewRelayPage()).NewRelayPage };
            },
          },
          {
            path: ':relay',
            async lazy() {
              return { Component: (await RelayPage()).RelayPage };
            },
            children: [
              {
                path: 'edit-relay',
                async lazy() {
                  return { Component: (await EditRelayPage()).EditRelayPage };
                },
              },
              {
                path: 'groups',
                async lazy() {
                  return { Component: (await GroupsPage()).GroupsPage };
                },
                children: [
                  {
                    path: 'new-group',
                    async lazy() {
                      return { Component: (await NewGroupPage()).NewGroupPage };
                    },
                  },
                  {
                    path: ':group',
                    async lazy() {
                      return { Component: (await GroupPage()).GroupPage };
                    },
                    children: [
                      {
                        path: 'edit-group',
                        async lazy() {
                          return { Component: (await EditGroupPage()).EditGroupPage };
                        },
                      },
                      {
                        path: 'group-admins',
                        async lazy() {
                          return { Component: (await GroupAdminsPage()).GroupAdminsPage };
                        },
                        children: [
                          {
                            path: 'add-group-admin',
                            async lazy() {
                              return { Component: (await AddGroupAdminPage()).AddGroupAdminPage };
                            },
                          },
                          {
                            path: ':group-admin',
                            async lazy() {
                              return { Component: (await GroupAdminPage()).GroupAdminPage };
                            },
                            children: [
                              {
                                path: 'edit-group-admin',
                                async lazy() {
                                  return {
                                    Component: (await EditGroupAdminPage()).EditGroupAdminPage,
                                  };
                                },
                              },
                              {
                                path: 'group-admin-events',
                                async lazy() {
                                  return {
                                    Component: (await GroupAdminEventsPage()).GroupAdminEventsPage,
                                  };
                                },
                                children: [
                                  {
                                    path: ':group-admin-event',
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
                        async lazy() {
                          return { Component: (await GroupMembersPage()).GroupMembersPage };
                        },
                        children: [
                          {
                            path: 'add-group-member',
                            async lazy() {
                              return { Component: (await AddGroupMemberPage()).AddGroupMemberPage };
                            },
                          },
                          {
                            path: ':group-member',
                            async lazy() {
                              return { Component: (await GroupMemberPage()).GroupMemberPage };
                            },
                            children: [
                              {
                                path: 'edit-group-member',
                                async lazy() {
                                  return {
                                    Component: (await EditGroupMemberPage()).EditGroupMemberPage,
                                  };
                                },
                              },
                              {
                                path: 'group-member-events',
                                async lazy() {
                                  return {
                                    Component: (await GroupMemberEventsPage())
                                      .GroupMemberEventsPage,
                                  };
                                },
                                children: [
                                  {
                                    path: ':group-member-event',
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
                        async lazy() {
                          return { Component: (await GroupEventsPage()).GroupEventsPage };
                        },
                        children: [
                          {
                            path: 'new-group-event',
                            async lazy() {
                              return { Component: (await NewGroupEventPage()).NewGroupEventPage };
                            },
                          },
                          {
                            path: ':group-event',
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
]);
