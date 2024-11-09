/* eslint-disable no-unused-vars */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

const initialState = {
    roleText: "",
    roleTurn: "",
    roleTurnUsername: "", 
    mangangasoText: "",
    mangangasoSkillChange: "",
    manghuhulaText: "",
    countdown: "",
    announcement: "",
    voteText: "",
    voteResult: "",
}

export const useGameTextStore = create(

    persist(( set, get ) => ({
        ...initialState,
        setRoleText: (value) => {
            set(() => ({roleText: value}))
        },
        setRoleTurn: (value) => {
            set(() => ({roleTurn: value}))
        },
        setRoleTurnUsername: (value) => {
            set(() => ({roleTurnUsername: value}))
        },
        setMangangasoText: (value) => {
            set(() => ({mangangasoText: value}))
        },
        
        setMangangasoSkillChange: (value) => {
            set(() => ({mangangasoSkillChange: value}))
        },
        
        setManghuhulaText: (value) => {
            set(() => ({manghuhulaText: value}))
        },
        
        setCountDown: (value) => {
            set(() => ({countdown: value}))
        },
        
        setAnnouncement: (value) => {
            set(() => ({announcement: value}))
        },
        setVoteText: (value) => {
            set(() => ({voteText: value}))
        },
        setVoteResult: (value) => {
            set(() => ({voteResult: value}))
        },
        resetState: () => {
            set(() => (initialState))
        }
    }),
    {
        name: 'game_text-storage-state',
        storage: createJSONStorage(() => sessionStorage)
    })
)
