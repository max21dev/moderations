import { useActiveUser, useSubscribe } from 'nostr-hooks';
import { useEffect, useMemo, useState } from 'react';

import { useGlobalNdk } from '@/shared/hooks';

export const useRelaysList = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { globalNdk } = useGlobalNdk();

  const { activeUser } = useActiveUser({ customNdk: globalNdk });

  const { events, eose } = useSubscribe(
    useMemo(
      () => ({
        filters: activeUser
          ? [{ authors: [activeUser.pubkey], kinds: [30078], '#d': ['moderations/relays'] }]
          : [],
        enabled: !!activeUser,
        customNdk: globalNdk,
      }),
      [activeUser, globalNdk],
    ),
  );

  const relays = useMemo(
    () => (events && events.length > 0 ? events[0].getMatchingTags('r')?.map((t) => t[1]) : []),
    [events],
  );

  useEffect(() => {
    if (events && events.length > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(!eose);
    }
  }, [events, eose]);

  return { relays, isLoading };
};
