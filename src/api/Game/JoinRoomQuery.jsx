import axios from 'axios'


axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


export async function joinRoomMutation({ player, code }){
    console.log(code)
    const res = await axios({
        method: 'POST',
        url: `${import.meta.env.VITE_BASE_API_URL}/game-api/join-room/`,
        headers:{
            'Content-Type': 'application/json',
        },
        data:{
            player: player,
            code: code
        }
    })

    return res
}