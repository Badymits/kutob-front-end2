/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useMutation } from "@tanstack/react-query"
import CardContainer from "../components/CardContainer"
import { useRoomStore } from "../store/GameStore/RoomStore"
import Chatbox from "../components/Chatbox"
import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import { leaveRoomMutation } from "../api/Game/LeaveRoomQuery"
import { useNavigate } from "react-router-dom"
import { updateRoomMutation } from "../api/Game/UpdateRoomQuery"
import { startGameMutation } from "../api/Game/StartGameQuery"


const Lobby = ({ connection }) => {

  const { user, code } = useContext(UserContext)
  const [loading,  setLoading] = useState(false)
  const {
    playerLimit,
    aswangLimit,
    playerList,
    roomOwner,
    reset,
    updatePhase,
  } = useRoomStore()

  const navigate = useNavigate()

  const roomMutationLeave = useMutation({
    mutationKey: ['room-leave'],
    mutationFn: leaveRoomMutation,
    onSuccess: (res) => {      
      sessionStorage.removeItem('code')
      updatePhase(1)
      reset()
      navigate('/')
    },
    onError: (res) => {
      console.log(res)
    }
  })

  const roomMutationUpdate = useMutation({
    mutationKey: ['room-update'],
    mutationFn: updateRoomMutation,
    onSuccess: (res) => {
        console.log(res)
    }
  })

  const roomMutationStartGame = useMutation({
    mutationKey: ['room-start'],
    mutationFn: startGameMutation,
    onSuccess:(res) => {
      console.log(res)
      setLoading(false)
    },
    onError: (res) => {
      console.log(res)
    }
  })


  const startGame = () => {
    
    if (playerLimit > playerList.length){
        alert('Cannot start game until there are enough players')
      } else {
        setLoading(true)
        roomMutationStartGame.mutate({ code: code })
      }
  }
  const leaveRoom = () => {
    roomMutationLeave.mutate({ player: user, code: code })
  }

  const updateRoomSettings = (limit, update) =>{
    console.log('updating...')
    roomMutationUpdate.mutate({ code: code, limit: limit, update: update })
  }
  
  return (
  
    <div className="flex flex-col lg:grid lg:grid-cols-11 p-4 lg:p-10 h-full bg-lobby-bg bg-center bg-no-repeat bg-cover ">
        <div className="col-start-1 col-end-8 lg:mr-[5em] p-4 ">
            <CardContainer />
            <div className="flex flex-col lg:flex-row items-center lg:justify-between w-full pt-10 md:pt-5  px-8 h-[200px] text-[#BF8F55] font-metaltext">
                {/* code for lobby is always 8 letter-number combination */}
                <h1 className="text-xl md:text-2xl lg:text-4xl">CODE:  <p className="inline text-3xl md:text-5xl lg:text-7xl">{code}</p></h1>
                
                <div className="flex flex-row py-2 gap-2">
                    <button className={`${roomOwner ? 'inline-block' : 'hidden'} text-xl lg:text-4xl bg-[#1E150A] w-full p-2 md:p-6 rounded-lg mr-5`} onClick={() => startGame()}>START</button>
                    <button className="text-xl lg:text-4xl bg-[#463622] p-2 md:p-6 w-full rounded-lg" onClick={() => leaveRoom()}>LEAVE</button>
                </div>
            </div>
        </div>
        <div className="lg:col-start-8 lg:col-end-12">
            {roomOwner === user ?
            <div className="flex flex-col text-2xl md:text-4xl md:gap-3 lg:text-5xl lg:gap-5  relative font-metaltext ">
                <h1 className="text-[#BF8F55]">PLAYERS</h1>
                {/* number of players that can join */}
                <div className="flex gap-[25px] md:gap-[35px] text-[#F8F4EE]">
                    <button className={`${playerLimit == 5 ? 'text-[#BF8F55]' : ''} hover:text-[#BF8F55]`} onClick={() => updateRoomSettings(5, 'update_room')}>5</button>
                    <button className={`${playerLimit == 6 ? 'text-[#BF8F55]' : ''} hover:text-[#BF8F55]`} onClick={() => updateRoomSettings(6, 'update_room')}>6</button>
                    <button className={`${playerLimit == 7 ? 'text-[#BF8F55]' : ''} hover:text-[#BF8F55]`} onClick={() => updateRoomSettings(7, 'update_room')}>7</button>
                    <button className={`${playerLimit == 8 ? 'text-[#BF8F55]' : ''} hover:text-[#BF8F55]`} onClick={() => updateRoomSettings(8, 'update_room')}>8</button>
                    <button className={`${playerLimit == 9 ? 'text-[#BF8F55]' : ''} hover:text-[#BF8F55]`} onClick={() => updateRoomSettings(9, 'update_room')}>9</button>
                    <button className={`${playerLimit == 10 ? 'text-[#BF8F55]' : ''} hover:text-[#BF8F55]`} onClick={() => updateRoomSettings(10, 'update_room')}>10</button>
                </div>
                {/* number of aswang roles that will be assigned */}
                <h1 className="text-[#BF8F55]">ASWANG/S</h1>
                <div className="flex gap-[1em] text-[#F8F4EE]">
                    <button className={`${parseInt(aswangLimit) === 1 ? 'text-[#BF8F55]' : '' } hover:text-[#BF8F55]`} onClick={() => updateRoomSettings(1, 'update_aswang')}>1</button>
                    { playerLimit >= 8 &&  <button className={`${parseInt(aswangLimit) === 2 ? 'text-[#BF8F55]' : '' } hover:text-[#BF8F55]`} onClick={() => updateRoomSettings(2, 'update_aswang')}>2</button> }
                    { playerLimit == 10 && <button className={`${parseInt(aswangLimit) === 3 ? 'text-[#BF8F55]' : '' } hover:text-[#BF8F55]`} onClick={() => updateRoomSettings(3, 'update_aswang')}>3</button> }
                </div>
            </div>
            :
            null
            }
            <Chatbox connection={connection}/>
        </div>
        {loading && 
        <div className="bg-[#463622] h-[300px] w-[900px] absolute top-1/2 left-1/2 transform 
        -translate-x-1/2 -translate-y-1/2 text-8xl flex flex-col gap-8 items-center justify-center border-4 border-black font-metalText">
          LOADING...
          <p className="text-4xl">GAME IS ABOUT TO BEGIN</p>
          
        </div>
        }
    </div>
  )
}

export default Lobby