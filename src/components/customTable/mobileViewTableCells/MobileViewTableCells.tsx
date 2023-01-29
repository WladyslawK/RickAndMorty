import React from 'react'
import {useAppSelector} from "hooks/reduxHooks"
import {CharacterDomainType} from "api/characters-api"
import s from 'components/customTable/mobileViewTableCells/MobileViewTableCells.module.css'
import {capitalizeFirstLetter} from "utils/capitalizeFirstLeter"
import {PATH} from "constants/routePaths.enum"
import {useNavigate} from "react-router-dom"

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