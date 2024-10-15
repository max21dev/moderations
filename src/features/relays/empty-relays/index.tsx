import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

export const EmptyRelays = () => {
  return (
    <div className="w-full flex flex-col justify-center">
      <div className="w-full flex justify-center mt-8">
        <h1 className="text-2xl text-muted-foreground">No relays found</h1>
      </div>

      <div className="w-full flex justify-center mt-4">
        <p className="text-muted-foreground">Add a new relay to get started</p>
      </div>

      <Button className="mx-auto mt-8" asChild>
        <Link to="/relays/new-relay">Add New Relay</Link>
      </Button>
    </div>
  );
};
