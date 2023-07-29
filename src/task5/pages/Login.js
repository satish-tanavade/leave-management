import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'

function Login() {
  const navigate = useNavigate()

  const [input, setInput] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const users = JSON.parse(localStorage.getItem('users'))

  const handleSubmit = (e) => {
    e.preventDefault()
    const isSign = users.find(user => user.email === input.email && user.password === input.password)

    if (isSign) {
      alert('SignIn Successful')
      console.log('SignIn Successful');
      localStorage.setItem('signin', JSON.stringify(isSign))
      navigate(`/dashboard/${isSign.role}`)
      setInput({
        email: '',
        password: ''
      })
    } else {
      alert('Invalid credential')
      setInput({
        email: '',
        password: ''
      })
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          border={'1px solid #ccc'}
          display={'flex'}
          flexDirection={'column'}
          gap={'20px'} width={'400px'}
          padding={'20px'}
          sx={{ mx: 'auto', }}
          borderRadius={'20px'}
        >
          <Typography textAlign={'center'} variant='h4' color={'primary'} >Login Form</Typography>
          <TextField name='email' onChange={handleChange} value={input.email} placeholder='Enter email'></TextField>
          <TextField name='password' onChange={handleChange} value={input.password} placeholder='Enter password'></TextField>
          <Button type='submit' variant='contained'>Login</Button>
          <Button onClick={() => navigate('/register')}>Register</Button>
        </Box>
      </form>
    </>
  )
}

export default Login