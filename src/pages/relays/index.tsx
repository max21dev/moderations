import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import { H3 } from '@/shared/components/ui/typography/h3';

import { RelaysList } from '@/features/relays';

export const RelaysPage = () => {
  return (
    <>
      <div className="w-full flex items-center">
        <H3>Relays</H3>

        <Button className="ml-auto" variant="outline" asChild>
          <Link to={`${location.pathname}/new-relay`}>Add New Relay</Link>
        </Button>
      </div>

      <RelaysList />
    </>
  );
};
