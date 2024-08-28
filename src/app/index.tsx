import NDK from '@nostr-dev-kit/ndk';
import NDKCacheAdapterDexie from '@nostr-dev-kit/ndk-cache-dexie';
import { useAutoLogin, useNostrHooks } from 'nostr-hooks';
import { useEffect, useMemo } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import { useGlobalNdk } from '@/shared/hooks';

import './index.css';

export const App = () => {
  const { relay } = useParams();

  const ndk = useMemo(
    () =>
      new NDK({
        explicitRelayUrls: relay ? [relay] : undefined,
        autoConnectUserRelays: false,
        autoFetchUserMutelist: false,
        cacheAdapter: relay
          ? new NDKCacheAdapterDexie({
              dbName: `db-${relay}`,
            })
          : undefined,
      }),
    [relay],
  );

  useNostrHooks(ndk);

  const { globalNdk, setGlobalSigner } = useGlobalNdk();

  useEffect(() => {
    globalNdk.connect();
  }, [globalNdk]);

  useAutoLogin();

  useEffect(() => {
    setGlobalSigner(ndk.signer);
  }, [ndk.signer, setGlobalSigner]);

  return <Outlet />;
};
