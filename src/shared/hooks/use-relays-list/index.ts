import { useActiveUser, useSubscribe } from 'nostr-hooks';
import { useEffect, useMemo, useState } from 'react';

import { useGlobalNdk } from '@/shared/hooks';

export const useRelaysList = () => {
  const [relays, setRelays] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { globalNdk } = useGlobalNdk();

  const { activeUser } = useActiveUser({ customNdk: globalNdk });

  const filters = useMemo(
    () =>
      activeUser
        ? [{ authors: [activeUser.pubkey], kinds: [30078], '#d': ['moderations/relays'] }]
        : [],
    [activeUser],
  );

  const params = useMemo(
    () => ({ filters, enabled: !!activeUser, customNdk: globalNdk }),
    [filters, activeUser, globalNdk],
  );

  const { events, eose } = useSubscribe(params);

  useEffect(() => {
    if (!events || events.length == 0) return;

    const relays = events[0].getMatchingTags('r')?.map((t) => t[1]);

    setRelays(relays || []);
  }, [events, setRelays]);

  useEffect(() => {
    if (events && events.length > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(!eose);
    }
  }, [events, eose]);

  return { relays, isLoading };
};
