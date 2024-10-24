import { NDKKind } from '@nostr-dev-kit/ndk';
import { useMemo } from 'react';

import { useGroupMetadataEvents } from '@/shared/hooks';

import { Group } from '@/shared/types';

export const useGroup = (groupId: string | undefined) => {
  const { events, isLoading } = useGroupMetadataEvents(groupId, NDKKind.GroupMetadata);

  const group = useMemo(() => {
    if (events.length == 0) {
      return undefined;
    }

    const groupEvent = events[0];

    const nameTag = groupEvent.getMatchingTags('name')[0];
    const pictureTag = groupEvent.getMatchingTags('picture')[0];
    const aboutTag = groupEvent.getMatchingTags('about')[0];

    return {
      id: groupEvent.dTag,
      name: nameTag ? nameTag[1] : 'Unknown',
      privacy: groupEvent.getMatchingTags('public') ? 'public' : 'private',
      type: groupEvent.getMatchingTags('open') ? 'open' : 'closed',
      about: aboutTag ? aboutTag[1] : '',
      picture: pictureTag ? pictureTag[1] : '',
      event: groupEvent,
      relay: groupEvent.relay?.url || '',
    } as Group;
  }, [events]);

  return { group, isLoading };
};
