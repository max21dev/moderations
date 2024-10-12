import { EmptyRelays, RelaysList } from '@/features/relays';

import { useRelaysList } from '@/shared/hooks';

export const RelaysPage = () => {
  const { relays } = useRelaysList();

  if (relays.length == 0) return <EmptyRelays />;

  return <RelaysList />;
};
