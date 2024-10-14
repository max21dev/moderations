import { useRelaysList } from '@/shared/hooks';

import { RelaysListItem } from './relays-list-item';

export const RelaysList = () => {
  const { relays } = useRelaysList();

  return (
    <div className="flex flex-col w-full gap-4">
      {relays.map((relay) => (
        <RelaysListItem key={relay} relay={relay} />
      ))}
    </div>
  );
};
