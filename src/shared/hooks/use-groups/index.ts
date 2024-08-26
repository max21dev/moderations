import { useSubscribe } from 'nostr-hooks';
import { useMemo } from 'react';

import { Group } from '@/shared/types';

const filters = {
  filters: [{ kinds: [39000], limit: 100 }],
  relays: ['wss://relay.groups.nip29.com'],
};

export const useGroups = () => {
  const { events: groupsEvents } = useSubscribe(filters);

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
              privacy: e.getMatchingTags('public') ? 'public' : 'private',
              type: e.getMatchingTags('open') ? 'open' : 'closed',
              picture: e.getMatchingTags('picture')?.[0]?.[1] || '',
              event: e,
            }) as Group,
        ),
    [groupsEvents],
  );

  return { groups };
};
