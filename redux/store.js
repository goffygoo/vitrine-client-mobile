import { configureStore } from '@reduxjs/toolkit'
import testReducer from './testSlice'

export default configureStore({
    reducer: {
        test: testReducer
    },
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware({
//         immutableCheck: false,
//         serializableCheck: false,
//     })
})