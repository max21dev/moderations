import { NDKEvent, NDKUser } from '@nostr-dev-kit/ndk';
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

type ModerationState = {
  activeGroupId: string | undefined;
};

type ModerationActions = {
  setActiveGroupId: (activeGroupId: string | undefined) => void;
};

export const useStore = create<AppState & AppActions & ModerationState & ModerationActions>()(
  (set) => ({
    // App State

    isLoginModalOpen: false,

    isZapModalOpen: false,

    zapTarget: undefined,

    setIsLoginModalOpen: (isOpen) => set({ isLoginModalOpen: isOpen }),

    setIsZapModalOpen: (isOpen) => set({ isZapModalOpen: isOpen }),

    setZapTarget: (target) => set({ zapTarget: target }),

    // moderation State

    activeGroupId: undefined,

    setActiveGroupId: (activeGroupId) => set({ activeGroupId }),
  }),
);
