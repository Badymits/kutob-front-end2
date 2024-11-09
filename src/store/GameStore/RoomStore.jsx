/* eslint-disable no-unused-vars */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'


const initialState = {
    roomOwner: '',
    userAvatar: 'taumbayan_tatay',
    playerList: [],
    isLoading: false,
    playerLimit: 5,
    aswangLimit: 1,
    roomMessages: [],
    players: [], 
    votes: [],
    inLobby: false,
    inGame: false,
    playerTurn: false,
    isProtected: false,
    isAlive: true,
    hasVoted: false,
    isVotedOut: false,
    currentTime: '',
    role: '',
    nightCount: '',
    dayCount: '',
    cycleCount: '',
    winners: '',
    phase: 1
}

// 5 players, 1 aswang, 8 players, 2 aswang, 10 players, 3 aswang
export const useRoomStore = create(

    persist( (set, get) => ({
        ...initialState,
        updateAvatar: (value) => { set(() => ({ userAvatar: value }))},
        updatePhase: (value) => { set(() => ({ phase: value }))},
        updateWinners: (value) => {
            set(() => ({ winners: value }))
        },
        updateAliveStatus: (value) => {
            set(() => ({ isAlive: value }))
        },
        updateCurrentTime: (value) => {
            set(() => ({currentTime: value}))
        },
        updateVotedOutStatus: (value) => {
            set(() => ({ isVotedOut: value }))
        },
        updateVoteStatus: (value) => {
            set(() => ({ hasVoted: value }))
        },
        updateNightCount: (value) => {
            set(() => ({ nightCount: value }))
        },
        updateDayCount: (value) => {
            set(() => ({ dayCount: value }))
        },
        updateInLobby: (value) => {
            set(() => ({inLobby: value}))
        },
        updateInGame: (value) => {
            set(() => ({ inGame: value }))
        },
        updateRole: (value) => {
            set(() => ({role: value}))
        }, 
        resetRole: () => {
            set(() => ({role: ''}))
        },
        updateRoomMessages: (messages) => {
            set((state) => ({
                roomMessages: [
                    ...state.roomMessages,
                    {
                        'message': messages.message,
                        'sender': messages.sender
                    }
                ]
            }))
        },
        updateLoading: (value) => {set(() => ({ isLoading: value }))},
        updatePlayerLimit: (value) => set(() => ({
            playerLimit: value
        })),
        updateAswangLimit: (value) => set(() => ({
            aswangLimit: value
        })),
        updateRoomOwner: (player) => {
            set(() => ({ roomOwner: player }))
        },
        updatePlayerList: (players) => {
            set((state) => ({ playerList: players }))
        },
        updatePlayer: (players) => {
            set(() => ({ players: players }))
        },
        updateVotes: (votes) => {
            set(() => ({ votes: votes }))
        },
        
        // clearing chat box when user types '/cls'
        resetMessages: () => {
            set((state) => ({
                roomMessages: []
            }))
        },
        reset: () => {
            set(initialState)
        }
    }),
    {
        name: 'room-storage-state',
        storage: createJSONStorage(() => sessionStorage)
    }
))


