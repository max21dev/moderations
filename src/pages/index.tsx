import NDK from '@nostr-dev-kit/ndk';
import NDKCacheAdapterDexie from '@nostr-dev-kit/ndk-cache-dexie';
import { useAutoLogin, useNostrHooks } from 'nostr-hooks';
import { useEffect, useMemo } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import { Navbar } from '@/features/navbar';

import { Button } from '@/shared/components/ui/button';

import { useGlobalNdk } from '@/shared/hooks';

export const HomePage = () => {
  return (
    <div>
      <Button
        variant="ghost"
        onClick={() => {
          window.location.href = '/relays';
        }}
      >
        Navigate to relays page
      </Button>

      <Outlet />
    </div>
  );
};

export const Layout = () => {
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

  return (
    <div className="w-full h-full">
      <Navbar />

      <div className="mx-auto max-w-screen-lg">
        <Outlet />
      </div>
    </div>
  );
};
