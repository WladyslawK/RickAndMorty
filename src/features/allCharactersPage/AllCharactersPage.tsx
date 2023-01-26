import React, {useEffect, useState} from 'react'
import {CustomTable} from "../../components/customTable/CustomTable"
import s from './AllCharactersPage.module.css'
import {charactersTableHead} from "../../constants/constants"
import {useSelector} from "react-redux"
import {CharactersType, getCharacters} from "./charactersSlice"
import {useAppDispatch} from "../../hooks/reduxHooks"
import {RootStateType} from "../../app/store"
import {CustomSearch} from "../../components/customSearch/CustomSearch"
import {useLocation} from "react-router-dom";
import {CustomPagination} from "../../components/customPagination/CustomPagination";

export const AllCharactersPage = () => {

  const dispatch = useAppDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch(getCharacters())
  }, [])

  return (
    <main className={s.main}>
      <CustomSearch/>
      <CustomTable/>
      <CustomPagination/>
    </main>
  )
}