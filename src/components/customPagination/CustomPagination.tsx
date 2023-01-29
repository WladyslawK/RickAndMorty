import { Pagination } from '@mui/material';
import React, {ChangeEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {updateQueryParams} from "../../features/allCharactersPage/charactersSlice";
import s from './CustomPagination.module.css'
import {useSearchParams} from "react-router-dom";

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