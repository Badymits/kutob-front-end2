import { useRoomStore } from "../store/GameStore/RoomStore"

const DayTransitionPhase = () => {

  let { dayCount } = useRoomStore()
  return (
    <div className="bg-day-bg w-screen h-[100vh] object-fit absolute bg-no-repeat bg-cover -z-50">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-9xl">
          <p className="font-metaltext text-[#BF8F55] text-center">DAY {dayCount}</p>
      </div>
    </div>
  )
}

export default DayTransitionPhase