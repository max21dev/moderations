import { fetchRelayInformation, RelayInformation } from 'nostr-tools/nip11';
import { useEffect, useState } from 'react';

export const useRelayInformation = ({ relay }: { relay: string }) => {
  const [info, setInfo] = useState<RelayInformation | undefined>(undefined);

  useEffect(() => {
    fetchRelayInformation(relay).then((info) => {
      setInfo(info);
    });
  }, [relay, setInfo]);

  return { info };
};
