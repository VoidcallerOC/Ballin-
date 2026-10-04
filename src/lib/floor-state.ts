import { create } from "zustand";
import { persist } from "zustand/middleware";

type LockerState = {
  ids: string[];
  toggle: (id: string) => void;
};

export const useLocker = create<LockerState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => {
        const ids = get().ids.includes(id)
          ? get().ids.filter((item) => item !== id)
          : [...get().ids, id];
        set({ ids });
      },
    }),
    { name: "balln-locker" },
  ),
);

type WalletState = {
  via: string | null;
  connect: (via: string) => void;
  disconnect: () => void;
};

export const useWallet = create<WalletState>()(
  persist(
    (set) => ({
      via: null,
      connect: (via) => set({ via }),
      disconnect: () => set({ via: null }),
    }),
    { name: "balln-demo-wallet" },
  ),
);

export type ParkedOffer = {
  cardId: string;
  price: number;
  days: number;
  message: string;
};

type OfferState = {
  offers: ParkedOffer[];
  park: (offer: ParkedOffer) => void;
};

export const useOffers = create<OfferState>()(
  persist(
    (set, get) => ({
      offers: [],
      park: (offer) => set({ offers: [offer, ...get().offers.filter((item) => item.cardId !== offer.cardId)] }),
    }),
    { name: "balln-demo-offers" },
  ),
);
