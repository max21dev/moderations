import { NDKKind } from '@nostr-dev-kit/ndk';
import { useMemo } from 'react';

import { useGroupMetadataEvents } from '@/shared/hooks';

export const useGroupMembers = (groupId: string | undefined) => {
  const { events } = useGroupMetadataEvents(groupId, NDKKind.GroupMembers);

  const members = useMemo(
    () =>
      events && events.length > 0
        ? events[events.length - 1].getMatchingTags('p').map((pTag) => ({
            publicKey: pTag[1],
          }))
        : [],
    [events],
  );

  return { members };
};
