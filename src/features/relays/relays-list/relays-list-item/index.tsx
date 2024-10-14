import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Muted } from '@/shared/components/ui/typography/muted';
import { P } from '@/shared/components/ui/typography/p';

import { useRelayInformation } from '@/shared/hooks';

// TODO: Enhancements

// /relays/${encodeURIComponent(relay)}

export const RelaysListItem = ({ relay }: { relay: string }) => {
  const { info } = useRelayInformation({ relay });

  if (!info) {
    return null;
  }

  return (
    <Card key={relay}>
      <CardHeader>
        <CardTitle>{info.name}</CardTitle>
        <CardDescription>{info.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <P>{relay}</P>
      </CardContent>
      <CardFooter>
        <Muted>
          <span className="mr-2">Pubkey:</span>
          <span>{info.pubkey}</span>
        </Muted>
      </CardFooter>
    </Card>
  );
};
