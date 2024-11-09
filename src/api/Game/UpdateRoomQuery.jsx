
import axios from 'axios'


axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


export async function updateRoomMutation({ code, limit, update }){

    const res = await axios({
        method: 'PATCH',
        url: `${import.meta.env.VITE_BASE_API_URL}/game-api/update-room/`,
        headers:{
            'Content-Type': 'application/json',
        },
        data:{
            code: code,
            limit: limit,
            update: update
        }
    })

    return res
}