import React from 'react'
import {Navbar} from "components/navbar/Navbar"
import {ErrorSnackBar} from "components/errorSnackBar/ErrorSnackBar"
import {AppRoutes} from "routes/AppRoutes"

export const App = () => {

  return (
    <>
      <Navbar/>
      <AppRoutes/>
      <ErrorSnackBar/>
    </>
  )
}