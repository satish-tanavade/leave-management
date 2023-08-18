import { Box, Button, Card, CardActions, CardContent, Container, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import moment from 'moment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';


function HodDashBoard() {
  const navigate = useNavigate()

  const leaveDetails = JSON.parse(localStorage.getItem('leaveData'))
  // console.log(leaveDetails);

  const handleReject = (user) => {
    const rejectLeave = leaveDetails.find(leave => leave.id === user.id)
    if (rejectLeave) {
      const updateLeave = leaveDetails.map(leave => {
        if (leave.id === user.id) {
          return { ...leave, status: 'reject' }
        }
        return leave
      })

      localStorage.setItem('leaveData', JSON.stringify(updateLeave))
      navigate('/dashboard/hod')
    }
  }

  const handleApprove = (user) => {
    const approveLeave = leaveDetails.find(leave => leave.id === user.id)
    if (approveLeave) {
      const updateLeave = leaveDetails.map(leave => {
        if (leave.id === user.id) {
          return { ...leave, status: 'approve' }
        }
        return leave
      })

      localStorage.setItem('leaveData', JSON.stringify(updateLeave))
      navigate('/dashboard/hod')
    }
  }


  return (
    <>
      <Container sx={{ paddingBottom: "20px", paddingTop: '20px' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {leaveDetails?.map(user => {
            return <Grid key={user.id} item xs={4}>
              <Card sx={{backgroundColor:'lightcyan'}}>
                <CardContent>
                  <Typography>{user.fname} {user.lname}</Typography>
                  {/* <br></br> */}
                  {user.from === user.to ?
                    <Typography>Leave for {moment(user.from).format('D MMMM, YYYY')}</Typography>
                    :
                    <Typography>Leave for {moment(user.from).format('D MMMM, YYYY')} to {moment(user.to).format('D MMMM, YYYY')}</Typography>}
                  <Typography>Number of Days : {moment(user.to).diff(moment(user.from), 'days') + 1}</Typography>
                  <br />
                  <Typography>Reason :</Typography>
                  <Typography>{user.reason}</Typography>
                </CardContent>

                {user.status === 'pending' &&
                  <CardActions>
                    <Grid container justifyContent={'flex-end'}>
                      <Button size="small" sx={{ backgroundColor: '#FF0000', color: 'white', marginRight: '10px', ':hover': {backgroundColor: '#FF0000', color: 'white'} }} onClick={() => handleReject(user)}>Reject</Button>
                      <Button size="small" sx={{ backgroundColor: '#008000', color: 'white', ':hover': {backgroundColor: '#008000', color: 'white'} }} onClick={() => handleApprove(user)}>Approve</Button>
                    </Grid>
                  </CardActions>}

                {user.status === 'approve' &&
                  <Box sx={{ display: 'flex', color: 'green', gap: '10px', ml: 2, mb: 2 }}>
                    <CheckCircleIcon />
                    <Typography>{user.status}</Typography>
                  </Box>}

                {user.status === 'reject' &&
                  <Box sx={{ display: 'flex', color: 'red', gap: '10px', ml: 2, mb: 2 }}>
                    <CancelIcon />
                    <Typography>{user.status}</Typography>
                  </Box>}

                {/* } */}

              </Card>
            </Grid>
          })}

        </Grid>
      </Container>
    </>
  )
}

export default HodDashBoard