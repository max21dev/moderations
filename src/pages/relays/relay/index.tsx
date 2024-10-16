import NDK from '@nostr-dev-kit/ndk';
import NDKCacheAdapterDexie from '@nostr-dev-kit/ndk-cache-dexie';
import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import { Breadcrumbs } from '@/features/breadcrumbs';

import { useGlobalNdk, useNip29Ndk } from '@/shared/hooks';

export const RelayPage = () => {
  return (
    <>
      <Breadcrumbs />

      <h5>Relay Page</h5>
    </>
  );
};

export const RelayLayout = () => {
  const { relay } = useParams();

  const { globalNdk } = useGlobalNdk();
  const { nip29Ndk, setNip29Ndk } = useNip29Ndk();

  useEffect(() => {
    nip29Ndk.connect();
  }, [nip29Ndk]);

  useEffect(() => {
    setNip29Ndk(
      new NDK({
        explicitRelayUrls: relay ? [relay] : undefined,
        autoConnectUserRelays: false,
        autoFetchUserMutelist: false,
        cacheAdapter: new NDKCacheAdapterDexie({ dbName: `db-${relay}` }),
        signer: globalNdk.signer,
      }),
    );
  }, [relay, globalNdk.signer]);

  return <Outlet />;
};
