import { useStore } from '@/shared/store';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button'; // Assuming ShadCN provides a Button component

export const RelaysList = () => {
  const relays = useStore((state) => state.relays);
  const setActiveRelayUrl = useStore((state) => state.setActiveRelayUrl);

  const navigate = useNavigate();

  const handleRelayClick = (relay: string) => {
    //remove all ws:// and wss:// from beginning of the url
    relay = relay.replace(/^(wss?:\/\/)/, '');
    setActiveRelayUrl(relay);
    navigate(`/relays/${relay}`); // Navigate to the proper page
  };

  return (
    <div className="space-y-4">
      {' '}
      {/* ShadCN style for spacing */}
      {relays &&
        relays.map((relay) => (
          <Button
            key={relay}
            variant="outline" // ShadCN button variant
            onClick={() => handleRelayClick(relay)}
            className="w-full text-left" // Full-width button with left-aligned text
          >
            {relay}
          </Button>
        ))}
    </div>
  );
};
