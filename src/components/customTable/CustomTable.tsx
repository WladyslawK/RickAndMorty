import React from 'react'

//mui imports
import {Table, TableBody, TableCell, TableContainer, TableHead, Paper, TableRow} from '@mui/material'

//hooks import
import {useAppSelector} from "hooks/reduxHooks"

//skeleton import
import {TableBodySkeleton} from "components/tableBodySkeleton/TableBodySkeleton"

//react-router-dom imports
import {useNavigate} from "react-router-dom"

//constants imports
import {PATH} from "constants/routePaths.enum"
import {charactersTableHead} from "constants/constants"

// types imports
import {CharacterDomainType} from "api/characters-api"
import {AppStatusType} from "app/appSlice"

//styles import
import s from 'components/customTable/CustomTable.module.css'



export const CustomTable = () => {

  const rows = useAppSelector<CharacterDomainType[]>(state => state.allCharacters.characters)
  const appStatus = useAppSelector<AppStatusType>(state => state.app.status)
  const navigate = useNavigate()

  const openCharacterInfoHandler = (id: number) => {
    navigate(`${PATH.CHARACTER_INFO}/${id}`)
  }

  const head = charactersTableHead.map((item, i) => <TableCell key={i} align={i === 0 ? "left" : 'right'}><span
    className={s.table_head_item}>{item}</span></TableCell>)

  const body = rows.map((row) => (
    <TableRow
      key={row.id}
      sx={{'&:last-child td, &:last-child th': {border: 0}}}
    >
      <TableCell component="th" scope="row">{row.name}</TableCell>
      <TableCell align="right">{row.status}</TableCell>
      <TableCell align="right">{row.species}</TableCell>
      <TableCell style={{cursor: 'pointer'}} align="right" onClick={() => openCharacterInfoHandler(row.id)}>{row.url}</TableCell>
    </TableRow>
  ))


  return (
    <div className={s.table_container}>
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow className={s.table_head}>
              {
                head
              }
            </TableRow>
          </TableHead>
          {
            appStatus === 'loading' ?
              <TableBodySkeleton columnsCount={4} rowsCount={20}/> :
              <TableBody>
                {body}
              </TableBody>
          }
        </Table>
      </TableContainer>
    </div>
  )
}