
import { useRoomStore } from "../store/GameStore/RoomStore"
import CardComponent from "./CardComponent"

import taumbayan_tatay from '../assets/Taumbayan_Tatay.png'

import taumbayan_nanay from '../assets/Taumbayan_Nanay.png'

import taumbayan_estudyane_card from '../assets/Taumbayan_Estudyante.png'

import taumbayan_iho from '../assets/Taumbayan_Iho.png'

import taumbayan_iha from '../assets/Taumbayan_Iha.png'


const CardContainer = () => {
  const { playerList, playerLimit }  = useRoomStore()

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
    <div className="flex lg:px-1 flex-wrap justify-center" >
        {Array.isArray(playerList) && playerList.map((player, i) => {
          return (
            <div key={i}>
              
              <CardComponent player={player}  card_player={setCard(player.avatar)}/>
            </div> 
            )  
        })} 
        {
          [...Array(10 - playerList.length)].map((key, i) => {
            if (i >= (parseInt(playerLimit) - parseInt(playerList.length))){
              return(
                <CardComponent key={i} player={key} is_empty={true} />
              )
            } else {
              return (
                <CardComponent key={i} player={null} is_empty={false}/>
              )
            }
              
          })
        }
        
    </div>
  )
}

export default CardContainer