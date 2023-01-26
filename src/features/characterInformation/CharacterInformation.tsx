import React, {useState} from 'react'
import s from './Charactersinformation.module.css'
import {useLocation, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootStateType} from "../../app/store";
import {CharactersType} from "../allCharactersPage/charactersSlice";
import {Button} from "@mui/material";

export const CharacterInformation = () => {

  let { characterId } = useParams()
  const characters = useSelector<RootStateType, CharactersType[]>(state => state.allCharacters.characters)
  const [showDetails, setShowDetails] = useState(false)

  const showDetailsHandler = () => setShowDetails(prevState => !prevState )

  let character
  if(characterId){
    character = characters.find(char => char.id.toString() === characterId)
  }


  return (
    <section className={s.mainContainer}>

      <div className={s.characterMainBlock}>
        <h1>Character Details</h1>
        <div className={s.imgBlock}>
          <img className={s.characterImage} src={character && character.image} alt="character image"/>
        </div>
        <p><b>{character && character.name}</b></p>

        <Button className={s.showDetailsBtn} onClick={showDetailsHandler} variant='contained'>More information</Button>
      </div>

     {showDetails ?
       <div className={s.detailsContainer}>
         <div className={s.leftDetails}>
           <p><b>Name:</b> {character && character.name}</p>
           <p><b>Species:</b> {character && character.species}</p>
           <p><b>Status:</b> {character && character.status}</p>
         </div>
         <div className={s.rightDetails}>
           <p><b>Type:</b> {character && character.type ? character.type : 'no type'}</p>
           <p><b>Gender:</b> {character && character.gender}</p>
           <p><b>Origin:</b> {character && character.origin.name}</p>
         </div>
      </div> : ''
     }
    </section>
  )
}