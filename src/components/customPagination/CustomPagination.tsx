import React, {ChangeEvent} from 'react'

//mui import
import { Pagination } from '@mui/material'

//hooks import
import {useAppDispatch, useAppSelector} from "hooks/reduxHooks"

//thunk import
import {updateQueryParams} from "features/allCharactersPage/charactersSlice"

//react-router-dom import
import {useSearchParams} from "react-router-dom"

//style import
import s from 'components/customPagination/CustomPagination.module.css'

export const CustomPagination = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const totalPageCount = useAppSelector(state => state.allCharacters.pages)
  const queryPage = searchParams.get('page')
  const currentPage = queryPage ? queryPage : '1'

  const dispatch = useAppDispatch()


  const onchangePage = (event: ChangeEvent<unknown>, page: number) => {
    searchParams.set('page', page.toString())
    setSearchParams(searchParams)
    dispatch(updateQueryParams({page: page.toString()}))
  }

  return (
    <div className={s.mainContainer}>
      <Pagination
        count={+totalPageCount}
        shape="rounded"
        color="primary"
        page={+currentPage}
        onChange={onchangePage}
      />
    </div>
  )
}