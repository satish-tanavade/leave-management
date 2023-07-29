import React from 'react'
import { RouterProvider } from 'react-router'
import {router} from './router/Routes'

function Main() {
  return (
    <>
        <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default Main