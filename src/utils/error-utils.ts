//redux/toolkit import
import {Dispatch} from "@reduxjs/toolkit"

//type import
import {ErrorResponse} from "api/characters-api"
import {APP_STATUS} from "constants/constants"

//action creators imports
import {setAppErrorAC, setAppStatusAC} from "app/appSlice"

export const handleServerAppError = (data: ErrorResponse, dispatch: Dispatch) => {
  if(data.response.data.error){
    dispatch(setAppErrorAC({error: data.response.data.error}))
  }else {
    dispatch(setAppErrorAC({error: 'some error'}))
  }
  dispatch(setAppStatusAC({status: APP_STATUS.FAILED}))
}