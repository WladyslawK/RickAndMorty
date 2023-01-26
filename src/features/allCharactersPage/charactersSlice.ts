import {AnyAction, createSlice, Dispatch, PayloadAction, ThunkDispatch} from "@reduxjs/toolkit";
import {CharacterDomainType, charactersApi, updateQueryType} from "../../api/characters-api";
import {AppDispatchType, RootStateType} from "../../app/store";
import {setInitializeAC} from "../../app/appSlice";

export const initialCharactersState: CharactersInitialState = {
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
    setCharactersAC: (state, action: PayloadAction<{ characters: CharactersType[], pages: string }>) => {
      state.characters = action.payload.characters
      state.pages = action.payload.pages
    },
    setCurrentPageAC: (state, action: PayloadAction<{queryParams: queryParamsType}>) => {
      state.queryParams = action.payload.queryParams
    }
  }

})

export const charactersSlice = slice.reducer

export const {setCharactersAC, setCurrentPageAC} = slice.actions


//characters thunks

export const getCharacters = () => async (dispatch: Dispatch, getState:() => RootStateType ) => {
  dispatch(setInitializeAC({status: 'loading'}))
  try {
    const data = getState().allCharacters.queryParams;
    const response = await charactersApi.getCharacters(data)
    if (response.data.results.length) {
      const characters = response.data.results
      const pages = response.data.info.pages
      dispatch(setCharactersAC({characters, pages}))
      dispatch(setInitializeAC({status: 'idle'}))
    }
  } catch (error) {
  }
}

export const updateQueryParams = (data: updateQueryType) => async (dispatch: ThunkDispatch<RootStateType, any, AnyAction>, getState:() => RootStateType) => {

  dispatch(setInitializeAC({status: 'loading'}))
  const queryParams = getState().allCharacters.queryParams
  const updateParams = {...queryParams, ...data}

  dispatch(setCurrentPageAC({queryParams: updateParams}))
  try {
    const response = await dispatch(getCharacters())
    dispatch(setInitializeAC({status: 'idle'}))
  }catch (e){
    console.log(e)
  }

}


type CharactersInitialState = {
  characters: CharactersType[]
  queryParams: queryParamsType
  pages: string
}

export type queryParamsType = {
  page: string
  name: string
  status: string
  species: string
}

export type CharactersType = Omit<CharacterDomainType, 'location' | 'episode'>

