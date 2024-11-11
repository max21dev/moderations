import { NDKKind } from '@nostr-dev-kit/ndk';

import { useGroupEvents } from '@/shared/hooks';

export const useGroupChats = (groupId: string | undefined) => {
  const { events, hasMore, loadMore } = useGroupEvents(groupId, NDKKind.GroupChat);

  return {
    chats: events,
    hasMoreChats: hasMore,
    loadMoreChats: loadMore,
  };
};
