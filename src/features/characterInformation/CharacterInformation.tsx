import React, {useEffect, useState} from 'react'

//react-router-dom imports
import {useParams} from "react-router-dom"

//mui imports
import {Button} from "@mui/material"

//types & constants imports
import {CharacterDomainType} from "api/characters-api"
import {AppStatusType} from "app/appSlice"
import {APP_STATUS} from "constants/constants"

//hooks imports
import {useAppDispatch, useAppSelector} from "hooks/reduxHooks"

//thunk import
import {getCharacter} from "features/characterInformation/characterSlice"

//components import
import {CharacterInfoSkeleton} from "components/characterInfoSkeleton/CharacterInfoSkeleton"

//style import
import s from 'features/characterInformation/Charactersinformation.module.css'



export const CharacterInformation = () => {

  const {characterId} = useParams()
  const dispatch = useAppDispatch()
  const [showDetails, setShowDetails] = useState(false)
  const character = useAppSelector<CharacterDomainType>(state => state.characterInfo.character)
  const appStatus = useAppSelector<AppStatusType>(state => state.app.status)

  const showDetailsHandler = () => setShowDetails(prevState => !prevState)

  useEffect(() => {
    if (characterId) {
      dispatch(getCharacter(characterId))
    }
  }, [])

  return (
    <>
      {
        appStatus === APP_STATUS.LOADING ?
          <CharacterInfoSkeleton /> :
          <section className={s.mainContainer}>
            <div className={s.characterMainBlock}>
              <h1>Character Details</h1>
              <div className={s.imgBlock}>
                <img className={s.characterImage} src={character && character.image} alt="character image"/>
              </div>
              <p><b>{character && character.name}</b></p>

              <Button onClick={showDetailsHandler} variant='contained'>More information</Button>
            </div>

            {showDetails ?
              <div className={s.detailsContainer}>
                <div className={s.leftDetails}>
                  <p><b>Gender:</b> {character && character.gender}</p>
                  <p><b>Species:</b> {character && character.species}</p>
                  <p><b>Status:</b> {character && character.status}</p>
                </div>
                <div className={s.rightDetails}>
                  <p><b>Type:</b> {character && character.type ? character.type : 'no type'}</p>
                  <p><b>Origin:</b> {character && character.origin.name}</p>
                  <p><b>Location:</b> {character && character.location.name}</p>
                </div>
              </div> : ''
            }
          </section>
      }
    </>
  )
}