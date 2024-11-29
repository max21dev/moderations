import { useNdk } from 'nostr-hooks';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Spinner } from '@/shared/components/spinner';

import { Navbar } from '@/features/navbar';
import { UserLoginModal } from '@/features/users';

import { useLoginModalState } from '@/shared/hooks';

export const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/relays');
  }, [navigate]);

  return null;
};

export const HomeLayout = () => {
  const { ndk } = useNdk();

  const { setIsLoginModalOpen } = useLoginModalState();

  useEffect(() => {
    // Force user to login
    ndk && setIsLoginModalOpen(!ndk.signer);
  }, [ndk, setIsLoginModalOpen]);

  if (!ndk) return <Spinner />;

  if (!ndk.signer) return <UserLoginModal />;

  return (
    <div className="w-full h-full">
      <Navbar />

      <div className="mx-auto mt-14 flex flex-col gap-4 max-w-screen-lg p-4">
        <Outlet />
      </div>
    </div>
  );
};
