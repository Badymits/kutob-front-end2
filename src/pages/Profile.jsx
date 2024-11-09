/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react'

import home from '../assets/Home_Icon.png'
import { Link } from "react-router-dom"
import taumbayan_tatay from '../assets/Taumbayan_Tatay.png'
import taumbayan_lalaki from '../assets/lalaki.png'

import taumbayan_nanay from '../assets/Taumbayan_Nanay.png'
import taumbayan_babae from '../assets/babae.png'

import taumbayan_estudyane_card from '../assets/Taumbayan_Estudyante.png'
import taumbayan_estudyante from '../assets/estudyante.png'

import taumbayan_iho from '../assets/Taumbayan_Iho.png'
import taumbayana_bata_m from '../assets/Bata_m.png'

import taumbayan_iha from '../assets/Taumbayan_Iha.png'
import taumbayana_bata_f from '../assets/Bata_f.png'

import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { useRoomStore } from '../store/GameStore/RoomStore'
import axios from 'axios'



const Profile = ({ closeProfile }) => {

  let { userAvatar, updateAvatar } = useRoomStore()

  const [loading, setLoading] = useState(false)
  const [avatarText, setAvatarText] = useState(() => userAvatar ? userAvatar : 'taumbayan_tatay' )
  const [changes, setChanges] = useState("")
  let { user, setUser } = useContext(UserContext)
  const username = useRef()


  const setAvatar = () => {
    if (userAvatar === 'taumbayan_tatay'){
      return taumbayan_tatay
    }
    else if (userAvatar === 'taumbayan_nanay'){
      return taumbayan_nanay
    }
    else if (userAvatar === 'taumbayan_estudyante'){
      return taumbayan_estudyane_card
    }
    else if (userAvatar === 'taumbayan_iho'){
      return taumbayan_iho
    }
    else if (userAvatar === 'taumbayan_iha'){
      return taumbayan_iha
    }
  }

  const setAvatarIcon = () => {
    if (userAvatar === 'taumbayan_tatay'){
      return taumbayan_lalaki
    }
    else if (userAvatar === 'taumbayan_nanay'){
      return taumbayan_babae
    }
    else if (userAvatar === 'taumbayan_estudyante'){
      return taumbayan_estudyante
    }
    else if (userAvatar === 'taumbayan_iho'){
      return taumbayana_bata_m
    }
    else if (userAvatar === 'taumbayan_iha'){
      return taumbayana_bata_f
    }
  }

  const [activeAvatar, setActiveAvatar] = useState(setAvatar) // the card character
  const [activeIcon, setActiveIcon] = useState(setAvatarIcon) // icon character

  const setActive = (num) => {
    switch (num) {
      case 1:
        setActiveAvatar(taumbayan_tatay)
        setActiveIcon(taumbayan_lalaki)
        setAvatarText('taumbayan_tatay')
        return true

      case 2:
        setActiveAvatar(taumbayan_nanay)
        setActiveIcon(taumbayan_babae)
        setAvatarText('taumbayan_nanay')
        return true
        
      case 3:
        setActiveAvatar(taumbayan_estudyane_card)
        setActiveIcon(taumbayan_estudyante)
        setAvatarText('taumbayan_estudyante')
        return true

      case 4:
        setActiveAvatar(taumbayan_iho)
        setActiveIcon(taumbayana_bata_m)
        setAvatarText('taumbayan_iho')
        return true

      case 5:
        setActiveAvatar(taumbayan_iha)
        setActiveIcon(taumbayana_bata_f)
        setAvatarText('taumbayan_iha')
        return true

      default:
        setActiveAvatar(taumbayan_tatay)
        setActiveIcon(taumbayan_lalaki)
        
        return true
    }
  }

  useEffect(() => {
    if (changes){
      setTimeout(() => {
        setChanges("")
      }, 3000) // gone after 3 seconds
    }
  }, [changes, setChanges])

  const saveUserSettings = async (e) => {
    e.preventDefault();
    if (username.current.value.length  == 0){
      alert('Enter username first before saving!')
    }
    else if (username.current.value.length <=8){

      await axios({
        method: 'PATCH',
        url: `${import.meta.env.VITE_BASE_API_URL}/user-api/update-player/`,
        headers:{
          'Content-Type': 'application/json',
        },
        data: {
          username: user,
          new_username: username.current.value,
          avatar: avatarText
        }
      }).then((res) => {
        setChanges(res.data.message)

        updateAvatar(res.data.avatar)
        sessionStorage.setItem('user', res.data.new_username)
        setUser(res.data.new_username)

      }).catch((res) => {
        setChanges('Unable to save changes')
      })

    } else {
      setChanges('Username only allows up to 8 characters!')
    }
    
  }
  return (
    <div className="bg-day-bg h-screen bg-no-repeat bg-cover bg-center font-metaltext">

        <div className={`bg-[#463622] absolute ${changes ? 'top-[10vh]' : 'hidden'}   left-1/2 transform z-50
          -translate-x-1/2 -translate-y-1/2 p-5 rounded-lg border-black border-[1px] text-center font-metaltext block mx-auto duration-200 ease-in-out`}>

          <p className='text-2xl md:text-3xl lg:text-5xl'>{changes}</p>
        </div>
        
        <div className='bg-white/20 backdrop-blur-lg rounded-xl flex flex-col items-center justify-center   
          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] px-5 md:px-[70px] p-[2em] md:p-[5em]'>

          <Link to='/' className='absolute -top-1 right-5'>
            <img src={home} alt="" className='hover:bg-gray-600 rounded-xl cursor-pointer h-12 w-12 md:h-25 md:w-25 m-1 md:m-4'/>
          </Link>

          <div className='flex flex-col lg:flex-row items-center w-full gap-10 '>
            <div className=''>

              <h1 className='text-center text-2xl md:text-5xl md:my-6 lg:text-start'>Profile</h1>

              <div className='relative w-full'>
                <img src={activeAvatar} alt="avatar" className='h-[180px] w-[125px] md:h-[215px] md:w-[145px] lg:h-[555px] lg:w-[350px]'/>
                <p className='absolute bottom-1 lg:bottom-6 w-full text-center text-lg sm:text-2xl md:text-4xl  lg:text-6xl'>{user}</p>
              </div>
              
              
            </div>
            <div className='flex-1'>
              
              <form action="" className='w-full' onSubmit={saveUserSettings}>
                <label htmlFor="" className='text-center md:text-start text-xl sm:text-3xl lg:text-5xl block'>YOUR NAME</label>

                <input type="text" name='username' ref={username} defaultValue={user}
                  className="shadow appearance-none mt-5 w-full border lg:py-2 px-3 text-2xl md:text-4xl leading-tight rounded-md focus:outline-none focus:shadow-outline font-base bg-[#DFCBA9CC] text-black font-metaltext uppercase opacity-100" />

                <h1 className='text-center md:text-start text-xl md:text-3xl mt-5'>Select your preferred character</h1>
                <div className='flex items-center justify-center md:justify-start flex-wrap gap-5 my-5'>
                  <div onClick={() => setActive(1)} className={`w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] lg:w-[120px] lg:h-[120px] rounded-xl ${activeIcon == taumbayan_lalaki ? 'outline outline-offset-4' : 'hover:outline outline-offset-4 ' } duration-100 cursor-pointer `} >
                    <img src={taumbayan_lalaki} alt="taumbayan_lalaki" className='object-cover w-full h-full hover:scale-95 duration-200 rounded-xl ' />
                  </div>

                  <div onClick={() => setActive(2)} className={`w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] lg:w-[120px] lg:h-[120px] rounded-xl ${activeIcon == taumbayan_babae ? 'outline outline-offset-4' : 'hover:outline outline-offset-4 ' } duration-100 cursor-pointer `}>
                    <img src={taumbayan_babae} alt="taumbayan_babae" className=' object-cover w-full h-full hover:scale-95 duration-200 rounded-xl' />
                  </div>

                  <div onClick={() => setActive(3)} className={`w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] lg:w-[120px] lg:h-[120px] rounded-xl ${activeIcon == taumbayan_estudyante ? 'outline outline-offset-4' : 'hover:outline outline-offset-4 ' } duration-100 cursor-pointer `}>
                    <img src={taumbayan_estudyante} alt="taumbayan_estudyante" className='object-cover w-full h-full hover:scale-95 duration-200 rounded-xl' />
                  </div>

                  <div onClick={() => setActive(4)} className={`w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] lg:w-[120px] lg:h-[120px] rounded-xl ${activeIcon == taumbayana_bata_m ? 'outline outline-offset-4' : 'hover:outline outline-offset-4 ' } duration-100 cursor-pointer `}>
                    <img src={taumbayana_bata_m} alt="taumbyan_iho" className='object-cover w-full h-full hover:scale-95 duration-200 rounded-xl' />
                  </div>

                  <div onClick={() => setActive(5)} className={`w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] lg:w-[120px] lg:h-[120px] rounded-xl ${activeIcon == taumbayana_bata_f ? 'outline outline-offset-4' : 'hover:outline outline-offset-4 ' } duration-100 cursor-pointer `}>
                    <img src={taumbayana_bata_f} alt="taumbyan_iha" className='object-cover w-full h-full hover:scale-95 duration-200 rounded-xl' />
                  </div>
                </div>
                <button type='submit'
                  className='bg-[#1E150A] hover:bg-[#BF8F55] duration-100 p-1  md:p-5 rounded-md w-full md:w-[200px] border-black border-[1px] text-4xl block mx-auto lg:mx-0'
                >Save</button>
              </form>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Profile