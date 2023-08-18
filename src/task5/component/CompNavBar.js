import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'

function CompNavBar() {

  const navigate = useNavigate()

  const loginUser = JSON.parse(localStorage.getItem('signin'))
  console.log(loginUser);
  const handleLogout = () => {
    localStorage.removeItem('signin')
    navigate('/')
  }
  return (
    <>
      <Box sx={{ marginBottom: '65px' }}>
        <AppBar sx={{ background: 'lightpink', position: 'fixed' }}>
          <Toolbar>
            <Typography>Leave Application</Typography>

            {loginUser ? <Button sx={ {ml: 'auto'} } onClick={handleLogout}>Logout</Button> : <Button onClick={() => navigate('/login')} sx={{ ml: 'auto' }}>Login</Button>}



          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default CompNavBar