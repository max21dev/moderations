import { useLoaderData } from 'react-router-dom';

import { Breadcrumbs } from '@/features/breadcrumbs';

import { LoaderData } from '@/shared/types';

export const EditGroupPage = () => {
  const { crumbs } = useLoaderData() as LoaderData;

  return (
    <>
      <Breadcrumbs crumbs={crumbs} />

      <h1>Edit Group Page</h1>
    </>
  );
};
