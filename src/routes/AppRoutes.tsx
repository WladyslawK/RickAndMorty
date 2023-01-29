import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {PATH} from "../constants/routePaths.enum";
import {AllCharactersPage} from "../features/allCharactersPage/AllCharactersPage";
import {CharacterInformation} from "../features/characterInformation/CharacterInformation";

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