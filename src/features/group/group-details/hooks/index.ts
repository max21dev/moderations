import { useGroup, useGroupAdmins, useGroupMembers, useGroupNotes } from '@/shared/hooks';

export const useGroupDetails = ({ groupId }: { groupId: string | undefined }) => {
  const { group } = useGroup(groupId);
  const { members } = useGroupMembers(groupId);
  const { admins } = useGroupAdmins(groupId);
  const { notes } = useGroupNotes(groupId);

  return { group, members, admins, notes };
};
