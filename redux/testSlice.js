import { createSlice } from "@reduxjs/toolkit"

export const testSlice = createSlice({
    name: 'test',
    initialState: {
        health: "ok",
    },
    reducers: {
        setHealth: (state, action) => {
            state.health = action.payload
        },
    }
})

export const { setHealth } = testSlice.actions
export const healthSelector = state => state.test.health

export default testSlice.reducer