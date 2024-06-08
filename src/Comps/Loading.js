import React,{useRef} from 'react'
import { Box,CircularProgress } from '@mui/material'

export default function Loading(props) {
    return (
        <Box
            display={props.property}
            alignItems={'center'}
            justifyContent={'center'}
            height={'80vh'}
            width='100vw'
            position={'absolute'}
            top='0'
            left='0'
            zIndex={'100'}
            sx={{ backgroundColor: 'white' }}
        >
            <CircularProgress color="success" />
            &nbsp;{props.msg}
        </Box>
    )
}
