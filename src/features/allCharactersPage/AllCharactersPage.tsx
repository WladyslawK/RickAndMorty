import React from 'react'

//components imports
import {CustomTable} from "components/customTable/CustomTable"
import {CustomSearch} from "components/customSearch/CustomSearch"
import {CustomPagination} from "components/customPagination/CustomPagination"

//style import
import s from 'features/allCharactersPage/AllCharactersPage.module.css'
import {useAppSelector} from "../../hooks/reduxHooks";
import {APP_STATUS} from "../../constants/constants";

export const AllCharactersPage = () => {

  const appStatus = useAppSelector(state => state.app.status)

  return (
    <main className={s.main}>
      <CustomSearch/>
      {
        appStatus === APP_STATUS.FAILED ?
          <div className={s.noData}><b>No data found</b></div> :
          <>
            <CustomTable/>
            <CustomPagination/>
          </>
      }
    </main>
  )
}