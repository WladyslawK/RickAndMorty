import { Pagination } from '@mui/material';
import React, {ChangeEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {updateQueryParams} from "../../features/allCharactersPage/charactersSlice";
import s from './CustomPagination.module.css'

export const CustomPagination = () => {

  const totalPageCount = useAppSelector(state => state.allCharacters.pages)
  const currentPage = useAppSelector(state => state.allCharacters.queryParams.page)
  const dispatch = useAppDispatch()


  const onchangePage = (event: ChangeEvent<unknown>, page: number) => {
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