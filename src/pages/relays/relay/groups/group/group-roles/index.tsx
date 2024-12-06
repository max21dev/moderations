import { Breadcrumbs } from '@/features/breadcrumbs';
import { GroupRoles } from '@/features/groups';

export const GroupRolesPage = () => {
  return (
    <>
      <Breadcrumbs />

      <div className="w-full flex items-center">
        <h3>Group Roles</h3>
      </div>

      <GroupRoles />
    </>
  );
};
