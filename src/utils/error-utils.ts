import {Dispatch} from "@reduxjs/toolkit"
import {ErrorResponse} from "../api/characters-api"
import {setAppErrorAC, setAppStatusAC} from "../app/appSlice"

export const handleServerAppError = (data: ErrorResponse, dispatch: Dispatch) => {
  if(data.response.data.error){
    dispatch(setAppErrorAC({error: data.response.data.error}))
  }else {
    dispatch(setAppErrorAC({error: 'some error'}))
  }
  dispatch(setAppStatusAC({status: 'failed'}))
}