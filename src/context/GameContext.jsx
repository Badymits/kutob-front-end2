/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { useRoomStore } from "../store/GameStore/RoomStore";
import { 
    RoleRevealPhase, 
    NightTransitionPhase, 
    SelectTargetPhase,
    DayTransitionPhase,
    DayAnnouncementPhase,
    DiscussionPhase,
    VotingPhase,
    VoteResultsPhase,
    GameResultsPhase

} from '../game_phases'


export const GameContext = createContext()

export const GameProvider = ({ children }) => {

    let { phase } = useRoomStore()
    const [roleText, setRoleText] = useState("")
    const [roleTurn, setRoleTurn] = useState("")
    const [ roleTurnUsername, setRoleTurnUsername ] = useState("")

    // role specific text
    const [mangangasoText, setMangangasoText] = useState("")
    const [mangangasoSkillChange, setMangangasoSkillChange] = useState("")
    const [manghuhulaText, setManghuhulaText] = useState("")

    const [toggleModal, setToggleModal] = useState(false)
    const [countdown, setCountDown] = useState()
    const [announcement, setAnnouncement] = useState('')

    const [voteText, setVoteText] = useState('')
    const [voteResult, setVoteResult] = useState('')


    const handlePhase = () => {
        if (phase == 1){
            return <RoleRevealPhase /> 
        }
        else if (phase == 2) {
            return <NightTransitionPhase /> 
        }
        else if (phase == 3) {
            return <SelectTargetPhase /> 
        }
        else if (phase == 4) {
            return <DayTransitionPhase /> 
        }
        else if (phase == 5) {
            return <DayAnnouncementPhase /> 
        }
        else if (phase == 6){
            return <DiscussionPhase /> // discussion phase, timer involved (90 secs / 1:30 mins)
        }
        else if (phase == 7){
            return <VotingPhase /> 
        }
        else if (phase == 8){
            return <VoteResultsPhase />
        }
        else if (phase == 9){
            return <GameResultsPhase />
        }
        else {
            console.log('')
        }
    }

    let data = {
        roleTurn: roleTurn,
        roleText: roleText,
        toggleModal: toggleModal, 
        countdown: countdown,
        announcement: announcement,
        mangangasoText: mangangasoText,
        manghuhulaText: manghuhulaText,
        voteText: voteText,
        voteResult: voteResult,
        roleTurnUsername: roleTurnUsername,
        mangangasoSkillChange: mangangasoSkillChange,
        setMangangasoSkillChange: setMangangasoSkillChange,
        setVoteResult: setVoteResult,
        setVoteText: setVoteText,
        setManghuhulaText: setManghuhulaText,
        setMangangasoText: setMangangasoText,
        setAnnouncement: setAnnouncement,
        setCountDown: setCountDown,
        setToggleModal: setToggleModal,
        setRoleText: setRoleText,
        setRoleTurn: setRoleTurn,
        handlePhase: handlePhase,
        setRoleTurnUsername: setRoleTurnUsername
    }

    return (
        <GameContext.Provider value={data}>
            {children}
        </GameContext.Provider>
    )
}

