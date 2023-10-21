import { configureStore } from '@reduxjs/toolkit'
import listReducer from './components/list.reducer'

export const store = configureStore({
  reducer: { list: listReducer }
})

// Lấy RootState và AppDispatch từ store của chúng ta
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
