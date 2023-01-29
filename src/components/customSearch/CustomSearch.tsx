import React, {useEffect, useState} from 'react'

//mui imports
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent
} from "@mui/material"
import {FilterAltOff, Search} from "@mui/icons-material"

//constants import
import {speciesFilter, statusFilter} from "constants/constants"

//hooks import
import {useAppDispatch} from "hooks/reduxHooks"

//thunk & initialState import
import {initialCharactersState, updateQueryParams} from "features/allCharactersPage/charactersSlice"

//react-router-dom import
import {useSearchParams} from "react-router-dom"

//styles import
import s from 'components/customSearch/CustomSerch.module.css'

export const CustomSearch = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const queryStatus = searchParams.get('status')
  const querySpecies = searchParams.get('species')
  const queryName = searchParams.get('name')
  let timer: number
  const dispatch = useAppDispatch()
  const [name, setName] = useState(queryName ? queryName : '')
  const [status, setStatus] = useState(queryStatus ? queryStatus : '')
  const [species, setSpecies] = useState(querySpecies ? querySpecies : '')

  const changeSearchInputHandler = (newName: string) => setName(newName)

  useEffect(() => {

    //set data into url (status params)
    if (status) {
      searchParams.set('status', status)
      setSearchParams(searchParams)
    } else {
      searchParams.delete('status')
      setSearchParams(searchParams)
    }

    //set data into url (species params)
    if (species) {
      searchParams.set('species', species)
      setSearchParams(searchParams)
    } else {
      searchParams.delete('species')
      setSearchParams(searchParams)
    }

    //set data into url (name params)
    if (name) {
      searchParams.set('name', name)
      setSearchParams(searchParams)
    } else {
      searchParams.delete('name')
      setSearchParams(searchParams)
    }

    //debounce delay to change the query params
    timer = window.setTimeout(() => {
      dispatch(updateQueryParams({page: '1', name, status, species}))
    }, 400)

    return () => clearTimeout(timer)

  }, [status, species, name])

  const changeStatusHandler = (event: SelectChangeEvent<string>) => {
    const status = event.target.value
    setStatus(status)
  }

  const changeSpeciesHandler = (event: SelectChangeEvent<string>) => {
    const species = event.target.value
    setSpecies(species)
  }

  const resetAllFiltersHandler = () => {
    dispatch(updateQueryParams({...initialCharactersState.queryParams}))
    setName('')
    setStatus('')
    setSpecies('')

    searchParams.delete('page')
    setSearchParams(searchParams)
  }

  return (
    <div className={s.mainContainer}>
      <div className={s.searchContainer}>
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
            onChange={(e) => changeSearchInputHandler(e.currentTarget.value)}
            value={name}
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