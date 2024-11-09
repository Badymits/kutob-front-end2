import { useState, useEffect, useContext } from "react"
import { useRoomStore } from "../store/GameStore/RoomStore"

import aswang_manduguro from '../assets/MANDUGURO.jpg'
import aswang_manananggal from '../assets/MANANANGGAL.jpg'
import aswang_berbalang from '../assets/BERBALANG.jpg'
import mangangaso from '../assets/MANGANGASO.jpg'
import taumbayan from '../assets/TAUMBAYAN_LALAKI.jpg'
import manghuhula from '../assets/MANGHUHULA.jpg'
import babaylan from '../assets/BABAYLAN.jpg'
import { GameContext } from "../context/GameContext"
import { useGameTextStore } from "../store/GameStore/GameTextStore"


const RoleRevealPhase = () => {
  const { toggleModal } = useContext(GameContext)
  const { countdown } = useGameTextStore()

  
  const [ background, setBackground ] = useState()
  const [textColor, setTextColor] = useState()
  const { role } = useRoomStore()

  useEffect(() => {
    if (role === 'aswang - mandurugo'){
        setBackground(aswang_manduguro)
        setTextColor('#BF8F55')

    } 
    else if (role === 'aswang - manananggal'){
        setBackground(aswang_manananggal)
    }
    else if (role === 'aswang - berbalang'){
        setBackground(aswang_berbalang)
    }
    else if (role === 'taumbayan'){
        setBackground(taumbayan)
        setTextColor('#BF8F55')
    }
    else if (role === 'mangangaso'){
        setBackground(mangangaso)
        
    }
    else if (role === 'manghuhula'){
        setBackground(manghuhula)
    }
    else if (role === 'babaylan'){
        setBackground(babaylan)
    }
  }, [role])


  return (
    <div className={`text-[${textColor}]`}>
        <img src={background} alt="" className='w-[100vw] h-[100vh] absolute object-cover -z-50'/>
        <div className='font-kutob flex flex-col items-center justify-end m-auto h-screen text-center  pb-[50px]'>
            <h1 className='text-3xl md:text-4xl lg:text-5xl pb-10'>YOUR ROLE IS</h1>
            <h1 className='uppercase text-4xl md:text-5xl lg:text-9xl'>{role}</h1>
        </div>
        <div className={`${toggleModal ? '' : 'hidden'} absolute w-[840px] top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#463622] p-5  
        rounded-lg border-black border-[1px] shadow-sm text-white `}>
            Game is starting in {countdown}...
        </div>
    </div>
  )
}

export default RoleRevealPhase