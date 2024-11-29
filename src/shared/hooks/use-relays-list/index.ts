import { useActiveUser, useSubscription } from 'nostr-hooks';
import { useEffect, useMemo } from 'react';

export const useRelaysList = () => {
  const { activeUser } = useActiveUser();

  const subId = activeUser ? `relaysList-${activeUser.pubkey}` : undefined;

  const { events, isLoading, createSubscription, removeSubscription } = useSubscription(subId);

  useEffect(() => {
    activeUser &&
      createSubscription([
        { authors: [activeUser.pubkey], kinds: [30078], '#d': ['moderations/relays'] },
      ]);

    return () => {
      removeSubscription();
    };
  }, [activeUser?.pubkey, createSubscription, removeSubscription]);

  const relays = useMemo(
    () => (events && events.length > 0 ? events[0].getMatchingTags('r')?.map((t) => t[1]) : []),
    [events],
  );

  return { relays, isLoading };
};
