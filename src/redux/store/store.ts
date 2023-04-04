import { configureStore } from '@reduxjs/toolkit'
import { api } from '../api/api'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  }, // pass reducerSlice.reducer directly
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
