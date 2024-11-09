import axios from 'axios'


axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


export async function startGameMutation({ code }){

    const res = await axios({
        method: 'POST',
        url: `${import.meta.env.VITE_BASE_API_URL}/game-api/start/`,
        headers:{
            'Content-Type': 'application/json',
        },
        data:{
            code: code
        }
    })

    return res
}