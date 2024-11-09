import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

import { Breadcrumbs } from '@/features/breadcrumbs';
import { GroupMembers } from '@/features/groups';

export const GroupMembersPage = () => {
  return (
    <>
      <Breadcrumbs />

      <div className="w-full flex items-center">
        <h3>Group Members</h3>

        <Button className="ml-auto" variant="outline" asChild>
          <Link to={`${location.pathname}/add-group-member`}>Add Member</Link>
        </Button>
      </div>

      <GroupMembers />
    </>
  );
};
