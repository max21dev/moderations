import { useGroupsList } from './hooks';

export const GroupsList = () => {
  const { groups } = useGroupsList();

  return groups.map((group) => <div key={group.id}>{group.id}</div>);
};
