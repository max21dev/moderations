import { useLoaderData } from 'react-router-dom';

import { Breadcrumbs } from '@/features/breadcrumbs';

import { LoaderData } from '@/shared/types';

export const GroupMembersPage = () => {
  const { crumbs } = useLoaderData() as LoaderData;

  return (
    <>
      <Breadcrumbs crumbs={crumbs} />

      <h1>Group Members Page</h1>
    </>
  );
};
