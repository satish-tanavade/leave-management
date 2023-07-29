import React from 'react'
import CompNavBar from '../../component/CompNavBar'
import {Outlet} from 'react-router-dom'

function RootLayout() {
  return (
    <>
        <CompNavBar />
        <Outlet/>
    </>
  )
}

export default RootLayout