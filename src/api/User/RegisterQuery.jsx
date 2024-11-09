import axios from 'axios'

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


export async function registerMutation({username}){
    console.log(username)
    const res = await axios({
        method: 'POST',
        withCredentials: false,
        url: `${import.meta.env.VITE_BASE_API_URL}/user-api/register/`,
        data: JSON.stringify({
            'username': username
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    return res
}
