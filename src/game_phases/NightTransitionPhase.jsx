
import { useRoomStore } from "../store/GameStore/RoomStore"


const NightTransitionPhase = () => {

  let { nightCount } = useRoomStore()


  return (
    <div className="bg-night-bg w-screen h-[100vh] object-fit absolute bg-no-repeat bg-cover -z-50">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-9xl">
          <p className="font-metaltext text-[#6D1E1E] text-center">NIGHT {nightCount}</p>
      </div>
    </div>
  )
}

export default NightTransitionPhase