import { createSlice } from "@reduxjs/toolkit";

const eventColors = ['#AF96F6', '#AFE5B1', '#788DFF', '#FFBF90', '#AAD6EE'];
const getRandomColor = () => {
    return eventColors[Math.floor(Math.random() * eventColors.length)];
}

const initialState = {
    allEvents: {},
    parsedEvents: {},
    lastRequest: null,
};

export const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        setAllEvents: (state, action) => {
            const rawEvents = action.payload;
            rawEvents.sort((x, y) => x.startTime.localeCompare(y.startTime));

            rawEvents.forEach(event => {
                const dateObject = new Date(event.startTime);
                const year = dateObject.getFullYear();
                const month = dateObject.getMonth();
                const date = dateObject.getDate();

                state.parsedEvents[year] = state.parsedEvents[year] ?? {};
                state.parsedEvents[year][month] = state.parsedEvents[year][month] ?? {};
                state.parsedEvents[year][month][date] = state.parsedEvents[year][month][date] ?? [];

                state.parsedEvents[year][month][date].push({ ...event, color: getRandomColor() });
            });

            state.lastRequest = Date.now();
        }
    },
});

export const {
    setAllEvents
} = calendarSlice.actions;

export const calendarLastRequestSelector = (state) => state.calendar.lastRequest;
export const calendarAllEventsSelector = (state) => state.calendar.allEvents;
export const calendarParsedEventsSelector = (state) => state.calendar.parsedEvents;

export default calendarSlice.reducer;

