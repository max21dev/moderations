import { Button } from '@/shared/components/ui/button';
import { H3 } from '@/shared/components/ui/typography/h3';

import { useRelaysList } from '@/shared/hooks';

import { EmptyRelays, RelaysList } from '@/features/relays';

export const RelaysPage = () => {
  const { relays } = useRelaysList();

  if (relays.length == 0) return <EmptyRelays />;

  return (
    <>
      <div className="mb-4 w-full flex items-center">
        <H3>Relays</H3>

        <Button className="ml-auto" variant="outline" asChild>
          <a href="/relays/new-relay">Add New Relay</a>
        </Button>
      </div>

      <RelaysList />
    </>
  );
};
