import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import DashBoard from '../pages/DashBoard'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ProtectedRoutes from './layout/ProtectedRoutes'
import HodDashBoard from '../pages/HodDashBoard'
import StaffDashBoard from '../pages/StaffDashBoard'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<RootLayout/>}>
      <Route index element = {<DashBoard/>}/>
      <Route path='login' element = {<Login/>}/>
      <Route path='register' element = {<Register/>}/>

      <Route 
        path='dashboard/hod' 
        element= {<ProtectedRoutes allowedRoles = {"hod"}>
              <HodDashBoard/>
        </ProtectedRoutes>}/>

        <Route 
        path='dashboard/staff' 
        element= {<ProtectedRoutes allowedRoles = {"staff"}>
              <StaffDashBoard/>
        </ProtectedRoutes>}/>

    </Route>
  )
)