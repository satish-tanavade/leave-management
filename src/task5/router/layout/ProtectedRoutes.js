import React from 'react'
import { Navigate } from 'react-router';

function ProtectedRoutes({children, allowedRoles}) {
    // console.log(allowedRoles);

    const storedUser = JSON.parse(localStorage.getItem('signin'))
    // console.log(storedUser);

    let auth = {role : storedUser.role}
  return (
    <>
        {auth.role === allowedRoles ? children : <Navigate to={'/login'}/>}
    </>
  )
}

export default ProtectedRoutes