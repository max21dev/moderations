import { Breadcrumbs } from '@/features/breadcrumbs';
import { GroupLeaveRequests } from '@/features/groups';

export const GroupLeaveRequestsPage = () => {
  return (
    <>
      <Breadcrumbs />

      <div className="w-full flex items-center">
        <h3>Group Leave Requests</h3>
      </div>

      <GroupLeaveRequests />
    </>
  );
};
