/* eslint-disable react/prop-types */
import { useMemo, useRef, useContext } from 'react'
import { useRoomStore } from '../store/GameStore/RoomStore'
import { UserContext } from '../context/UserContext'

const Chatbox = ({ connection }) => {

    const clientMessage = useRef()
    const { user, inGame } = useContext(UserContext)

    const {
        resetMessages,
        roomMessages,
        roomOwner
    } = useRoomStore()

    const sendMessage = (e) => {
        e.preventDefault();

        if (clientMessage.current.value === '/cls'){
            resetMessages()
        } else {
          connection.current.send(JSON.stringify({
            'message': clientMessage.current.value,
            'sender': user
          }))
        }
        
        clientMessage.current.value = ''
    }

    const messageItems = useMemo(() => {
        return (
            Array.isArray(roomMessages) && roomMessages.map((message, i) => (
                <div key={i} className="text-sm md:text-xl flex overflow-hidden w-full ">
                    <h1 className="text-gray-400">[{message.sender}]: &nbsp;</h1>
                    <p className="text-white-variant-font text-start">{message.message}</p>
                </div>
            ))
        ) 
    }, [roomMessages])
  return (
    <div>
        <div className={ `w-full text-center ${ inGame ? 'h-[600px] md:h-[700px] opacity-100 pb-[50px]' : `${roomOwner ? 'h-[550px] mt-[50px]' : 'h-[90vh]' } ` }  border-[1px]  border-black   bg-[#463622] rounded-lg shadow-sm relative`}>
            
            <h1 className="text-start border-b-[1px] p-2">type &quot;/cls&quot; to clear chat </h1>
            <div className={` ${roomOwner ? 'h-[80%]' : 'h-[90%]'}   overflow-auto px-2`}>
                {messageItems}
            </div>
            <div className="absolute bottom-2 mx-1 flex items-center w-full text-black pr-5">
            <form action="" onSubmit={sendMessage} className="w-full flex gap-3 items-center justify-center">
                <input type="text" name="input" ref={clientMessage} 
                className=" h-[40px] border-[1px] w-full pl-2 border-black text-xl" placeholder="Chat..." required/>

                <button className="bg-gray-400 rounded-lg w-[100px] border-[1px] h-[45px] border-black mx-1 text-xl leading-[20px]" >Enter</button>
            </form>
                
            </div>
        </div>
    </div>
  )
}

export default Chatbox