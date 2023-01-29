import React from 'react'
import './App.css'
import {Navbar} from "../components/navbar/Navbar"
import {Navigate, Route, Routes} from "react-router-dom"
import {PATH} from "../constants/routePaths.enum"
import {AllCharactersPage} from "../features/allCharactersPage/AllCharactersPage"
import {CharacterInformation} from "../features/characterInformation/CharacterInformation"
import {ErrorSnackBar} from "../components/errorSnackBar/ErrorSnackBar"

export const App = () => {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Navigate to={PATH.ALL_CHARACTERS} />} />
        <Route path={PATH.ALL_CHARACTERS} element={<AllCharactersPage/>} />
        <Route path={PATH.CHARACTER_INFO} element={<CharacterInformation/>}>
          <Route path={PATH.CHARACTER_INFO_CHARACTER_ID} element={<CharacterInformation/>}/>
        </Route>
      </Routes>
      <ErrorSnackBar />
    </>
  )
}