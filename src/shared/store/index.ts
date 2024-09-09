import NDK, { NDKEvent, NDKUser } from '@nostr-dev-kit/ndk';
import NDKCacheAdapterDexie from '@nostr-dev-kit/ndk-cache-dexie';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

type RelaysState = {
  relays: string[];
};

type RelaysActions = {
  addRelay: (relay: string) => void;
  safeRemoveRelay: (relay: string) => void;
};

export const useStore = create<
  AppState &
    AppActions &
    NdkState &
    NdkActions &
    ModerationState &
    ModerationActions &
    RelaysState &
    RelaysActions
>()(
  persist(
    (set, get) => ({
      // App State

      isLoginModalOpen: false,

      isZapModalOpen: false,

      zapTarget: undefined,

      setIsLoginModalOpen: (isOpen) => set({ isLoginModalOpen: isOpen }),

      setIsZapModalOpen: (isOpen) => set({ isZapModalOpen: isOpen }),

      setZapTarget: (target) => set({ zapTarget: target }),

      // NDK State

      globalNdk: new NDK({
        explicitRelayUrls: ['wss://nos.lol'],
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

      // Relay State

      relays: ['wss://relay.groups.nip29.com', 'wss://groups.fiatjaf.com'],

      addRelay: (relay) => {
        const { relays } = get();

        if (!relays.includes(relay)) {
          set({ relays: [...relays, relay] });
        }
      },
      safeRemoveRelay: (relay) => {
        const { relays } = get();

        if (relays.length === 1) {
          return;
        }

        set({
          relays: relays.filter((r) => r !== relay),
        });
      },
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({
        relays: [
          ...new Set(['wss://relay.groups.nip29.com', 'wss://groups.fiatjaf.com', ...state.relays]),
        ],
      }),
    },
  ),
);
