import { useLogin } from 'nostr-hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGlobalNdk } from '@/shared/hooks';

export const LogoutPage = () => {
  const { globalNdk, setGlobalNdk } = useGlobalNdk();

  const { logout } = useLogin({ customNdk: globalNdk, setCustomNdk: setGlobalNdk });

  const navigate = useNavigate();

  useEffect(() => {
    logout();

    navigate('/');
  }, [logout, navigate]);

  return null;
};
