import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import s from './CustomTable.module.css'
import {CharactersType} from "../../features/allCharactersPage/charactersSlice";
import {useAppSelector} from "../../hooks/reduxHooks";
import {AppStatusType} from "../../app/appSlice";
import {TableBodySkeleton} from "../tableBodySkeleton/TableBodySkeleton";
import {PATH} from "../../constants/routePaths.enum";
import {Navigate, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootStateType} from "../../app/store";
import {charactersTableHead} from "../../constants/constants";



export const CustomTable = () => {

  const rows = useSelector<RootStateType, CharactersType[]>(state => state.allCharacters.characters)
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