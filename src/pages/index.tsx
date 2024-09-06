import NDK from '@nostr-dev-kit/ndk';
import NDKCacheAdapterDexie from '@nostr-dev-kit/ndk-cache-dexie';
import { useAutoLogin, useNostrHooks, useSigner } from 'nostr-hooks';
import { useEffect, useMemo } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import { Navbar } from '@/features/navbar';
import { UserLoginModal } from '@/features/users';

import { useGlobalNdk, useLoginModalState } from '@/shared/hooks';

export const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/relays');
  }, [navigate]);

  return null;
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

  const { signer } = useSigner();

  useEffect(() => {
    setGlobalSigner(signer);
  }, [signer, setGlobalSigner]);

  const { setIsLoginModalOpen } = useLoginModalState();

  useEffect(() => {
    // Force user to login
    setIsLoginModalOpen(!signer);
  }, [signer, setIsLoginModalOpen]);

  if (!signer) {
    return <UserLoginModal />;
  }

  return (
    <div className="w-full h-full">
      <Navbar />

      <div className="mx-auto max-w-screen-lg">
        <Outlet />
      </div>
    </div>
  );
};
