
import CardSelectVote from "../components/CardSelectVote";
import { useGameTextStore } from "../store/GameStore/GameTextStore";


const VotingPhase = () => {

  let { countdown } = useGameTextStore()

  return (
    <div>
      <div className="bg-day-bg bg-cover bg-no-repeat">
        <h1 className="text-5xl text-center py-5 font-metaltext">Time left: { countdown }s</h1>
        
        <div className="h-[100vh] pt-[1vh]">
          <div className="max-w-[1200px] block mx-auto ">
            <CardSelectVote phase={'voteTarget'}/>
          </div>

        </div>
        <div className="fixed w-[90%] -bottom-20 md:-bottom-[75px] h-[200px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#463622] p-5  rounded-xl shadow-2xl font-metaltext">
            <div className="absolute -top-5 md:-top-8 left-4 md:left-10 bg-[#3F0E0E] text-3xl md:text-4xl px-7 rounded-xl">MODERATOR</div>
            <div className="text-white text-2xl font-thin p-7 uppercase w-full font-metaltext">
              <p>Select who you want to vote out of the game</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default VotingPhase