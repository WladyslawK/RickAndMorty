//@redux/toolkit imports
import {AnyAction, createSlice, Dispatch, PayloadAction, ThunkDispatch} from "@reduxjs/toolkit"

//types imports
import {CharacterDomainType, charactersApi, updateQueryType} from "api/characters-api"
import {RootStateType} from "app/store"

//action creator import
import {setAppStatusAC} from "app/appSlice"

//utils imports
import {handleServerAppError} from "utils/error-utils"

export const initialCharactersState: CharactersInitialStateType = {
  characters: [],
  queryParams: {
    page: '1',
    name: '',
    status: '',
    species: ''
  },
  pages: '',
}

const slice = createSlice({
  name: 'characters',
  initialState: initialCharactersState,
  reducers: {
    setCharactersAC: (state, action: PayloadAction<{ characters: CharacterDomainType[], pages: string }>) => {
      state.characters = action.payload.characters
      state.pages = action.payload.pages
    },
    setQueryParamsAC: (state, action: PayloadAction<{ queryParams: queryParamsType }>) => {
      state.queryParams = action.payload.queryParams
    }
  }

})

export const charactersSlice = slice.reducer

export const {setCharactersAC, setQueryParamsAC} = slice.actions


//characters thunks

export const getCharacters = () => async (dispatch: Dispatch, getState: () => RootStateType) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  const data = getState().allCharacters.queryParams
  try {

    const response = await charactersApi.getCharacters(data)

    const characters = response.data.results
    const pages = response.data.info.pages
    dispatch(setCharactersAC({characters, pages}))
    dispatch(setAppStatusAC({status: 'idle'}))
  } catch (error: any) {
    handleServerAppError(error, dispatch)
  }
}

export const updateQueryParams = (data: updateQueryType) => async (dispatch: ThunkDispatch<RootStateType, any, AnyAction>, getState: () => RootStateType) => {

  dispatch(setAppStatusAC({status: 'loading'}))
  const queryParams = getState().allCharacters.queryParams
  const updateParams = {...queryParams, ...data}

  dispatch(setQueryParamsAC({queryParams: updateParams}))
  dispatch(setAppStatusAC({status: 'idle'}))
  await dispatch(getCharacters())
}


export type CharactersInitialStateType = {
  characters: CharacterDomainType[]
  queryParams: queryParamsType
  pages: string
}

export type queryParamsType = {
  page: string
  name: string
  status: string
  species: string
}

