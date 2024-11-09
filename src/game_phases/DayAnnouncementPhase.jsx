import { useGameTextStore } from "../store/GameStore/GameTextStore"

const DayAnnouncementPhase = () => {

  let { announcement } = useGameTextStore()
  return (
    <div className="bg-day-bg w-screen h-[100vh] object-fit absolute bg-no-repeat bg-cover -z-50">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-4xl bg-[#463622] p-5 border-black border-[1px] rounded-xl">
          <p className="font-metaltext uppercase text-center">{announcement} </p>
      </div>
    </div>
  )
}

export default DayAnnouncementPhase