
/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { useRoomStore } from '../store/GameStore/RoomStore'
import card_empty from '../assets/card_design.png'
import { UserContext } from '../context/UserContext'

const CardComponent = ({ player, is_empty, card_player }) => {
  let { hasVoted } = useRoomStore()
  let { user } = useContext(UserContext)
  return (
    <div className=''>
        <div className={`relative ${is_empty ? 'bg-gray-500 rounded-xl ': ''} ${hasVoted ? 'opacity-60' : ''} ${player?.username == user ? 'bg-white rounded-xl p-[1px]' : ''} m-1 font-metaltext`}>
            <h1 className={` ${player?.username == user ? 'text-yellow-500' : 'text-white-variant-font'} absolute w-full text-center bottom-1 lg:bottom-3 text-sm sm:text-2xl md:text-3xl  lg:text-3xl font-bold`}>{
              player ? player.username  : '' }
            </h1>
            <img src={ player ? card_player : card_empty} alt="card" 
            className={`h-[120px] w-[80px] sm:h-[170px] sm:w-[100px]  md:h-[190px] md:w-[130px] 
            lg:h-[230px] lg:w-[140px] xl:h-[280px] xl:w-[180px] shrink-0 ${is_empty ? 'opacity-50' : ''}  ${hasVoted ? 'pointer-events-none' : ''} -z-50`} />
        </div>
        
    </div>
  )
}

export default CardComponent