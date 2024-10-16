import NDK from '@nostr-dev-kit/ndk';
import NDKCacheAdapterDexie from '@nostr-dev-kit/ndk-cache-dexie';
import { useEffect } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import { H3 } from '@/shared/components/ui/typography/h3';

import { Breadcrumbs } from '@/features/breadcrumbs';

import { useGlobalNdk, useNip29Ndk } from '@/shared/hooks';

export const RelayPage = () => {
  return (
    <>
      <Breadcrumbs />

      <div className="mb-4 w-full flex items-center">
        <H3>Relay</H3>

        <Button className="ml-auto mr-2" variant="outline" asChild>
          <Link to={`${location.pathname}/edit-relay`}>Edit Relay</Link>
        </Button>

        <Button asChild>
          <Link to={`${location.pathname}/groups`}>View Groups</Link>
        </Button>
      </div>
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
