import { NDKKind } from '@nostr-dev-kit/ndk';

import { useGroupEvents } from '@/shared/hooks';

export const useGroupNotes = (groupId: string | undefined) => {
  const { events, hasMore, loadMore } = useGroupEvents(groupId, NDKKind.GroupNote);

  return {
    notes: events,
    hasMoreNotes: hasMore,
    loadMoreNotes: loadMore,
  };
};
