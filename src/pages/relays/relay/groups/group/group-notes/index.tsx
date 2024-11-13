import { Breadcrumbs } from '@/features/breadcrumbs';
import { GroupNotes } from '@/features/groups';

export const GroupNotesPage = () => {
  return (
    <>
      <Breadcrumbs />

      <div className="w-full flex items-center">
        <h3>Group Notes</h3>
      </div>

      <GroupNotes />
    </>
  );
};
