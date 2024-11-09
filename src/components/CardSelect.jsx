/* eslint-disable no-unused-vars */

import axios from "axios"
import { useRoomStore } from "../store/GameStore/RoomStore"
import CardComponent from "./CardComponent"
import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"

import taumbayan_tatay from '../assets/Taumbayan_Tatay.png'

import taumbayan_nanay from '../assets/Taumbayan_Nanay.png'

import taumbayan_estudyane_card from '../assets/Taumbayan_Estudyante.png'

import taumbayan_iho from '../assets/Taumbayan_Iho.png'

import taumbayan_iha from '../assets/Taumbayan_Iha.png'
import { useGameTextStore } from "../store/GameStore/GameTextStore"


// this card select component refers to the phase where a character selects their target
const CardSelect = () => {

  const { playerList, role, players} = useRoomStore()
  const { user, code } = useContext(UserContext)
  let { setRoleTurnUsername } = useGameTextStore()

  const [toggleModal, setToggleModal] = useState(false)
  const [target, setTarget] = useState('')

  
  const select = async (target) => {
    if ((role === 'aswang - manduguro' || role === 'aswang - manananggal' || role === 'aswang - berbalang') && user === target.username){
      alert('cannot select yourself as target')
    }
    else {
      await axios({
        method: 'POST',
        url: `${import.meta.env.VITE_BASE_API_URL}/game-api/select-target/`,
        headers:{
          'Content-Type': 'application/json',
        },
        data:{
          player: user,
          code: code,
          role: role, // refers to the current user, not the target
          target: target.username
        }
      }).then((res) => {
        
        setRoleTurnUsername('')
        setToggleModal(false)
      }).catch((res) => {
        console.log(res)
        if (res.response.data.aswang_message !== undefined){
          alert(res.response.data.aswang_message)
        }else if (res.response.data.mangangaso_message !== undefined){
          alert(res.response.data.mangangaso_message)
        }
        setToggleModal(false)
      })
    }
  }

  const setCard = (avatar) => {
    if (avatar == 'taumbayan_tatay'){
      return taumbayan_tatay
    } 
    else if (avatar == 'taumbayan_nanay'){
      return taumbayan_nanay
    }
    else if (avatar == 'taumbayan_estudyante'){
      return taumbayan_estudyane_card
    }
    else if (avatar == 'taumbayan_iho') {
      return taumbayan_iho
    }
    else if(avatar == 'taumbayan_iha'){
      return taumbayan_iha
    }
  }
  return (
    <div className="flex lg:px-1 flex-wrap justify-center">
        {
          toggleModal && 
          <div className="bg-[#463622] h-[300px] w-[700px] absolute top-1/2 left-1/2 transform font-metaltext
          -translate-x-1/2 -translate-y-1/2 z-50 text-4xl flex flex-col gap-8 items-center justify-center border-[1px] border-black font-metalText">
            <p>Confirm Target?</p>
            <button 
            className="hover:text-[#BF8F55]"
            onClick={() => {
              select(target)
            }}>Confirm</button>
            <button className="hover:text-[#BF8F55]" onClick={() => setToggleModal(false)}>Cancel</button>
          </div>
        }
        {playerList.map((player, i) => {
            return (
                <div key={i} className={`hover:opacity-90 hover:cursor-pointer px-1 mx-1 ${players?.some(p => player.username == p.username) ? 'bg-red-900 rounded-md' : ''}`} onClick={() => {
                  setToggleModal(true) 
                  setTarget(player)
              }}>
                    <CardComponent player={player} card_player={setCard(player.avatar)}/>
                </div>
            )
        })}
    </div>
  )
}

export default CardSelect