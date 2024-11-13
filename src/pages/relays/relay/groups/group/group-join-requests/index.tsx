import { Breadcrumbs } from '@/features/breadcrumbs';
import { GroupJoinRequests } from '@/features/groups';

export const GroupJoinRequestsPage = () => {
  return (
    <>
      <Breadcrumbs />

      <div className="w-full flex items-center">
        <h3>Group Join Requests</h3>
      </div>

      <GroupJoinRequests />
    </>
  );
};
