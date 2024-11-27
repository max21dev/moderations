import { useParams } from 'react-router-dom';

export const useActiveGroupId = () => {
  const { groupId } = useParams();

  return { activeGroupId: groupId };
};
