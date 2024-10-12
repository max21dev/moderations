import { useActiveUser } from 'nostr-hooks';
import { useEffect, useState } from 'react';

import { useGlobalNdk } from '@/shared/hooks';

export const useRelaysList = () => {
  const [relays, setRelays] = useState<string[]>([]);

  const { activeUser } = useActiveUser();

  const { globalNdk } = useGlobalNdk();

  useEffect(() => {
    if (!activeUser) return;

    globalNdk
      .fetchEvent({ authors: [activeUser.pubkey], kinds: [30078], '#d': ['moderations/relays'] })
      .then((e) => {
        if (!e) return;

        const relays = e.getMatchingTags('r')?.map((t) => t[1]);

        setRelays(relays || []);
      });
  }, [activeUser, globalNdk, setRelays]);

  return { relays };
};
