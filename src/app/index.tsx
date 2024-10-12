import { useLogin } from 'nostr-hooks';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { ThemeProvider } from '@/shared/components/theme-provider';
import { Toaster } from '@/shared/components/ui/toaster';

import { router } from '@/app/router';

import { useGlobalNdk } from '@/shared/hooks';

import './index.css';

export const App = () => {
  const { globalNdk, setGlobalNdk } = useGlobalNdk();

  useEffect(() => {
    globalNdk.connect();
  }, [globalNdk]);

  const { loginFromLocalStorage } = useLogin({ customNdk: globalNdk, setCustomNdk: setGlobalNdk });

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
