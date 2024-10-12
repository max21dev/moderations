import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

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

export const HomeLayout = () => {
  const { globalNdk } = useGlobalNdk();

  const { setIsLoginModalOpen } = useLoginModalState();

  useEffect(() => {
    // Force user to login
    setIsLoginModalOpen(!globalNdk.signer);
  }, [globalNdk.signer, setIsLoginModalOpen]);

  if (!globalNdk.signer) {
    return <UserLoginModal />;
  }

  return (
    <div className="w-full h-full">
      <Navbar />

      <div className="mx-auto max-w-screen-lg py-4">
        <Outlet />
      </div>
    </div>
  );
};
