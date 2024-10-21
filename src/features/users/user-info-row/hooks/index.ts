import { NDKUser } from '@nostr-dev-kit/ndk';
import { useMemo } from 'react';

import { useGlobalProfile } from '@/shared/hooks';

export const useUserInfoRow = ({ pubkey }: { pubkey: string }) => {
  const { profile } = useGlobalProfile({ pubkey });

  const npub = useMemo(() => new NDKUser({ pubkey }).npub, [pubkey]);

  const name = useMemo(() => profile?.displayName || profile?.name || '<unnamed>', [profile]);
  const image = useMemo(() => profile?.image, [profile]);

  return { name, image, npub };
};
