import React, { useRef, useState } from 'react'
import { Box, FormControl, RadioGroup, FormLabel, FormControlLabel, Radio, Button, CircularProgress } from '@mui/material'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import RestartAlt from '@mui/icons-material/RestartAlt'
import Axios from 'axios'
import Loading from './Loading'
import { useNavigate } from 'react-router-dom'
import { useMyOwnContext } from '../ContextAPI/UserContext'

export default function GamePlay() {
    const { user } = useMyOwnContext()
    const [property, setProperty] = useState('none')
    const Navi = useNavigate()
    const [playedData, setPlayedData] = useState({
        diceOne: 0,
        diceTwo: 0,
        amount: user.points,
        amountWon: 0
    })
    const [gamePlayed, setGamePlayed] = useState(false)
    const [selectedAmount, setselectedAmount] = useState(false)
    const [choice, setchoice] = useState({
        amount: 0,
        points: user.points,
        username: user.username,
        option: ''
    })

    const submitForm = async (e) => {
        e.preventDefault()
        setProperty('flex')
        if (choice.amount !== "" && choice.option !== "") {
            await Axios.put("https://fstask-backend.vercel.app/get/numbers", choice).then((res) => {
                setPlayedData({
                    diceOne: res.data.numbers.first,
                    diceTwo: res.data.numbers.second,
                    amount: res.data.amount,
                    amountWon: res.data.gained
                })
                setchoice({
                    amount: 0,
                    option: "",
                    username: user.username,
                    points: res.data.amount
                })
                setGamePlayed(true)
            }).catch(err => { alert("Some Error Occured") })
        }
        else
            alert("Missing Option")
        setProperty('none')
    }
    const selectOption = (e) => {
        setchoice({ ...choice, option: e.target.value })
    }
    const playAgain = () => {
        setGamePlayed(false)
        setselectedAmount(false)
    }
    const selectAmount = (e) => {
        setselectedAmount(true)
        setchoice({ ...choice, amount: e.target.value })
    }
    return (
        <>
            <Loading property={property} msg="Rolling Dices..." />
            <Button size='large' onClick={() => {
                if (selectedAmount)
                    setselectedAmount(false)
                else
                    Navi(-1)
            }} startIcon={<ChevronLeft></ChevronLeft>}> Go back to previous</Button>
            {gamePlayed ? <Box
                display='flex'
                alignItems={'center'}
                flexDirection={'column'}
                justifyContent={'center'}
                height={'80vh'}
                width='100vw'
            >
                <h2>Dices</h2>
                <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >

                    <Box
                        height={"10vh"}
                        width={"10vh"}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        border={'1px solid black'}
                        margin={'1rem'}
                        boxSizing={'border-box'}
                    >
                        {playedData.diceOne}</Box>
                    <Box
                        height={"10vh"}
                        width={"10vh"}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        border={'1px solid black'}
                        margin={'1rem'}
                        boxSizing={'border-box'}
                    >{playedData.diceTwo}</Box></Box>
                <p>{playedData.amountWon === 0 ? <h4 style={{ color: 'red' }}>You Lost </h4> : <><h4 style={{ color: 'green' }}>You Won :</h4> {playedData.amountWon}</>}</p>
                <p><h4>Total Amount now :</h4> {playedData.amount}</p>
                <Button endIcon={<RestartAlt />} onClick={playAgain} variant='contained'>Play Again </Button>
            </Box> : <Box
                display={'flex'}
                height={"80vh"}
                padding='2rem'
                flexDirection={"column"}
                alignItems={'center'}
                justifyContent={'center'}
                textAlign={'center'}
            >
                <form onSubmit={submitForm}>
                    <FormControl>
                        {selectedAmount ?
                            <>
                                <FormLabel required><h3>Select an Option from below</h3></FormLabel>
                                <RadioGroup onChange={selectOption}
                                    aria-labelledby="radio-buttons-group-label"
                                    name="radio-buttons-group"
                                >

                                    <FormControlLabel value="above" control={<Radio />} label="7 Up" />
                                    <FormControlLabel value="lucky" control={<Radio />} label="Lucky 7" />
                                    <FormControlLabel value="below" control={<Radio />} label="7 Down" />
                                </RadioGroup></> : <>
                                <FormLabel required><h3>Select an Amount from below</h3></FormLabel>
                                <RadioGroup onChange={selectAmount}
                                    aria-labelledby="radio-buttons-group-label"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel value="100" control={<Radio />} label="100" />
                                    <FormControlLabel value="200" control={<Radio />} label="200" />
                                    <FormControlLabel value="500" control={<Radio />} label="500" />
                                </RadioGroup>
                            </>}
                    </FormControl>
                    {selectedAmount && <Button variant='contained' type='submit'>Roll Dice</Button>}
                </form>
            </Box>}
        </>
    )
}
