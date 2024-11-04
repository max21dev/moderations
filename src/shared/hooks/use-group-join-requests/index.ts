import { NDKKind } from '@nostr-dev-kit/ndk';
import { useMemo } from 'react';

import { useGroupEvents } from '@/shared/hooks';

export const useGroupJoinRequests = (groupId: string | undefined) => {
  const { events } = useGroupEvents(groupId, NDKKind.GroupAdminRequestJoin);

  console.log('events', events);

  const joinRequests = useMemo(
    () =>
      (events || []).map((event) => ({
        reason: event.content || '',
        code: event.getMatchingTags('code')?.[0]?.[1] || '',
        pubkey: event.pubkey,
      })),
    [events],
  );

  return { joinRequests };
};
