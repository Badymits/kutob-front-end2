
import { useContext } from "react"
import CardSelect from "../components/CardSelect"
import { useRoomStore } from "../store/GameStore/RoomStore"
import { UserContext } from "../context/UserContext"
import { useGameTextStore } from "../store/GameStore/GameTextStore"


const SelectTargetPhase = () => {
  const { user } = useContext(UserContext)
  let { roleTurn, roleText, mangangasoText, roleTurnUsername } = useGameTextStore()
  let { role } = useRoomStore()

  // sequence of characters, mangangaso -> aswang -> babaylan -> manghuhula
  return (
    <div className="bg-night-bg bg-cover bg-no-repeat">
      <div className="w-screen h-[100vh] pt-[10vh] md:pt-[5vh]">
        <div className="max-w-[1200px] block mx-auto ">
          {roleTurn === role && roleTurnUsername == user ? <CardSelect phase={'selectTarget'}/>: null} 
        </div>
      </div>
      <div className="fixed w-[90%]  -bottom-20 md:-bottom-10 h-[200px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#3F0E0E] p-5  rounded-xl shadow-2xl font-metaltext">
          <div className="absolute -top-5 md:-top-8 left-4 md:left-10 bg-[#3F0E0E] text-3xl md:text-4xl px-7 rounded-xl">MODERATOR</div>
          <div className="text-white text-2xl font-thin p-7 uppercase w-full font-metaltext">
            {roleTurn === role && roleTurnUsername == user? 
              <p className="text-2xl md:text-4xl">
                {roleText}
              </p>:
              <div className="text-2xl md:text-4xl">
                {mangangasoText && role === 'mangangaso' ? <p>{mangangasoText}</p> : <p>Wait for your turn</p> }
              </div>
            
            }
          </div>
      </div>
      
    </div>
  )
}

export default SelectTargetPhase