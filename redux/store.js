import { configureStore } from '@reduxjs/toolkit'
import settingReducer from './settingReducer'
import spacesReducer from './spacesReducer'

export default configureStore({
    reducer: {
        setting: settingReducer,
        spaces: spacesReducer,
    },
})