import React, {useState, useEffect } from 'react'
import BoxDisplay from '../BoxDisplay'
import { Button } from '@mui/material'
import { useMyOwnContext } from '../ContextAPI/UserContext'
import { Logout } from '@mui/icons-material'
import Loading from './Loading'

export default function Home() {
  const [isLoad,setload]=useState(false)
  const {getUser,user,setUser,handleLogout}=useMyOwnContext()
  useEffect(()=>{
    const efunc=async()=>{
      await getUser().then((res)=>{
        setUser(res)
        setload(true)
      })
    }
    efunc()
  },[])
  return (
    isLoad?<div className='mainBox'>
    <h1>Welcome, {user.name}!</h1>
    <BoxDisplay/>
    <Button sx={{width:'40vw'}} variant='contained' endIcon={<Logout/>} onClick={handleLogout}>Logout</Button>
  </div>:<Loading property='flex' msg="Fetching User Information"/>
  )
}
