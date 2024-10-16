import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import { H3 } from '@/shared/components/ui/typography/h3';

import { Breadcrumbs } from '@/features/breadcrumbs';
import { GroupsList } from '@/features/groups';

export const GroupsPage = () => {
  return (
    <>
      <Breadcrumbs />

      <div className="mb-4 w-full flex items-center">
        <H3>Groups</H3>

        <Button className="ml-auto" variant="outline" asChild>
          <Link to={`${location.pathname}/new-group`}>Create New Group</Link>
        </Button>
      </div>

      <GroupsList />
    </>
  );
};
