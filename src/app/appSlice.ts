import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: AppInitialState = {
  status: 'loading',
  error: ''
}


const slice =createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppStatusAC: (state, action: PayloadAction<{status: AppStatusType}>) => {
      state.status = action.payload.status
    }

  }
})


export const appSlice = slice.reducer

export const  {setAppStatusAC} = slice.actions

type AppInitialState = {
  status: AppStatusType
  error: string
}

export type AppStatusType = 'idle' | 'loading' | 'failed'