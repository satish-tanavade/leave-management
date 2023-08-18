import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { v4 as uuidv4 } from 'uuid'

function Register() {

  const navigate = useNavigate()

  const [data, setData] = useState({
    role: 'staff',
    fname: '',
    lname: '',
    email: '',
    contact: '',
    department: '',
    username: '',
    password: ''
  })

  const [error, setError] = useState(false)

  const handleChange = (e) => {
    // console.log(e.target.value);
    // console.log(e.target.name);
    setData((prev) => ({ ...prev, id: uuidv4(), [e.target.name]: e.target.value }))

  }

  const users = JSON.parse(localStorage.getItem('users'));

  const existUsername = users?.find(user => user.username === data.username)
  useEffect(() => {
    if (existUsername) {
      setError(true)
      console.log(existUsername);
    } else {
      setError(false)
    }
  }, [existUsername])

  const handleSubmit = (e) => {
    e.preventDefault()
    const registerArray = users || [];
    if (!error) {
      registerArray.push(data)
      localStorage.setItem('users', JSON.stringify(registerArray));
      setData({
        role: '',
        fname: '',
        lname: '',
        email: '',
        contact: '',
        department: '',
        username: '',
        password: ''
      })
      navigate('/login')
    }else{
      alert('Something went wrong.')
    }

  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box sx={{ margin: '80px auto', width: '500px',boxShadow:'1px 1px 5px', border: '1px solid #ccc', display: 'flex', flexDirection: 'column', gap: '20px', borderRadius: '20px', padding: '20px' }}>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel name='role' value='hod' onChange={handleChange} control={<Radio />} label="HOD" />
              <FormControlLabel name='role' value='staff' onChange={handleChange} checked ={ data.role === 'staff'}  control={<Radio />} label="Staff" />
            </RadioGroup>
          </FormControl>

          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <Typography>First Name</Typography>
              <TextField name='fname' value={data.fname} onChange={handleChange} size='small' required/>
            </Grid>
            <Grid item xs={6}>
              <Typography>Last Name</Typography>
              <TextField name='lname' value={data.lname} onChange={handleChange} size='small' required/>
            </Grid>
            <Grid item xs={6}>
              <Typography>Email</Typography>
              <TextField name='email' value={data.email} onChange={handleChange} type='email' size='small' required/>
            </Grid>
            <Grid item xs={6}>
              <Typography>Contact</Typography>
              <TextField name='contact' value={data.contact} onChange={handleChange} type='number' size='small' required/>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Typography>Department</Typography>
                <Select
                  name='department'
                  value={data.department}
                  label="Age"
                  size='small'
                  onChange={handleChange}
                  required
                >
                  <MenuItem value={'computer'}>Computer</MenuItem>
                  <MenuItem value={'mechanical'}>Mechanical</MenuItem>
                  <MenuItem value={'electrical'}>Electrical</MenuItem>
                  <MenuItem value={'civil'}>Civil</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <Typography>Username</Typography>
              <TextField name='username' value={data.username} onChange={handleChange} size='small' required/>
              {error && <Typography color={'red'}>This Username is exist.</Typography>}
            </Grid>
            <Grid item xs={6}>
              <Typography>Password</Typography>
              <TextField name='password' value={data.password} onChange={handleChange} type='password' size='small' required/>
            </Grid>
          </Grid>
          <Button variant='contained' type='submit'>Submit</Button>
          <Button type='button' onClick={() => navigate('/login')}>Login</Button>
        </Box>


      </form>
    </>
  )
}

export default Register