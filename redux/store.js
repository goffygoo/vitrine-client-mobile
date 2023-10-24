import { configureStore } from '@reduxjs/toolkit'
import testReducer from './testSlice'
import settingReducer from './settingReducer'

export default configureStore({
    reducer: {
        test: testReducer,
        setting: settingReducer,
    },
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware({
//         immutableCheck: false,
//         serializableCheck: false,
//     })
})