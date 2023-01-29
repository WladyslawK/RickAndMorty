import React from 'react'

//hooks imports
import {useAppSelector} from "hooks/reduxHooks"

//type imports
import {CharacterDomainType} from "api/characters-api"

//constants & util function import
import {capitalizeFirstLetter} from "utils/capitalizeFirstLeter"
import {PATH} from "constants/routePaths.enum"

//react-router-dom import
import {useNavigate} from "react-router-dom"

//style import
import s from 'components/customTable/mobileViewTableCells/MobileViewTableCells.module.css'

export const MobileViewTableCells = () => {

  const navigate = useNavigate()
  const rows = useAppSelector<CharacterDomainType[]>(state => state.allCharacters.characters)

  const openCharacterInfoHandler = (id: number) => {
    navigate(`${PATH.CHARACTER_INFO}/${id}`)
  }

  const body = rows.map(({id, name, species, status, url}) => (
    <div key={id} className={s.cellContainer}>
      <p><b>Name:</b> {name}</p>
      <p><b>Status:</b> {capitalizeFirstLetter(status)}</p>
      <p><b>Species:</b> {capitalizeFirstLetter(species)}</p>
      <p><span onClick={() => openCharacterInfoHandler(id)} className={s.linkItem}>{url}</span></p>
    </div>
  ))

  return (
    <div className={s.mainContainer}>
      {body}
    </div>
  )
}