import { useLoaderData } from 'react-router-dom';

import { Breadcrumbs } from '@/features/breadcrumbs';
import { GroupDetails } from '@/features/group';

import { LoaderData } from '@/shared/types';

export const GroupPage = () => {
  const { crumbs } = useLoaderData() as LoaderData;

  return (
    <>
      <Breadcrumbs crumbs={crumbs} />

      <GroupDetails />
    </>
  );
};
