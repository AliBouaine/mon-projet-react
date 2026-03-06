import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getallEvents, addEvent as addEventApi, editEvent as editEventApi } from "../service/api";

const useEventStore = create(
	persist(
		(set) => ({
			events: [],
			selectedEvent: null,
			errors: null,

			populateEvents: (events) => set({ events }),

			deleteEventObject: (id) =>
				set((state) => ({
					events: state.events.filter((item) => item.id !== id),
				})),

			updateEventObject: (updatedEvent) =>
				set((state) => ({
					events: state.events.map((item) =>
						item.id === updatedEvent.id ? updatedEvent : item
					),
				})),

			addEventObject: (event) =>
				set((state) => ({
					events: [...state.events, event],
				})),

			// Fetch all events from API and populate store
			fetchEvents: async () => {
				try {
					const response = await getallEvents();
					const returned = response.data.events || response.data;
					set({ events: returned, errors: null });
					return returned;
				} catch (error) {
					set({ errors: error });
					throw error;
				}
			},

			// Fetch a single event by id and store it in `selectedEvent`
			fetchEvent: async (id) => {
				try {
					const response = await getallEvents(id);
					const ev = response.data;
					set({ selectedEvent: ev, errors: null });
					return ev;
				} catch (error) {
					set({ errors: error });
					throw error;
				}
			},

			// Add event through API and update store
			addEvent: async (event) => {
				try {
					const response = await addEventApi(event);
					const newEvent = response.data;
					set((state) => ({ events: [...state.events, newEvent], errors: null }));
					return newEvent;
				} catch (error) {
					set({ errors: error });
					throw error;
				}
			},

			// Edit event through API and update store
			editEvent: async (id, event) => {
				try {
					const response = await editEventApi(id, event);
					const updated = response.data;
					set((state) => ({
						events: state.events.map((e) => (e.id === id ? updated : e)),
						errors: null,
					}));
					return updated;
				} catch (error) {
					set({ errors: error });
					throw error;
				}
			},
		}),
		{
			name: "event-storage",
			getStorage: () => localStorage,
		}
	)
);

export default useEventStore;
