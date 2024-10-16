import { Link } from 'react-router-dom';

import { Spinner } from '@/shared/components/spinner';
import { Button } from '@/shared/components/ui/button';
import { H3 } from '@/shared/components/ui/typography/h3';

import { useRelaysList } from '@/shared/hooks';

import { EmptyRelays, RelaysList } from '@/features/relays';

export const RelaysPage = () => {
  const { relays, isLoading } = useRelaysList();

  return (
    <>
      <div className="mb-4 w-full flex items-center">
        <H3>Relays</H3>

        <Button className="ml-auto" variant="outline" asChild>
          <Link to="/relays/new-relay">Add New Relay</Link>
        </Button>
      </div>

      {isLoading ? <Spinner /> : relays.length == 0 ? <EmptyRelays /> : <RelaysList />}
    </>
  );
};
