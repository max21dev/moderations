import { useSubscribe } from 'nostr-hooks';
import { useEffect, useMemo, useState } from 'react';

import { useNip29Ndk } from '@/shared/hooks';
import { Group } from '@/shared/types';

const filters = [{ kinds: [39000], limit: 100 }];

export const useGroupsList = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { nip29Ndk } = useNip29Ndk();

  const { events: groupsEvents, eose } = useSubscribe(
    useMemo(() => ({ filters, customNdk: nip29Ndk }), [nip29Ndk]),
  );

  const groups = useMemo(
    () =>
      groupsEvents
        .filter((e) => {
          const nameTag = e.getMatchingTags('name')?.[0];

          return nameTag && nameTag[1] !== '';
        })
        .map(
          (e) =>
            ({
              id: e.dTag,
              name: e.getMatchingTags('name')?.[0]?.[1],
              about: e.getMatchingTags('about')?.[0]?.[1],
              privacy: e.getMatchingTags('public') ? 'public' : 'private',
              type: e.getMatchingTags('open') ? 'open' : 'closed',
              picture: e.getMatchingTags('picture')?.[0]?.[1] || '',
              event: e,
              relay: e.relay?.url || '',
            }) as Group,
        ),
    [groupsEvents],
  );

  useEffect(() => {
    if (groups && groups.length > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(!eose);
    }
  }, [groups, eose]);

  return { groups, isLoading };
};
