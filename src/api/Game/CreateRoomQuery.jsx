import axios from 'axios'


axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


export async function createRoomMutation({ owner }){

    const res = await axios({
        method: 'POST',
        url: `${import.meta.env.VITE_BASE_API_URL}/game-api/create-room/`,
        headers:{
            'Content-Type': 'application/json',
        },
        data:{
            owner: owner
        }
    })

    return res
}