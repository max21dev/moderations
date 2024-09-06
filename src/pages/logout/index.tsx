import { useLogin } from 'nostr-hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const LogoutPage = () => {
  const { logout } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    logout();

    navigate('/');
  }, [logout, navigate]);

  return null;
};
