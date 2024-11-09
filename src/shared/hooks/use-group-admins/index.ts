import { NDKKind } from '@nostr-dev-kit/ndk';
import { useMemo } from 'react';

import { useGroupMetadataEvents } from '@/shared/hooks';

export const useGroupAdmins = (groupId: string | undefined) => {
  const { events } = useGroupMetadataEvents(groupId, NDKKind.GroupAdmins);

  const admins = useMemo(
    () =>
      events && events.length > 0
        ? events[events.length - 1].getMatchingTags('p').map((pTag) => ({
            publicKey: pTag[1],
            roles: pTag.slice(2),
          }))
        : [],
    [events],
  );

  return { admins };
};
