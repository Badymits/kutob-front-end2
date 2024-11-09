import axios from 'axios'


axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


export async function leaveRoomMutation({ player, code }){

    const res = await axios({
        method: 'DELETE',
        url: `${import.meta.env.VITE_BASE_API_URL}/game-api/leave-room/`,
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