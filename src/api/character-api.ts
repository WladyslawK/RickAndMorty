//instance import
import {instance} from "api/instance"

//type import
import {CharacterDomainType} from "api/characters-api"


export const characterApi = {
  getCharacter: (id: string) => {
    return instance.get<CharacterDomainType>(`${id}`)
  }
}