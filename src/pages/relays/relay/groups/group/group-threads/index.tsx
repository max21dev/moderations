import { Breadcrumbs } from '@/features/breadcrumbs';
import { GroupThreads } from '@/features/groups';

export const GroupThreadsPage = () => {
  return (
    <>
      <Breadcrumbs />

      <div className="w-full flex items-center">
        <h3>Group Threads</h3>
      </div>

      <GroupThreads />
    </>
  );
};
