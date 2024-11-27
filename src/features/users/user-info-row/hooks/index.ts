import { NDKUser } from '@nostr-dev-kit/ndk';
import { useProfile } from 'nostr-hooks';
import { useMemo } from 'react';

export const useUserInfoRow = ({ pubkey }: { pubkey: string }) => {
  const { profile } = useProfile({ pubkey });

  const npub = useMemo(() => new NDKUser({ pubkey }).npub, [pubkey]);

  const name = useMemo(() => profile?.displayName || profile?.name || '<unnamed>', [profile]);
  const image = useMemo(() => profile?.image, [profile]);
  const nip05 = useMemo(() => profile?.nip05, [profile]);

  return { name, image, npub, nip05 };
};
