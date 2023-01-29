import React from 'react'

//components imports
import {CustomTable} from "components/customTable/CustomTable"
import {CustomSearch} from "components/customSearch/CustomSearch"
import {CustomPagination} from "components/customPagination/CustomPagination"

//style import
import s from 'features/allCharactersPage/AllCharactersPage.module.css'

export const AllCharactersPage = () => {

  return (
    <main className={s.main}>
      <CustomSearch/>
      <CustomTable/>
      <CustomPagination/>
    </main>
  )
}