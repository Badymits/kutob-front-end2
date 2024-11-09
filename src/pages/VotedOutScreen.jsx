import { useContext, useEffect } from "react"
import { useRoomStore } from "../store/GameStore/RoomStore"
import { GameContext } from "../context/GameContext"

const VotedOutScreen = () => {
  let { phase } = useContext(GameContext)
  let {  updateVotedOutStatus, updateAliveStatus } = useRoomStore()

  useEffect(() => {
    // end of the game, let users see the results of the game
    if (phase == 9){
      updateAliveStatus(true)
      updateVotedOutStatus(false)
    }

  }, [
    phase,
    updateAliveStatus,
    updateVotedOutStatus
  ])
  return (
    <div className="bg-night-bg w-screen h-[100vh] object-fit absolute bg-no-repeat bg-cover -z-50">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-8xl text-center">
          <p className="font-metaltext text-[#6D1E1E] font-bold">YOU WERE VOTED OUT BY THE GROUP</p>
      </div>
    </div>
  )
}

export default VotedOutScreen