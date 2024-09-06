import { useLogin } from 'nostr-hooks';
import { useEffect } from 'react';

export const LogoutPage = () => {
  const { logout } = useLogin();

  useEffect(() => {
    logout();
  }, [logout]);

  return null;
};
