import {configureStore} from '@reduxjs/toolkit'
import appConfigReducer from './slices/appConfigSlice'
import postsReducer from './slices/postsSlice'
import feedDataReducer from './slices/feedSlice'

export default configureStore({
    reducer: {
        appConfigReducer,
        postsReducer,
        feedDataReducer
    }
})