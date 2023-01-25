import React, {ChangeEvent, useState} from 'react';
import {FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, TextField} from "@mui/material";
import s from './CustomSerch.module.css'
import {FilterAltOff, Search, Visibility, VisibilityOff} from "@mui/icons-material";
import {speciesFilter, status} from "../../constants/constants";

export const CustomSearch = () => {

  const [inputValue, setInputValue] = useState('')

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className={s.searchContainer}>
      {/*<TextField className={s.input} id="outlined-basic" variant="outlined" size='small' />*/}
      <FormControl sx={{ width: '25ch' }} className={s.nameInput} variant="outlined" size='small'>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          startAdornment={
            <InputAdornment position="start">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                <Search/>
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <TextField
        id="outlined-select-currency"
        select
        label="status"
        defaultValue=""
        className={s.statusInput}
        size='small'
      >
        {status.map((option, i) => (
          <MenuItem key={i} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        id="outlined-select-currency"
        select
        label="species"
        defaultValue=""
        className={s.speciesInput}
        size='small'
      >
        {speciesFilter.map((option, i) => (
          <MenuItem key={i} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <div className={s.resetAllFilters}>
        <FilterAltOff/>
      </div>
    </div>
  )
}