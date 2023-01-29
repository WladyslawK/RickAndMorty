//redux/toolkit import
import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit"

//api & type import
import {characterApi} from "api/character-api"
import {CharacterDomainType} from "api/characters-api"

//action creator import
import {setAppStatusAC} from "app/appSlice"

//utils function import
import {handleServerAppError} from "utils/error-utils"


const characterInitialState: CharacterInitialStateType = {
  character: {
    id: 0,
    name: '',
    status: '',
    species: '',
    type: '',
    gender: '',
    origin: {
      "name": '',
      "url": '',
    },
    location: {
      "name": '',
      "url": '',
    },
    image: '',
    episode: [],
    url: '',
    created: ''
  }
}

export type CharacterInitialStateType = {
  character: CharacterDomainType,
}

const slice = createSlice({
  name: 'character',
  initialState: characterInitialState,
  reducers: {
    setCharacterAC: (state, action: PayloadAction<{character: CharacterDomainType}>) => {
      state.character = action.payload.character
    }
  }
})

export const  characterSlice = slice.reducer
export const {setCharacterAC} = slice.actions


// characterSlice thunks

export const getCharacter = (id: string) => async (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  try {
    const response = await characterApi.getCharacter(id)
    dispatch(setCharacterAC({character: {...response.data}}))
    dispatch(setAppStatusAC({status: 'idle'}))
  }catch (error: any) {
    handleServerAppError(error, dispatch)
  }
}