import { useLoaderData } from 'react-router-dom';

import { Breadcrumbs } from '@/features/breadcrumbs';

import { LoaderData } from '@/shared/types';

export const AddGroupMemberPage = () => {
  const { crumbs } = useLoaderData() as LoaderData;

  return (
    <>
      <Breadcrumbs crumbs={crumbs} />

      <h1>Add Group Member Page</h1>
    </>
  );
};
