import { useEffect } from "react"
import { useRoomStore } from "../store/GameStore/RoomStore"
import { useGameTextStore } from "../store/GameStore/GameTextStore"


const VoteResultsPhase = () => {

  let { voteResult, setMangangasoText, setRoleTurnUsername } = useGameTextStore()
  let { updateVoteStatus, isAlive, updateAliveStatus, isVotedOut, updateVotes } = useRoomStore()


  // if user is alive, set it back to false
  useEffect(() => {
    if (isAlive){
      updateVoteStatus(false)
    }
    setMangangasoText("")
    setRoleTurnUsername("")
    updateVotes([])
  }, [updateVoteStatus, isAlive, updateAliveStatus, isVotedOut, setMangangasoText, setRoleTurnUsername, updateVotes])

  return (
    // in this phase, set has voted status to false, to reset the state
    <div className="bg-day-bg w-screen h-[100vh] object-fit absolute bg-no-repeat bg-cover bg-center -z-50">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl md:text-6xl bg-[#463622] rounded-lg border-black border-[1px]">
          <p className="font-metaltext uppercase text-center p-4"> {voteResult} </p>
      </div>
    </div>
  )
}

export default VoteResultsPhase