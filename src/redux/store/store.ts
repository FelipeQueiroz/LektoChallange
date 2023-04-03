import { configureStore, createSlice } from '@reduxjs/toolkit'
import { api } from '../api/api'

const reducerSlice = createSlice({
  name: 'store',
  initialState: {},
  reducers: {
    someAction: function () {},
  },
})
export const store = configureStore({
  reducer: reducerSlice.reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
