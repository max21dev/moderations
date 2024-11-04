import { NDKKind } from '@nostr-dev-kit/ndk';
import { useMemo } from 'react';

import { useGroupEvents } from '@/shared/hooks';

export const useGroupLeaveRequests = (groupId: string | undefined) => {
  const { events } = useGroupEvents(groupId, 9022 as NDKKind);

  const leaveRequests = useMemo(
    () =>
      (events || []).map((event) => ({
        reason: event.content || '',
        pubkey: event.pubkey,
      })),
    [events],
  );

  return { leaveRequests };
};
