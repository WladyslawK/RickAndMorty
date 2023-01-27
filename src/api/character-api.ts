import axios from "axios";
import {instance} from "./instance";
import {CharacterDomainType} from "./characters-api";


export const characterApi = {
  getCharacter: (id: string) => {
    return instance.get<CharacterDomainType>(`${id}`)
  }
}