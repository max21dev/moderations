import { useSubscribe } from 'nostr-hooks';
import { useMemo } from 'react';

import { useNip29Ndk } from '@/shared/hooks';
import { GroupMetadata } from '@/shared/types';

const filters = [{ kinds: [39000], limit: 100 }];

// TODO: refactor – no need to use useSubscribe directly

export const useGroupsMetadataList = () => {
  const { nip29Ndk } = useNip29Ndk();

  const {
    events: groupsEvents,
    eose,
    hasMore,
    loadMore,
  } = useSubscribe(useMemo(() => ({ filters, customNdk: nip29Ndk }), [nip29Ndk]));

  const metadataList = useMemo(
    () =>
      groupsEvents
        .filter((e) => {
          const dTag = e.dTag;
          const nameTag = e.getMatchingTags('name')?.[0];

          return dTag && nameTag && nameTag[1] !== '';
        })
        .map(
          (e) =>
            ({
              id: e.dTag,
              name: e.getMatchingTags('name')?.[0]?.[1],
              about: e.getMatchingTags('about')?.[0]?.[1],
              picture: e.getMatchingTags('picture')?.[0]?.[1] || '',
              isOpen: e.getMatchingTags('open') ? true : false,
              isPublic: e.getMatchingTags('public') ? true : false,
            }) as GroupMetadata,
        ),
    [groupsEvents],
  );

  const isLoading = useMemo(
    () => (!metadataList || metadataList.length == 0) && !eose,
    [metadataList, eose],
  );

  return { metadataList, isLoading, hasMore, loadMore };
};
