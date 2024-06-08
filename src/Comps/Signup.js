import { Box, TextField, Button } from '@mui/material'
import React, { useState } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

export default function Signup() {
    const [creds, setCred] = useState({
        name: "",
        username: "",
        password: "",
        confirmpassword: "",
        email: "",
    })

    const signupUser = async (e) => {
        e.preventDefault()
        if(creds.password===creds.confirmpassword){
            await Axios.post("https://fstask-backend.vercel.app/auth/signup", creds).then(res => {
                alert(res.data.msg)
            }).catch(err => {
                alert("some error occured")
            })
        }else
        alert("password and confirm password do not match")
    }
    const handleChange = (e) => {
        setCred({ ...creds, [e.target.name]: e.target.value })
    }
    return (
        <Box
            display='flex'
            alignItems={'center'}
            flexDirection={'column'}
            justifyContent={'center'}
            height={'80vh'}
            width='100vw'
        >
            <h2 style={{ textAlign: 'center' }}>Signup to 7 Up 7 Down Game</h2>
            <form onSubmit={signupUser}>
                <TextField sx={{ margin: '0.5rem 0' }} name='name' onChange={handleChange} label="Name" variant="standard" required />
                <TextField sx={{ margin: '0.5rem 0' }} name='username' onChange={handleChange} label="Username" variant="standard" required />
                <TextField sx={{ margin: '0.5rem 0' }} name='email' onChange={handleChange} label="Email" variant="standard" required />
                <TextField sx={{ margin: '0.5rem 0' }} name='password' type='password' onChange={handleChange} label="Password" variant="standard" required />
                <TextField sx={{ margin: '0.5rem 0' }} name='confirmpassword' type='password' onChange={handleChange} label="Confirmpassword" variant="standard" required />
                <Button type='submit' variant='contained'>Submit</Button>
            </form>
            <small>Already have an account ? <Link to={'/login'}>Login</Link></small>
        </Box>
    )
}
