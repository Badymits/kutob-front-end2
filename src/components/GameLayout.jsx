/* eslint-disable no-unused-vars */

import Game from "../pages/Game"
import { w3cwebsocket as W3CWebSocket } from "websocket";

import { useRoomStore } from "../store/GameStore/RoomStore"
import { useContext, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import Lobby from "../pages/Lobby";
// import Chatbox from "./Chatbox";
import { UserContext } from "../context/UserContext";
import { GameContext } from "../context/GameContext";
import { useGameTextStore } from "../store/GameStore/GameTextStore";

const GameLayout = () => {

  const ws = useRef(null)
  const heartbeatIntervalRef = useRef(null);

  const { user, code, inGame, setInGame } = useContext(UserContext)
  let { 
    handlePhase,
    setPhase, 
    setToggleModal, 
  } = useContext(GameContext)

  const { 
    setRoleText,
    setRoleTurn,
    setRoleTurnUsername,
    setMangangasoText,
    setMangangasoSkillChange,
    setManghuhulaText,
    setCountDown,
    setAnnouncement,
    setVoteText,
    setVoteResult,
  } = useGameTextStore()

  const navigate = useNavigate()

  const { 
        updateRoomMessages,
        updatePlayerList, 
        updateLoading, 
        updatePlayerLimit,
        updateAswangLimit,
        updateRole,
        updateNightCount,
        updateDayCount,
        updateAliveStatus,
        updateCurrentTime,
        updateVotedOutStatus,
        updateWinners,
        updatePhase,
        updatePlayer,
        updateVotes,
        phase,
        role,
        updateRoomOwner
    } = useRoomStore()

    useEffect(() => {
      // Open WebSocket connection
      ws.current = new W3CWebSocket(`ws://127.0.0.1:8000/ws/socket-server/${user}/${code}/`);
      const wsCurrent = ws.current;
  
      // Define message handler functions
      const handleCountdown = (data) => {
        setCountDown(data.countdown);
        if (data.countdown === 5) setToggleModal(true);
      };
  
      const handleNightCount = (data) => {
        updateCurrentTime('night');
        updateNightCount(data.count);
      };
  
      const handleDayCount = (data) => {
        updateCurrentTime('day');
        updateDayCount(data.count);
      };
  
      const handleAswangVote = (data) => {
        setVoteResult(data.message);
        if (data.eliminated === user) updateVotedOutStatus(true);
      };
  
      const handleVoteTie = (data) => {
        setVoteResult(data.message);
      };
  
      const handlePlayerSelectTarget = (data) => {
        setRoleTurnUsername(data.player);
        if (data.aswang_players) updatePlayer(data.aswang_players);
      };
  
      const handleAnnounceWinners = (data) => {
        updateWinners(data.winners);
        updateAliveStatus(true);
        updateVotedOutStatus(false);
        if (data.message) setVoteResult(data.message);
      };
  
      const handlePlayerList = (data) => {
        updateLoading(true);
        updateRoomMessages({ message: data.message, sender: data.sender });
        updatePlayerList(data.players);
        updateLoading(false);
      };
  
      const handleChatMessage = (data) => {
        updateRoomMessages({ message: data.message, sender: data.sender });
      };
  
      const handleSendUpdateMessage = (data) => {
        if (data.update === 'room') {
          
          updateAswangLimit(data.new_aswang_limit);
          updatePlayerLimit(data.limit);
  
        } else if (data.update === 'aswang') {
  
          updateAswangLimit(data.limit);
  
        } else if (data.update === 'no_changes') {
  
          updateRoomMessages({ message: data.message, sender: data.sender });
          if (data.playerList) updatePlayerList(data.playerList);
        }
      };
  
      const handleGameStart = () => {
        setInGame(true);
        sessionStorage.setItem('inGame', true);
      };
  
      const handleNextPhase = (data) => {
        updatePhase(data.phase);
      };
  
      const handleRoleShow = (data) => {
        updateRole(data.role);
        updateRoomMessages({ message: `Your role is ${data.role}`, sender: data.sender });
      };
  
      const handleUpdateRoleTurn = (data) => {
        setRoleTurn(data.role);
        if (['mangangaso', 'aswang - mandurugo', 'aswang - manananggal', 'aswang - berbalang'].includes(data.role)) {
  
          setRoleText(data.role === 'mangangaso' ? data.mangangaso_message : "Choose who you'll KILL");
  
          if (data.mangangaso_message_skip) setMangangasoText(data.mangangaso_message_skip);
  
        } else if (data.role === 'babaylan') {
  
          setRoleText("Choose who you'll SAVE");
  
        } else if (data.role === 'manghuhula') {
  
          setRoleText("Choose who you'll GUESS");
        }
      };
  
      const handleGuessPicked = (data) => {
        setManghuhulaText(data.message);
      };
  
      const handleMangangasoSkillChange = (data) => {
        setMangangasoSkillChange(data.message);
      };
  
      const handleAnnounce = (data) => {
        setAnnouncement(data.message);
        if (data.players) {
          const player = data.players.find((player) => player.username === user);
          if (player) updateAliveStatus(false);
        }
      };
  
      const handleAlivePlayersList = (data) => {
        updatePlayerList(data.player_list);
      };
  
      const handleUpdateVotes = (data) => {
        updateVotes(data.votes);
      };

      const handleUpdateRoomOwner = (data) => {
        if (data.player.username === user) updateRoomOwner(data.player.username)
        updateRoomMessages({
          message: data.message,
          sender:data.sender
        })
      }

  
      // Create a map of message types to handler functions
      const messageHandlers = {
        countdown: handleCountdown,
        night_count: handleNightCount,
        day_count: handleDayCount,
        is_aswang: handleAswangVote,
        not_aswang: handleAswangVote,
        vote_tie: handleVoteTie,
        player_select_target: handlePlayerSelectTarget,
        announce_winners: handleAnnounceWinners,
        player_list: handlePlayerList,
        chat_message: handleChatMessage,
        update_player_list: handlePlayerList,
        send_update_message: handleSendUpdateMessage,
        game_start: handleGameStart,
        next_phase: handleNextPhase,
        role_show: handleRoleShow,
        update_roleTurn: handleUpdateRoleTurn,
        guess_picked: handleGuessPicked,
        mangangaso_skill_change: handleMangangasoSkillChange,
        announce: handleAnnounce,
        alive_players_list: handleAlivePlayersList,
        update_votes: handleUpdateVotes,
        update_room_owner: handleUpdateRoomOwner
      };
  
      // Handle incoming WebSocket messages
      const onMessage = (event) => {
        const data = JSON.parse(event.data);
  
        // If there's a handler for this message type, call it
        if (messageHandlers[data.type]) {
          messageHandlers[data.type](data);
        } else {
          console.warn("Unhandled message type:", data.type);
        }
      };
  
      // WebSocket handlers
      wsCurrent.onopen = () => console.log('WS open');
      wsCurrent.onclose = () => console.log('WS close');
      wsCurrent.onmessage = onMessage;
  
      // Cleanup WebSocket connection on component unmount
      return () => {
        wsCurrent.close();
      };
    }, [
      user, code, navigate, updateAswangLimit, updatePlayerLimit, updatePlayerList, 
      updateLoading, updateRole, updateRoomMessages, setInGame, setRoleTurn, 
      setRoleText, setToggleModal, setCountDown, setPhase, updateDayCount, 
      updateNightCount, setAnnouncement, setMangangasoText, setManghuhulaText, 
      setVoteResult, setRoleTurnUsername, setMangangasoSkillChange, updateAliveStatus, 
      updateCurrentTime, updateWinners, updateVotedOutStatus, updatePlayer, 
      updateVotes, updatePhase, updateRoomOwner

    ]);

  return (
    <div className="relative brightness-90">
        {
            inGame ? 
            <Game connection={ws} phase={phase} handlePhase={handlePhase}/>
            :
            <Lobby connection={ws}/>
        }
        
    </div>
  )
}

export default GameLayout