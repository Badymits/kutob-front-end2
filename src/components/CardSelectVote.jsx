/* eslint-disable no-unused-vars */
import { useContext, useState } from 'react'
import CardComponent from './CardComponent'
import { useRoomStore } from '../store/GameStore/RoomStore'
import { UserContext } from '../context/UserContext'
import axios from 'axios'

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


const CardSelectVote = () => {

  const { playerList, updateVoteStatus, hasVoted, votes } = useRoomStore()
  const { user, code } = useContext(UserContext)

  const [toggleModal, setToggleModal] = useState(false)
  const [target, setTarget] = useState('')

  const select = async (target) => {

    if (user === target.username){
      alert('cannot vote for yourself')
    } else {
      if (!hasVoted){
        await axios({
          method: 'PATCH',
          url: `${import.meta.env.VITE_BASE_API_URL}/game-api/vote-player/`,
          headers:{
            'Content-Type': 'application/json',
          },
          data:{
            player: user,
            code: code,
            vote_target: target.username
          }
        }).then((res) => {
          updateVoteStatus(true)
          setToggleModal(false)
          setTarget('')
        }).catch((err) => {
          console.log()
        })
      }
      // should be else if (hasVoted){ alert }
      else {
        alert('You cannot vote twice')
      }
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

  const setIcon = (avatar) => {
    if (avatar == 'taumbayan_tatay'){
      return taumbayan_lalaki
    } 
    else if (avatar == 'taumbayan_nanay'){
      return taumbayan_babae
    }
    else if (avatar == 'taumbayan_estudyante'){
      return taumbayan_estudyante
    }
    else if (avatar == 'taumbayan_iho') {
      return taumbayana_bata_m
    }
    else if(avatar == 'taumbayan_iha'){
      return taumbayana_bata_f
    }
  }


  return (
    <div className="flex lg:px-1 flex-wrap justify-center">
    {/* modal to confirm select */}
    {
      toggleModal && 
      <div className="bg-[#463622] h-[300px] w-[700px] absolute top-1/2 left-1/2 transform font-metaltext
      -translate-x-1/2 -translate-y-1/2 z-[100] text-4xl flex flex-col gap-8 items-center justify-center border-[1px] rounded-lg border-black font-metalText">
        <p>Confirm Vote?</p>
        <button 
        className="hover:text-[#BF8F55]"
        onClick={() => {
          select(target)
        }}>Confirm</button>
        <button className="hover:text-[#BF8F55]" onClick={() => setToggleModal(false)}>Cancel</button>
      </div>
    }
      {/* if hasVoted, pointer events none */}
      {playerList.map((player, i) => {
          return (
              <div key={i} className="hover:opacity-90 hover:cursor-pointer px-2 relative" onClick={() => {
                    setToggleModal(true) 
                    setTarget(player)
                }}>
                  <div className='absolute z-50 w-full'>
                    {
                      votes?.some(p => player.username === p.vote_target.username) ?
                      <div>
                        {
                          votes?.map(p => {
                            if (p.vote_target.username === player.username){
                              return (
                                <div key={p.username}>
                                  <img src={setIcon(p.avatar)} alt="" className='h-5 w-5 md:h-12 md:w-12 my-2 border-white border-2 rounded-full' />
                                </div>
                              )
                            }

                          })
                        }
                      </div>
                      : <div></div>
                    }
                  </div>
                  <CardComponent player={player} card_player={setCard(player.avatar)}/>
              </div>
          )
      })}
  </div>
  )
}

export default CardSelectVote