/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
//import secureLocalStorage from "react-secure-storage"

const UserContext = createContext()

const UserProvider = ({ children }) => {


    // states used to persist data, to prevent users from seeing 
    //home page UI when they are supposed to be in game. Will delete from storage after game
    const [user, setUser] = useState(
        () => sessionStorage.getItem('user') ?
        sessionStorage.getItem('user') : ''
    )
    const [code, setCode] = useState(
        () => sessionStorage.getItem('code') ?
        sessionStorage.getItem('code') : ''
    )

    const [ inGame, setInGame ] = useState(
        () => sessionStorage.getItem('inGame') ?
        sessionStorage.getItem('inGame') : false
    )

    let data = {
        user: user,
        code: code,
        setUser: setUser,
        setCode: setCode,
        inGame: inGame,
        setInGame: setInGame
    }

    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }

