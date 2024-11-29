import { Nip29Relay } from 'nostr-hooks/nip29';

export const getHostFromRelay = (relay: Nip29Relay) => {
  return relay?.replace('wss://', '').replace('ws://', '').replace('/', '') || undefined;
};
