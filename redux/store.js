import { configureStore } from '@reduxjs/toolkit'
import settingReducer from './settingReducer'
import spacesReducer from './spacesReducer'
import authReducer from './authReducer'
import calendarReducer from './calendarReducer'
import profileReducer from './profileReducer'

export default configureStore({
    reducer: {
        setting: settingReducer,
        spaces: spacesReducer,
        auth: authReducer,
        calendar: calendarReducer,
        profile: profileReducer,
    },
})