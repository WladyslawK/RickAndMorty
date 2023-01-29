import * as React from 'react'
//mui imports
import {Stack, Snackbar} from '@mui/material'
import MuiAlert, {AlertProps} from '@mui/material/Alert'

//hooks import
import {useAppDispatch, useAppSelector} from "hooks/reduxHooks"

//actionCreator import
import {setAppErrorAC} from "app/appSlice"
import {CLICK_AWAY} from "constants/constants";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props}/>;
})

export const ErrorSnackBar = () => {
  const error = useAppSelector(state => state.app.error)
  const dispatch = useAppDispatch()

  const isOpen = error !== null

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === CLICK_AWAY) {
      return;
    }
    dispatch(setAppErrorAC({error: null}))
  }

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Stack>
  )
}