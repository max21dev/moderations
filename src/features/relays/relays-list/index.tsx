import { Spinner } from '@/shared/components/spinner';

import { useRelaysList } from '@/shared/hooks';

import { EmptyRelaysList } from './empty-relays-list';
import { RelaysListItem } from './relays-list-item';

export const RelaysList = () => {
  const { relays, isLoading } = useRelaysList();

  if (isLoading) return <Spinner />;

  if (relays.length == 0) return <EmptyRelaysList />;

  return (
    <div className="flex flex-col w-full gap-4">
      {relays.map((relay) => (
        <RelaysListItem key={relay} relay={relay} />
      ))}
    </div>
  );
};
