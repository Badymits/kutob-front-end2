/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react"
import { useRoomStore } from "../store/GameStore/RoomStore"

import taumbayan_win from "../assets/Taumbayan_Win.png"
import taumbayan_defeat from "../assets/Taumbayan_Defeat.png"

import aswang_win from "../assets/Aswang_Win.png"
import aswang_defeat from "../assets/Aswang_Defeat.png"

import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { leaveRoomMutation } from "../api/Game/LeaveRoomQuery"
import { UserContext } from "../context/UserContext"
import { GameContext } from "../context/GameContext"
import { useGameTextStore } from "../store/GameStore/GameTextStore"

const GameResultsPhase = () => {

  const { user, code, setCode, setInGame } = useContext(UserContext)
  let { setToggleModal } = useContext(GameContext)
  const [ background, setBackground ] = useState()
  const { winners, updatePhase, updatePlayerList } = useRoomStore()
  const { resetState } = useGameTextStore()

  let {
    reset,
    resetMessages,
    role
  } = useRoomStore()

  const navigate = useNavigate()

  useEffect(() => {
    if (winners === 'Mga Taumbayan' && (role != 'aswang - mandurugo' || role != 'aswang - manananggal' || role != 'aswang - berbalang')){
      setBackground(taumbayan_win)
    } 
    else if (winners === 'Mga Taumbayan' && (role === 'aswang - mandurugo' || role === 'aswang - manananggal' || role === 'aswang - berbalang')){
      setBackground(aswang_defeat)
    }
    else if (winners === 'Mga Aswang' && (role === 'aswang - mandurugo' || role === 'aswang - manananggal' || role === 'aswang - berbalang')){
      setBackground(aswang_win)
    }
    else if ( winners === 'Mga Aswang' (role !== 'aswang - mandurugo' || role !== 'aswang - manananggal' || role !== 'aswang - berbalang')){
      setBackground(taumbayan_defeat)
    } 
    else if (winners ==='Tie'){
      return false
    }
    
  }, [winners, role])

  const roomMutationLeave = useMutation({
    mutationKey: ['room-leave'],
    mutationFn: leaveRoomMutation,
    onSuccess: (res) => {
      
      sessionStorage.removeItem('code')
      sessionStorage.removeItem('inGame')
      setInGame(false)
      reset()
      resetState()
      resetMessages()
      updatePhase(1)
      setCode('')
      updatePlayerList([])
      setToggleModal(false)
      navigate('/', {replace: true})
    },
    onError: (res) => {
      console.log(res)
    }
  })

  const leaveGame = () => {
    roomMutationLeave.mutate({ player: user, code: code })
  }
  return (
    <div className="relative">
      <img src={background} alt="" className='w-screen h-[100vh] object-fit absolute bg-center -z-50'/>
      <div className='font-kutob flex flex-col items-center justify-end m-auto h-screen  pb-[50px]'>
            <h1 className='text-xl md:text-3xl lg:text-5xl pb-10'>THE WINNERS ARE</h1>
            <h1 className='uppercase text-2xl md:text-5xl lg:text-9xl'>{winners}</h1>
        </div>
        
        <button className="absolute top-5 left-3 bg-[#463622] font-metaltext text-4xl p-3 border-[1px] border-black rounded-xl" onClick={() => leaveGame() }>Back to Home Page</button>
    </div>
  )
}

export default GameResultsPhase