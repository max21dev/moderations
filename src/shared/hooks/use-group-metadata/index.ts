import { NDKKind } from '@nostr-dev-kit/ndk';
import { useMemo } from 'react';

import { useGroupMetadataEvents } from '@/shared/hooks';

import { GroupMetadata } from '@/shared/types';

export const useGroupMetadata = (groupId: string | undefined) => {
  const { events, isLoading } = useGroupMetadataEvents(groupId, NDKKind.GroupMetadata);

  const metadataEvent = events[0];

  const metadata = useMemo(() => {
    if (events.length == 0) {
      return undefined;
    }

    const { dTag } = metadataEvent;
    if (!dTag) {
      return undefined;
    }

    const nameTag = metadataEvent.getMatchingTags('name')[0];
    const pictureTag = metadataEvent.getMatchingTags('picture')[0];
    const aboutTag = metadataEvent.getMatchingTags('about')[0];

    const isOpen = metadataEvent.getMatchingTags('open') ? true : false;
    const isPublic = metadataEvent.getMatchingTags('public') ? true : false;

    return {
      id: dTag,
      about: aboutTag ? aboutTag[1] : '',
      isOpen,
      isPublic,
      name: nameTag ? nameTag[1] : '<unnamed>',
      picture: pictureTag ? pictureTag[1] : '',
    } as GroupMetadata;
  }, [events]);

  return { metadata, isLoading, metadataEvent };
};
