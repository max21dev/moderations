import { Breadcrumbs } from '@/features/breadcrumbs';
import { GroupChats } from '@/features/groups';

export const GroupChatsPage = () => {
  return (
    <>
      <Breadcrumbs />

      <div className="w-full flex items-center">
        <h3>Group Chats</h3>
      </div>

      <GroupChats />
    </>
  );
};
