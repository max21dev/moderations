import { Breadcrumbs } from '@/features/breadcrumbs';
import { GroupThreadComments } from '@/features/groups';

export const GroupThreadCommentsPage = () => {
  return (
    <>
      <Breadcrumbs />

      <div className="w-full flex items-center">
        <h3>Group Thread Comments</h3>
      </div>

      <GroupThreadComments />
    </>
  );
};
