
import { useState, useRef, useContext, useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import { useRoomStore } from "../store/GameStore/RoomStore"
import { Link, useNavigate } from "react-router-dom"
import { IoMdClose } from 'react-icons/io'

import { createRoomMutation } from "../api/Game/CreateRoomQuery";
import { joinRoomMutation } from "../api/Game/JoinRoomQuery";
import axios from "axios"
import { UserContext } from "../context/UserContext"
import RoleDescriptions from "../components/RoleDescriptions"

import profile from '../assets/Profile_Icon.png'




const Home = () => {

  const [ toggleModal, setToggleModal ] = useState(false)
  const roomCode = useRef() // code input from modal form

  const {
    user,
    code,
    inGame,
    setUser,
    setCode,
    setInGame,
  } = useContext(UserContext)

  const {
    updatePlayerList,
    updateRoomOwner,
    updateInLobby,
    reset
  } = useRoomStore()

  const navigate = useNavigate()


  const roomMutationCreate = useMutation({
    mutationKey: ['room-create'],
    mutationFn: createRoomMutation,
    onSuccess: (res) => {
      console.log(res)
      // set room code in local storage
      sessionStorage.setItem('code', res.data.code)
      setCode(res.data.code)

      // add player to player array in game store
      updatePlayerList(user)

      // update game object in gamestore to keep track for UI changes
      updateRoomOwner(user)

      updateInLobby(true)
      // redirect to room with code
      navigate(`/${res.data.code}`)
    },
    onError: (err) => {
      console.log(err.response.status)

      if (err.response.status === 400){
        alert(err.response.data.message)
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('code')
        sessionStorage.removeItem('inGame')
        setInGame(false)
        setUser('')
        reset()
        sessionStorage.removeItem('room-storage-state')
        navigate('/register')

      } else {
        navigate('/')
      }
      
    }
  })

  const roomMutationJoin = useMutation({
    mutationKey: ['room-join'],
    mutationFn: joinRoomMutation,
    onSuccess: (res) => {

      // set room code in local storage
      sessionStorage.setItem('code', roomCode.current.value)
      setCode(roomCode.current.value)

      // update player list for every user to see new addition to room
      updatePlayerList(res.data.players)

      updateInLobby(true)

      navigate(`/${roomCode.current.value}`)

      // reset form
      roomCode.current.value = ''
    },
    onError: (res) => {
      console.log(res)
      alert(res.response.data.message)
    }
  })

  const createRoom = () => {
    console.log('create...')
    roomMutationCreate.mutate({ owner: user })
  }

  const joinRoom = (e) => {
    e.preventDefault()
    console.log('join...')
    console.log(roomCode.current.value)
    roomMutationJoin.mutate({  player: user, code: roomCode.current.value })
  }

  // essentially a logout function where the old username is deleted 
  const changeUsername = async () => {
    console.log('change...')
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('code')
    sessionStorage.removeItem('inGame')
    setInGame(false)
    setUser('')
    reset()
    sessionStorage.removeItem('room-storage-state')
    await axios({
        method: 'DELETE',
        url: `${import.meta.env.VITE_BASE_API_URL}/user-api/delete/${user}/`,
        xsrfHeaderName: 'X-CSRFTOKEN',
    }).then((res) => {
        console.log(res.data)
        navigate('/register')
    }).catch((res) => {
        console.log(res)
    })
  }

  useEffect(() => {

    if (inGame){
      navigate(`/${code}`)
    }

  }, [inGame, navigate, code])

  return (
    <div className="relative">
        
        <div className="grid md:grid-cols-7 xl:grid-cols-11 w-full">
          <div className=" absolute  w-[90%]  py-2 -translate-x-1/2 left-1/2 font-metaltext text-lg md:text-4xl px-6
              flex justify-between">
              <div>
                <h1 className="">Welcome {user}</h1>
                <button className="text-sm md:text-xl hover:underline underline-offset-1" onClick={() => changeUsername()}>Back to register</button>
              </div>
              
              <div className="p-2">
                <Link to="/profile">
                  <img src={profile} alt="" className="hover:bg-gray-600 rounded-full cursor-pointer h-9 w-9 md:h-12 md:w-12"/>
                </Link>
                
              </div>
          </div>

          <div className="col-start-1 col-end-8 xl:col-end-6  flex flex-col justify-center  
            items-center  h-screen">

              <h1 className="text-center text-6xl sm:text-8xl lg:text-9xl my-5 font-kutob uppercase leading-[90px]">Kutob at <br /> Bulong</h1>

              <button onClick={createRoom} className="text-4xl my-5 hover:text-[#BF8F55] uppercase font-metaltext">Create Game</button>
              <button className="text-4xl my-5 hover:text-[#BF8F55]  uppercase font-metaltext" onClick={() => setToggleModal(!toggleModal)}>Join Game</button>
          </div>

          <div className=" col-start-1 col-end-8 mx-4 xl:pr-[40px] xl:col-start-6 xl:col-end-12 font-metaltext flex items-center mb-5">
            <div className="bg-white/10 backdrop-blur-xl rounded-lg  p-5">
              <h1 className="text-4xl md:text-6xl uppercase">How to play?</h1>
                <p className="text-xl leading-[50px] my-5">During the <span className="text-[#BF8F55]">night phase</span>, players with special roles (e.g., Aswang, Mangangaso)
                secretly perform their actions. The Aswang player attempts to eliminate a target,
                while the Mangangaso player tries to protect a player.</p>

                <p className="text-xl leading-[50px] my-5">In the <span className="text-[#BF8F55]">day phase</span>, all players discuss and debate to identify the Aswang player(s).
                Players vote to eliminate a suspected Aswang. If the Aswang is eliminated, the
                Villagers win. If not, the game continues.</p>

                <p className="text-xl leading-[50px] my-5">
                The game then cycles back to the Night Phase, where the special role players take
                their actions again, followed by the Day Phase discussion and voting.

                This cycle of Night and Day phases continues until either the Aswang is eliminated
                (Villagers win) or the Aswang successfully eliminates enough Villagers to win
                the game.
                </p>
            </div>
              
          </div>

          <div className={`${toggleModal ? 'block' : 'hidden' }  absolute w-[90%] md:w-[650px] lg:w-[920px] top-[12%] sm:top-[18%] md:top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center h-[500px]
              leading-[60px] border-[1px] border-black  bg-[#463622]  rounded-lg shadow-xl font-metaltext px-4`}>

              <IoMdClose onClick={() => setToggleModal(!toggleModal)} className="cursor-pointer text-5xl absolute right-1 m-4"/>

              <form action="" className="flex flex-col items-center justify-center h-full w-full px-4" onSubmit={joinRoom}>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl my-4">Join Room</h1>
                  <input type="text" name="input" ref={roomCode}
                  className=" h-[60px] border-[1px] rounded-md lg:w-[700px] pl-2 border-black text-xl md:text-3xl text-black my-5" placeholder="Enter Room Code..."/>
                  <button type="submit" className="text-2xl lg:text-4xl w-[150px] md:w-[200px] bg-[#1E150A] p-1 md:p-4 rounded-lg">Enter</button>
              </form>

          </div>

        </div>
        
        <div className="">
          <RoleDescriptions />
        </div>
    </div>
  )
}

export default Home