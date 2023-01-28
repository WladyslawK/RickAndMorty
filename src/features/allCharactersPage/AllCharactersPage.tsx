import React, {useEffect} from 'react'
import {CustomTable} from "../../components/customTable/CustomTable"
import s from './AllCharactersPage.module.css'
import {getCharacters} from "./charactersSlice"
import {useAppDispatch} from "../../hooks/reduxHooks"
import {CustomSearch} from "../../components/customSearch/CustomSearch"
import {useLocation} from "react-router-dom";
import {CustomPagination} from "../../components/customPagination/CustomPagination";

export const AllCharactersPage = () => {

  const dispatch = useAppDispatch()
  const location = useLocation()



  return (
    <main className={s.main}>
      <CustomSearch/>
      <CustomTable/>
      <CustomPagination/>
    </main>
  )
}