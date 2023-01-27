import axios from "axios";
import {queryParamsType} from "../features/allCharactersPage/charactersSlice";
import {instance} from "./instance";

export const charactersApi = {
  getCharacters: (data: updateQueryType) => {
    return instance.get<CharactersResponseType>('', {params: data})
  }
}

export type CharactersResponseType = {
  info: {
    count: string,
    pages: string,
    next: string
    prev: null
  }
  results: CharacterDomainType[]
}

export type updateQueryType = Partial<queryParamsType>

export type CharacterDomainType = {
  id: number,
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: {
    "name": string
    "url": string
  },
  location: {
    "name": string,
    "url": string
  },
  image: string,
  episode: string[],
  url: string,
  created: string
}