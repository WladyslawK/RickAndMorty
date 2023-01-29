//redux/toolkit import
import {createSlice, PayloadAction} from "@reduxjs/toolkit"

//constants import
import {APP_STATUS} from "constants/constants"

const initialState: AppInitialState = {
  status: APP_STATUS.LOADING,
  error: null
}


const slice =createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppStatusAC: (state, action: PayloadAction<{status: AppStatusType}>) => {
      state.status = action.payload.status
    },
    setAppErrorAC: (state, action: PayloadAction<{error: string | null}>) => {
      state.error = action.payload.error
    }

  }
})


export const appSlice = slice.reducer

export const  {setAppStatusAC, setAppErrorAC} = slice.actions

export type AppInitialState = {
  status: AppStatusType
  error: string | null
}

export type AppStatusType = 'idle' | 'loading' | 'failed'