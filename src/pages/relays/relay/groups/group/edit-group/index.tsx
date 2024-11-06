import { Breadcrumbs } from '@/features/breadcrumbs';
import { EditGroup } from '@/features/groups';

export const EditGroupPage = () => {
  return (
    <>
      <Breadcrumbs />

      <div className="w-full flex items-center">
        <h3>Edit Group</h3>
      </div>

      <EditGroup />
    </>
  );
};
