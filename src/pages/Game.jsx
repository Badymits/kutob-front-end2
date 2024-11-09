/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import Chatbox from '../components/Chatbox'
import { useRoomStore } from '../store/GameStore/RoomStore'
import EliminatedScreen from './EliminatedScreen'
import VotedOutScreen from './VotedOutScreen'
import CardContainer from '../components/CardContainer'
import { useGameTextStore } from '../store/GameStore/GameTextStore'

const Game = ({connection, handlePhase}) => {

  let { 
    role, 
    isAlive, 
    isVotedOut, 
    currentTime, 
    nightCount, 
    dayCount, 
    phase 
  } = useRoomStore()

  let {
    countdown, 
    manghuhulaText, 
    setManghuhulaText, 
    mangangasoSkillChange, 
    setMangangasoSkillChange
  } = useGameTextStore()


  useEffect(() => {
    if (manghuhulaText){
      setTimeout(() => {
        setManghuhulaText("")
      }, 5000) // gone after 5 seconds
    }

  }, [manghuhulaText, setManghuhulaText])

  useEffect(() => {
    if (mangangasoSkillChange){
      setTimeout(() => {
        setMangangasoSkillChange("")
      }, 5000) // gone after 5 seconds
    }
  }, [mangangasoSkillChange, setMangangasoSkillChange])
  return (
    <div className='relative '>
        <div className='absolute top-5 left-5 text-4xl font-metaltext'>
          {(phase != 9 && (isAlive && !isVotedOut)) &&  
          <div>
            {currentTime === 'night' && <p>NIGHT {nightCount}</p> }
            {currentTime === 'day' && <p>DAY {dayCount}</p> }
          </div> }
          
        </div>
        {/* remove after 5 seconds */}
        <div className={`${manghuhulaText && role === 'manghuhula' ? `bg-[#463622] absolute top-[10vh] left-1/2 transform 
        -translate-x-1/2 -translate-y-1/2 p-5 rounded-lg border-black border-[1px] text-4xl font-metaltext block mx-auto duration-200 ease-in-out` : 'hidden' }' '`}>
          <p>{manghuhulaText}</p>
        </div>
        <div className={`${mangangasoSkillChange && role === 'mangangaso' ? `bg-[#463622] absolute top-[10vh] left-1/2 transform 
        -translate-x-1/2 -translate-y-1/2 p-5 rounded-lg border-black border-[1px] text-4xl font-metaltext block mx-auto duration-200 ease-in-out` : 'hidden' }' '`}>
          <p>{mangangasoSkillChange}</p>
        </div>

        {phase != 9 &&  
          <div>
            {!isAlive && <EliminatedScreen /> }
            {isVotedOut && <VotedOutScreen />}
          </div> 
        }
        


        {(isAlive && !isVotedOut) &&
          <div className=''>
            {handlePhase()}
          </div>
        }
        
        { (isAlive && !isVotedOut) && 
        <div className={`${ (phase == 6) ? 'flex flex-col lg:grid lg:grid-cols-11 bg-day-bg bg-no-repeat bg-cover relative p-[1.5em] h-full lg:p-10 ' : 'hidden' }`}>
          
          <div className="absolute top-0 w-full left-0 text-center ">
            <h1 className="text-5xl text-center py-5 font-metaltext">Time left: { countdown }s</h1>
          </div>
          <div className="lg:col-start-1 lg:col-end-8 lg:mr-[5em] mt-10 lg:mt-9">
            <CardContainer />
            <div className="h-[100px] md:h-[200px] mx-[20px] mt-10  
            bg-[#463622] p-5  rounded-xl shadow-2xl font-metaltext text-xl md:text-4xl">
              phase here
            </div>
            
          </div>
          <div className='lg:col-start-8 lg:col-end-12 pt-[50px]'>
                <Chatbox connection={connection}/>
          </div>
        </div>
          
        }
        
    </div>
  )
}

export default Game