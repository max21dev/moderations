import NDK, { NDKEvent, NDKUser } from '@nostr-dev-kit/ndk';
import NDKCacheAdapterDexie from '@nostr-dev-kit/ndk-cache-dexie';
import { create } from 'zustand';

type AppState = {
  isLoginModalOpen: boolean;

  isZapModalOpen: boolean;

  zapTarget: NDKEvent | NDKUser | undefined;
};

type AppActions = {
  setIsLoginModalOpen: (isOpen: boolean) => void;

  setIsZapModalOpen: (isOpen: boolean) => void;

  setZapTarget: (target: NDKEvent | NDKUser | undefined) => void;
};

type NdkState = {
  globalNdk: NDK;
  nip29Ndk: NDK;
};

type NdkActions = {
  setGlobalNdk: (globalNdk: NDK) => void;
  setNip29Ndk: (nip29Ndk: NDK) => void;
};

type ModerationState = {
  activeGroupId: string | undefined;
};

type ModerationActions = {
  setActiveGroupId: (activeGroupId: string | undefined) => void;
};

export const useStore = create<
  AppState & AppActions & NdkState & NdkActions & ModerationState & ModerationActions
>()((set) => ({
  // App State

  isLoginModalOpen: false,

  isZapModalOpen: false,

  zapTarget: undefined,

  setIsLoginModalOpen: (isOpen) => set({ isLoginModalOpen: isOpen }),

  setIsZapModalOpen: (isOpen) => set({ isZapModalOpen: isOpen }),

  setZapTarget: (target) => set({ zapTarget: target }),

  // NDK State

  globalNdk: new NDK({
    explicitRelayUrls: ['wss://nos.lol', 'wss://relay.damus.io/'],
    autoConnectUserRelays: true,
    autoFetchUserMutelist: false,
    cacheAdapter: new NDKCacheAdapterDexie({ dbName: `db-global` }),
  }),

  setGlobalNdk: (globalNdk) => set({ globalNdk }),

  nip29Ndk: new NDK({
    explicitRelayUrls: [],
    autoConnectUserRelays: false,
    autoFetchUserMutelist: false,
    cacheAdapter: undefined,
  }),

  setNip29Ndk: (nip29Ndk) => set({ nip29Ndk }),

  // moderation State

  activeGroupId: undefined,

  setActiveGroupId: (activeGroupId) => set({ activeGroupId }),
}));
