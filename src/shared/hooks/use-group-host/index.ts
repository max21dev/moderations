import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

export const useGroupHost = () => {
  const { relay } = useParams();

  const host = useMemo(
    () => (relay ? relay.replace('wss://', '').replace('ws://', '').replace('/', '') : ''),
    [relay],
  );

  return { host };
};
