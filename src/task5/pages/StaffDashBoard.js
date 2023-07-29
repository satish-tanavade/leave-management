import { Box, Button, Card, CardActions, CardContent, Container, FormControl, Grid, IconButton, List, ListItemIcon, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment';
import Modal from '@mui/material/Modal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '425PX',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);


export default function StaffDashBoard() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [leaveData, setLeaveData] = useState(JSON.parse(localStorage.getItem('leaveData') || '[]'))
    const [editLeave, setEditLeave] = useState(null)

    const navigate = useNavigate()

    const [data, setData] = useState({
        from: '',
        to: '',
        reason: ''
    })

    const signin = JSON.parse(localStorage.getItem('signin'))

    const handleChange = (e) => {
        setData((prev) => ({
            ...prev,
            signin: signin.id,
            id: uuidv4(),
            status: 'pending',
            fname: signin.fname,
            lname: signin.lname,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLeaveData([...leaveData, data])
        localStorage.setItem('leaveData', JSON.stringify([...leaveData, data]))
        setData({
            from: '',
            to: '',
            reason: ''
        })
    }

    const leaveDetails = JSON.parse(localStorage.getItem('leaveData')) || [];
    // console.log(leaveDetails);

    const loginUserLeaves = leaveDetails.filter(leave => leave.signin === signin.id)
    console.log(loginUserLeaves);

    const approveLeave = loginUserLeaves.filter(leave => leave.status === 'approve') || [];
    const rejectLeave = loginUserLeaves.filter(leave => leave.status === 'reject') || [];
    
    return (
        <div>


            <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', gap: '30px' }}>
                <div >
                    <p>{loginUserLeaves ? loginUserLeaves.length : 0}</p>
                    <Typography>Total Leave</Typography>
                </div>

                <div >
                    <p>{approveLeave ? approveLeave.length : 0}</p>
                    <Typography>Approve</Typography>
                </div>

                <div >
                    <p>{rejectLeave ? rejectLeave.length : 0}</p>
                    <Typography>Reject</Typography>
                </div>

            </Box>

            <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Button sx={{ width: '150px', textAlign: 'center', margin: "30px auto" }} onClick={handleOpen} variant='contained'>Apply Leave </Button>


                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {loginUserLeaves?.map(user => {
                        return <Grid key={user.id} item xs={4}>
                            <Card sx={{}}>
                                <CardContent>
                                    <Typography>Leave for {moment(user.from).format('D MMMM, YYYY')} to {moment(user.to).format('D MMMM, YYYY')}</Typography>

                                    <Typography>Number of Days : {moment(user.to).diff(moment(user.from), 'days') + 1}</Typography>
                                    <br />
                                    <Typography>Reason :  </Typography>
                                    <Typography>{user.reason}</Typography>
                                    <br />
                                    {user.status === 'pending' &&
                                        <>
                                            <Typography>Status :  </Typography>
                                            <Typography>{user.status}</Typography>
                                        </>}
                                    {user.status === 'approve' &&
                                        <Box sx={{ display: 'flex', color: 'green', gap: '10px' }}>
                                            <CheckCircleIcon />
                                            <Typography>{user.status}</Typography>
                                        </Box>}

                                    {user.status === 'reject' &&
                                        <Box sx={{ display: 'flex', color: 'red', gap: '10px' }}>
                                            <CancelIcon />
                                            <Typography>{user.status}</Typography>
                                        </Box>}

                                </CardContent>
                            </Card>
                        </Grid>
                    })}

                </Grid>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <form onSubmit={handleSubmit}>
                            <Box sx={{}}>
                                <Typography variant='h5' sx={{ textAlign: 'center', mb: 3 }}>Leave Details</Typography>

                                <FormControl sx={{ mr: 3 }}>
                                    <Typography>From</Typography>
                                    <TextField type='date' size='small' name='from' onChange={handleChange} value={data.from} />
                                </FormControl>

                                <FormControl>
                                    <Typography>To</Typography>
                                    <TextField type='date' size='small' name='to' onChange={handleChange} value={data.to} />
                                </FormControl>

                                <FormControl fullWidth sx={{ my: 3 }}>
                                    <Typography>Reason</Typography>
                                    <TextField multiline minRows={3} name='reason' value={data.reason} onChange={handleChange} />
                                </FormControl>

                                <Grid container justifyContent="flex-end">
                                    <Button sx={{ mr: 3 }} onClick={handleClose}>Cancle</Button>
                                    <Button variant='contained' type='submit'>Submit</Button>
                                </Grid>
                            </Box>

                        </form>
                    </Box>
                </Modal>

            </Container>
        </div>
    );

}


