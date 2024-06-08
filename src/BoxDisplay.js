import * as React from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { useMyOwnContext } from './ContextAPI/UserContext';

export default function BoxDisplay() {
    const {user}=useMyOwnContext()
    return <Box
        component="section"
        display="flex"
        width="80%"
        mx="auto"
        my="1rem"
        alignItems="center"
        flexDirection='column'
        justifyContent="center"
        borderRadius="0.5rem"
        sx={{ p: 2, border: '1px solid grey' }}>
        <h3>Total Points:</h3>
        <h4>{user.points}</h4>
        <Link className='link' to='/play-game' >Start Game</Link>
    </Box>
}
