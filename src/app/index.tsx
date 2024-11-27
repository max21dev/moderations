import { useLogin, useNdk } from 'nostr-hooks';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { ThemeProvider } from '@/shared/components/theme-provider';
import { Toaster } from '@/shared/components/ui/toaster';

import { router } from '@/app/router';

import './index.css';

export const App = () => {
  const { initNdk, ndk } = useNdk();

  const { loginFromLocalStorage } = useLogin();

  useEffect(() => {
    initNdk({
      explicitRelayUrls: ['wss://nos.lol', 'wss://relay.damus.io/'],
      autoConnectUserRelays: true,
      autoFetchUserMutelist: false,
      // cacheAdapter: new NDKCacheAdapterDexie({ dbName: `db-global` }),
    });
  }, [initNdk]);

  useEffect(() => {
    ndk?.connect();
  }, [ndk]);

  useEffect(() => {
    loginFromLocalStorage();
  }, [loginFromLocalStorage]);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </>
  );
};
