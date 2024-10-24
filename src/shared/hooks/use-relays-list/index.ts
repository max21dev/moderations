import { useActiveUser, useSubscribe } from 'nostr-hooks';
import { useMemo } from 'react';

import { useGlobalNdk } from '@/shared/hooks';

export const useRelaysList = () => {
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

  const isLoading = useMemo(() => relays.length == 0 && !eose, [relays, eose]);

  return { relays, isLoading };
};
