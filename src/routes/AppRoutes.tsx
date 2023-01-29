import React from 'react'

//react-router-dom imports
import {Navigate, Route, Routes} from "react-router-dom"

//constants import
import {PATH} from "constants/routePaths.enum"

//components imports
import {AllCharactersPage} from "features/allCharactersPage/AllCharactersPage"
import {CharacterInformation} from "features/characterInformation/CharacterInformation"


export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={PATH.ALL_CHARACTERS} />} />
      <Route path={PATH.ALL_CHARACTERS} element={<AllCharactersPage/>} />
      <Route path={PATH.CHARACTER_INFO} element={<CharacterInformation/>}>
        <Route path={PATH.CHARACTER_INFO_CHARACTER_ID} element={<CharacterInformation/>}/>
      </Route>
    </Routes>
  )
}