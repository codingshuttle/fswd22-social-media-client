import {configureStore} from '@reduxjs/toolkit'
import appConfigReducer from './slices/appConfigSlice'
import postsReducer from './slices/postsSlice'

export default configureStore({
    reducer: {
        appConfigReducer,
        postsReducer
    }
})