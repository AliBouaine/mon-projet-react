import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFavouriteStore = create(
	persist(
		(set, get) => ({
			favourites: [],

			// check if an item is already favourited
			isFavourited: (id) => get().favourites.some((f) => f.id === id),

			// add event to favourites (no duplicates)
			addFavourite: (event) =>
				set((state) => {
					if (state.favourites.some((f) => f.id === event.id)) return state;
					return { favourites: [...state.favourites, event] };
				}),

			// remove event from favourites
			removeFavourite: (id) =>
				set((state) => ({
					favourites: state.favourites.filter((f) => f.id !== id),
				})),

			// toggle favourite
			toggleFavourite: (event) => {
				const exists = get().favourites.some((f) => f.id === event.id);
				if (exists) get().removeFavourite(event.id);
				else get().addFavourite(event);
			},

			// clear all favourites
			clearFavourites: () => set({ favourites: [] }),
		}),
		{
			name: "favourite-storage",
			getStorage: () => localStorage,
		}
	)
);

export default useFavouriteStore;
