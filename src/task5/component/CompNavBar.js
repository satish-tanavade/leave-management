import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'

function CompNavBar() {

  const navigate = useNavigate()
  const handleLogout = () =>{
    localStorage.removeItem('signin')
    navigate('/')
  }
  return (
    <>
      <Box sx = {{marginBottom:'65px'}}>
        <AppBar sx={{ background: 'lightpink', position: 'fixed' }}>
          <Toolbar>
            <Typography>Leave Application</Typography>

            <Button onClick={() => navigate('/login')} sx={{ ml: 'auto' }}>Login</Button>
            <Button onClick={handleLogout}>Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default CompNavBar