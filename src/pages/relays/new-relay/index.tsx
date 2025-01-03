import { NDKEvent } from '@nostr-dev-kit/ndk';
import { useNdk } from 'nostr-hooks';
import { useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { H3 } from '@/shared/components/ui/typography/h3';
import { useToast } from '@/shared/components/ui/use-toast';

import { Breadcrumbs } from '@/features/breadcrumbs';

import { useRelaysList } from '@/shared/hooks';

export const NewRelayPage = () => {
  const [inputValue, setInputValue] = useState('');

  const { toast } = useToast();

  const { relays } = useRelaysList();
  const { ndk } = useNdk();

  const handleAddRelay = () => {
    if (!inputValue) {
      toast({ description: 'Please enter a relay URL', variant: 'destructive' });
      return;
    }

    if (relays.includes(inputValue)) {
      toast({ description: 'Relay already exists', variant: 'destructive' });
      return;
    }

    if (!/wss?:\/\/[a-z0-9.-]+/.test(inputValue)) {
      toast({ description: 'Invalid relay URL', variant: 'destructive' });
      return;
    }

    const event = new NDKEvent(ndk);
    event.kind = 30078;
    event.dTag = 'moderations/relays';
    relays.forEach((relay) => {
      event.tags.push(['r', relay]);
    });
    event.tags.push(['r', inputValue]);
    event
      .publish()
      .then(() => {
        toast({ description: 'Relay added' });
        setInputValue('');
      })
      .catch((e) => {
        console.error(e);
        toast({ description: 'Error adding relay', variant: 'destructive' });
      });
  };

  return (
    <>
      <Breadcrumbs />

      <H3>Add New Relay</H3>

      <div className="flex gap-2 items-center w-full">
        <Label htmlFor="relay-name" className="shrink-0">
          Relay URL:
        </Label>

        <Input
          id="relay-name"
          placeholder="wss://relay.groups.nip29.com"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && !!inputValue && handleAddRelay()}
        />

        <Button onClick={handleAddRelay}>Add Relay</Button>
      </div>
    </>
  );
};
