import NDK from '@nostr-dev-kit/ndk';
import NDKCacheAdapterDexie from '@nostr-dev-kit/ndk-cache-dexie';
import { useAutoLogin, useNostrHooks } from 'nostr-hooks';
import { useEffect, useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';

import './index.css';

import { router } from '@/pages';

import { ThemeProvider } from '@/shared/components/theme-provider';
import { Toaster } from '@/shared/components/ui/toaster';

import { useGlobalNdk } from '@/shared/hooks';
import { useStore } from '@/shared/store';

export const App = () => {
  const relays = useStore((state) => state.relays);
  console.log('relays', relays);
  const activeRelayUrl = useStore((state) => state.activeRelayUrl);
    console.log('activeRelayUrl', activeRelayUrl);

  const ndk = useMemo(
    () =>
      new NDK({
        explicitRelayUrls: [
          relays[0],
          // !activeRelayUrl ? relays[0] : relays.find((relay) => relay.includes(activeRelayUrl)),
        ],
        autoConnectUserRelays: false,
        autoFetchUserMutelist: false,
        cacheAdapter: new NDKCacheAdapterDexie({
          dbName: `db-${relays[0]}`,
          // dbName: `db-${!activeRelayUrl ? relays[0] : relays.find((relay) => relay.includes(activeRelayUrl))}`,
        }),
      }),
    [relays],
  );

  useNostrHooks();
  const { globalNdk, setGlobalSigner } = useGlobalNdk();
  useEffect(() => {
    globalNdk.connect();
  }, [globalNdk]);

  useAutoLogin();

  useEffect(() => {
    setGlobalSigner(ndk.signer);
  }, [ndk.signer, setGlobalSigner]);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </>
  );
};
