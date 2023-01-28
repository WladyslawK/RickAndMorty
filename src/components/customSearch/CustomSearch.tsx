import React, {useEffect, useRef, useState} from 'react';
import {
  FormControl,
  IconButton,
  InputAdornment, InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent
} from "@mui/material";
import s from './CustomSerch.module.css'
import {FilterAltOff, Search} from "@mui/icons-material";
import {speciesFilter, statusFilter} from "../../constants/constants";
import {useAppDispatch} from "../../hooks/reduxHooks";
import {
  getCharacters,
  initialCharactersState,
  updateQueryParams
} from "../../features/allCharactersPage/charactersSlice";
import {useSearchParams} from "react-router-dom";

export const CustomSearch = () => {

  let [searchParams, setSearchParams] = useSearchParams();
  const queryStatus = searchParams.get('status')
  const querySpecies = searchParams.get('species')
  const queryName = searchParams.get('name')

  const dispatch = useAppDispatch()
  const inputRef: any = useRef(queryName ? queryName : '')
  const [name, setName] = useState(queryName ? queryName : '')
  const [status, setStatus] = useState(queryStatus ? queryStatus : '')
  const [species, setSpecies] = useState(querySpecies ? querySpecies : '')



  useEffect(() => {

    if(name || status || species){
      const queryUpdate = {
        name: name ? name : '',
        status: status ? status : '',
        species: species ? species : ''
      }
      //dispatch(updateQueryParams(queryParams))
      dispatch(updateQueryParams(queryUpdate))
    }else{
      dispatch(getCharacters())
    }

  }, [])


  useEffect(() => {

    if (status) {
      searchParams.set('status', status)
      setSearchParams(searchParams)
    } else {
      searchParams.delete('status')
      setSearchParams(searchParams)
    }


  }, [status])

  useEffect(() => {

    if (species) {
      searchParams.set('species', species)
      setSearchParams(searchParams)
    } else {
      searchParams.delete('species')
      setSearchParams(searchParams)
    }
  }, [species])


  useEffect(() => {

    if (name) {
      searchParams.set('name', name)
      setSearchParams(searchParams)
    } else {
      searchParams.delete('name')
      setSearchParams(searchParams)
    }

    //try



  }, [name])


  console.log('SEARCHPARAMS: ', searchParams)


  const changeStatusHandler = (event: SelectChangeEvent<string>) => {
    const status = event.target.value
    setStatus(status)
    dispatch(updateQueryParams({page: '1', status}))
  }

  const changeSpeciesHandler = (event: SelectChangeEvent<string>) => {
    const species = event.target.value
    setSpecies(species)
    dispatch(updateQueryParams({page: '1', species}))
  }

  const onChangeNameHandler = (name: string) => {

    setName(name)
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

  const debouncedChange = debounce(onChangeNameHandler, 600)

  console.log("STATUS: ", status)

  const resetAllFiltersHandler = () => {
    dispatch(updateQueryParams({...initialCharactersState.queryParams}))
    console.log('REF value before: ', inputRef)
    inputRef.current.value = ''
    console.log('REF value after: ', inputRef.current.value)
    setName('')
    setStatus('')
    setSpecies('')
  }



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
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name={'status'}
            label="status"
            className={s.statusInput}
            onChange={changeStatusHandler}
            value={status}
            size='small'
          >
            {statusFilter.map((option, i) => (
              <MenuItem key={i} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id="demo-simple-select-label">Species</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name={'species'}
            label="species"
            className={s.speciesInput}
            onChange={changeSpeciesHandler}
            value={species}
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