import { useLoaderData } from 'react-router-dom';

import { Breadcrumbs } from '@/features/breadcrumbs';
import { GroupsList } from '@/features/groups';

import { LoaderData } from '@/shared/types';

export const GroupsPage = () => {
  const { crumbs } = useLoaderData() as LoaderData;

  return (
    <>
      <Breadcrumbs crumbs={crumbs} />

      <GroupsList />
    </>
  );
};
