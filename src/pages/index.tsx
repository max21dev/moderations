import { Outlet } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button.tsx';

export const HomePage = () => {
  return (
    <div>
      <Button
        variant="ghost"
        onClick={() => {
          window.location.href = '/relays';
        }}
      >
        Navigate to relays page
      </Button>
      <Outlet />
    </div>
  );
};
