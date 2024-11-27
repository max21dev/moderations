import { useParams } from 'react-router-dom';

export const useActiveRelay = () => {
  const { relay } = useParams();

  return { activeRelay: relay };
};
