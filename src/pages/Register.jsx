import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerMutation } from "../api/User/RegisterQuery";
import { UserContext } from "../context/UserContext";


const Register = () => {
  const username = useRef()
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  // redirect authenticated users to home page
  useEffect(() => {
    if (sessionStorage.getItem('user')){
        navigate('/')
    }
  }, [navigate, user])
  const mutationRegister = useMutation({
    mutationKey: ['register'],
    mutationFn: registerMutation,
    onSuccess: (res) => {
        // set to local storage
        sessionStorage.setItem('user', res.data.username)
        setUser(res.data.username)
        // redirect to home page
        navigate('/')
        username.current.value = ''
    },
    onError: (res) => {
        console.log(res)
        alert(res.response.data.message)
    }
  })
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (username.current.value.length > 8){
      alert('Username only allows up to 8 characters!')
    } else {
      mutationRegister.mutate({ username: username.current.value })
    }
  }
  return (
    <div className="bg-lobby-bg h-screen bg-center bg-cover opacity-90 relative brightness-90">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 divide-black m-auto opacity-100 ">
            <form action="" onSubmit={handleFormSubmit} className="flex flex-col w-screen px-6">
                <h1 className="text-center text-xl md:text-3xl lg:text-6xl p-6 uppercase text-[#EEE5D3] font-metaltext font-thin">create your name</h1>
                <input type="text" ref={username}
                    className="shadow appearance-none w-full lg:w-[870px] border py-2 px-3 text-xl md:text-4xl leading-tight rounded-md focus:outline-none focus:shadow-outline font-base bg-[#DFCBA9CC] text-black font-metaltext mx-auto uppercase opacity-100" required />
                <button className="bg-[#1E150A] hover:bg-[#BF8F55] w-full md:w-[300px] text-[#EEE5D3] hover:text-black text-xl md:text-3xl mx-auto my-3 rounded-md p-2 md:p-4 font-metaltext">ENTER</button>
            </form>
        </div>
    </div>
  )
}

export default Register