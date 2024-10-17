import { fetchRelayInformation, RelayInformation } from 'nostr-tools/nip11';
import { useEffect, useState } from 'react';

export const useRelayInformation = ({ relay }: { relay: string | undefined }) => {
  const [info, setInfo] = useState<RelayInformation | undefined>(undefined);

  useEffect(() => {
    if (!relay) return;

    fetchRelayInformation(relay).then((info) => {
      setInfo(info);
    });
  }, [relay, setInfo]);

  return { info };
};
