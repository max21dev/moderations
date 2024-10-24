import { NDKKind } from '@nostr-dev-kit/ndk';
import { useSubscribe } from 'nostr-hooks';
import { useMemo } from 'react';

import { useNip29Ndk } from '@/shared/hooks';

export const useGroupMetadataEvents = (groupId: string | undefined, eventKind: NDKKind) => {
  const { nip29Ndk } = useNip29Ndk();

  const { events, eose } = useSubscribe(
    useMemo(
      () => ({
        filters: !groupId ? [] : [{ kinds: [eventKind], '#d': [groupId], limit: 1 }],
        enabled: !!nip29Ndk && !!groupId && !!eventKind,
        opts: { groupable: false },
        customNdk: nip29Ndk,
      }),
      [nip29Ndk, groupId, eventKind],
    ),
  );

  const isLoading = useMemo(() => (!events || events.length == 0) && !eose, [events, eose]);

  return { events, isLoading };
};
