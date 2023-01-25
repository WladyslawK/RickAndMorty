import {AppDispatchType, RootStateType} from "../app/store"
import type {TypedUseSelectorHook} from "react-redux"
import {useDispatch, useSelector} from "react-redux"


export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
