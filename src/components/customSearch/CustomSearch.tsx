import React, {ChangeEvent, createRef, useRef, useState} from 'react';
import {
  FormControl,
  IconButton,
  InputAdornment, InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField
} from "@mui/material";
import s from './CustomSerch.module.css'
import {FilterAltOff, Search} from "@mui/icons-material";
import {speciesFilter, status} from "../../constants/constants";
import {useAppDispatch} from "../../hooks/reduxHooks";
import {initialCharactersState, updateQueryParams} from "../../features/allCharactersPage/charactersSlice";

export const CustomSearch = () => {

  const dispatch = useAppDispatch()
  const [queryName, setQueryName] = useState('')
  const [queryStatus, setQueryStatus] = useState('')
  const [querySpecies, setQuerySpecies] = useState('')

  const changeStatusHandler = (event: SelectChangeEvent<string>) => {
    const status = event.target.value
    setQueryStatus(status)
    dispatch(updateQueryParams({page: '1', status}))
  }

  const changeSpeciesHandler = (event: SelectChangeEvent<string>) => {
    const species = event.target.value
    setQuerySpecies(species)
    dispatch(updateQueryParams({page: '1', species}))
  }


  const inputRef: any = useRef(null)
  const onChangeNameHandler = (name: string) => {

    console.log('hello from debounce1: ', name[0])
    //setQueryName(name)
    dispatch(updateQueryParams({page: '1', name}))
  }

  function debounce(callback: (e: any) => void, delay: number = 1000) {
    let timeout: any

    return (...args: any) => {
      clearTimeout(timeout)

      timeout = setTimeout(() => {
        callback(args)
      }, delay)
    }
  }

  console.log("STATUS: ", queryStatus)

  const resetAllFiltersHandler = () => {
    dispatch(updateQueryParams({...initialCharactersState.queryParams}))
    inputRef.current = ''
    setQueryStatus('')
    setQuerySpecies('')
  }

  const debouncedChange = debounce(onChangeNameHandler, 1000)

  return (
    <div className={s.mainContainer}>
      <div className={s.searchContainer}>
        {/*<TextField className={s.input} id="outlined-basic" variant="outlined" size='small' />*/}
        <FormControl sx={{width: '25ch'}} className={s.nameInput} variant="outlined" size='small'>
          <OutlinedInput
            id="outlined-adornment-password"
            type='text'
            startAdornment={
              <InputAdornment position="start">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                >
                  <Search/>
                </IconButton>
              </InputAdornment>
            }
            onChange={(e) => debouncedChange(e.currentTarget.value)}
            ref={inputRef}
          />
        </FormControl>

        <FormControl>
          <InputLabel id="demo-simple-select-label" >Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name={'status'}
            label="status"
            className={s.statusInput}
            onChange={changeStatusHandler}
            value={queryStatus}
            size='small'
          >
            {status.map((option, i) => (
              <MenuItem key={i} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id="demo-simple-select-label" >Species</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name={'species'}
            label="species"
            className={s.speciesInput}
            onChange={changeSpeciesHandler}
            value={querySpecies}
            size='small'
          >
            {speciesFilter.map((option, i) => (
              <MenuItem key={i} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>


        <div className={s.resetAllFilters} onClick={resetAllFiltersHandler}>
          <FilterAltOff/>
        </div>
      </div>
    </div>

  )
}