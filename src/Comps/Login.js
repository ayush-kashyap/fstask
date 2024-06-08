import { Box, TextField, Button } from '@mui/material'
import React, { useState } from 'react'
import Axios from 'axios'
import Loading from './Loading'
import { useNavigate } from 'react-router-dom'
import { useMyOwnContext } from '../ContextAPI/UserContext'

export default function Login() {
    const { setLoggedIn, isLoggedIn } = useMyOwnContext()
    const [isLoad, setLoad] = useState('none')
    const Navi = useNavigate()
    const [creds, setCred] = useState({
        username: "",
        password: ""
    })

    const loginUser = async (e) => {
        e.preventDefault()
        setLoad('flex')
        await Axios.post("https://fstask-backend.vercel.app/auth/login", creds).then((res) => {
            if (res.data.success) {
                console.log(res.data.token);
                localStorage.setItem("token", res.data.token);
                setLoggedIn(res.data.token);
                Navi("/");
            }
        }).catch(err => {
            console.log(err)
            alert("some error occured")
        })
        setLoad('none')
    }
    const handleChange = (e) => {
        setCred({ ...creds, [e.target.name]: e.target.value })
    }
    return (
        <>
        <Loading property={isLoad} msg="Logging you in...."/>
            <Box
                display='flex'
                alignItems={'center'}
                flexDirection={'column'}
                justifyContent={'center'}
                height={'80vh'}
                width='100vw'
            >
                <h2 style={{ textAlign: 'center' }}>Login to 7 Up 7 Down Game</h2>
                <form onSubmit={loginUser}>
                    <TextField sx={{ margin: '0.5rem 0' }} name='username' onChange={handleChange} label="Username" variant="standard" required />
                    <TextField sx={{ margin: '0.5rem 0' }} name='password' type='password' onChange={handleChange} label="Password" variant="standard" required />
                    <Button type='submit' variant='contained'>Submit</Button>
                </form>
            </Box>
        </>
    )
}
