import { useContext, useEffect } from "react"
import { useRoomStore } from "../store/GameStore/RoomStore"
import { GameContext } from "../context/GameContext"


const EliminatedScreen = () => {

  let { phase } = useContext(GameContext)
  let {  updateVotedOutStatus, updateAliveStatus } = useRoomStore()

  useEffect(() => {

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
          <p className="font-metaltext text-[#6D1E1E] font-bold">YOU WERE KILLED BY THE ASWANG</p>
      </div>
    </div>
  )
}

export default EliminatedScreen