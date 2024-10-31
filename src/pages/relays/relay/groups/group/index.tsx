import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

import { Breadcrumbs } from '@/features/breadcrumbs';
import { GroupDetails } from '@/features/groups';

export const GroupPage = () => {
  return (
    <>
      <Breadcrumbs />

      <div className="mb-4 w-full flex items-center">
        <h3>Group Details</h3>

        <Button className="ml-auto" variant="outline" asChild>
          <Link to={`${location.pathname}/edit-group`}>Edit Group</Link>
        </Button>
      </div>

      <GroupDetails />
    </>
  );
};
