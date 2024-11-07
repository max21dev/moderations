import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

import { Breadcrumbs } from '@/features/breadcrumbs';
import { GroupAdmins } from '@/features/groups';

export const GroupAdminsPage = () => {
  return (
    <>
      <Breadcrumbs />

      <div className="w-full flex items-center">
        <h3>Group Admins</h3>

        <Button className="ml-auto" variant="outline" asChild>
          <Link to={`${location.pathname}/add-group-admin`}>Add Admin</Link>
        </Button>
      </div>

      <GroupAdmins />
    </>
  );
};
