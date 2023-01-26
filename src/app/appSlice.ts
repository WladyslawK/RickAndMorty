import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: AppInitialState = {
  status: 'idle',
  error: ''
}


const slice =createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInitializeAC: (state, action: PayloadAction<{status: AppStatusType}>) => {
      state.status = action.payload.status
    }

  }
})


export const appSlice = slice.reducer

export const  {setInitializeAC} = slice.actions

type AppInitialState = {
  status: AppStatusType
  error: string
}

export type AppStatusType = 'idle' | 'loading' | 'failed'