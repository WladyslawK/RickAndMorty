import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import { appSlice } from './appSlice'
import {charactersSlice} from "../features/allCharactersPage/charactersSlice";
import {characterSlice} from "../features/characterInformation/characterSlice";

const rootReducer = combineReducers({
  app: appSlice,
  allCharacters: charactersSlice,
  characterInfo: characterSlice
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch