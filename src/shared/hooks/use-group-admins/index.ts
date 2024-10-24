import { NDKKind } from '@nostr-dev-kit/ndk';
import { useMemo } from 'react';

import { GroupAdminPermission } from '@/shared/types';

import { useGroupEvents } from '@/shared/hooks';

export const useGroupAdmins = (groupId: string | undefined) => {
  const { events } = useGroupEvents(groupId, NDKKind.GroupAdmins);

  const admins = useMemo(
    () =>
      events && events.length > 0
        ? events[events.length - 1].getMatchingTags('p').map((pTag) => ({
            publicKey: pTag[1],
            permissions: pTag.slice(3) as GroupAdminPermission[],
          }))
        : [],
    [events],
  );

  return { admins };
};
