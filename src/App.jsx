
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Routes, Route, Navigate } from "react-router-dom"
import PrivateRoute from "./utils/PrivateRoute"
import HomeLayout from "./components/HomeLayout"
import Home from "./pages/Home"
import Register from "./pages/Register"
import GameLayout from "./components/GameLayout"
import { UserProvider } from "./context/UserContext"
import Profile from "./pages/Profile"

function App() {
  
  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
            <Routes>
              <Route path="/" element={<PrivateRoute />}>
                <Route element={<HomeLayout />} >
                  <Route index element={<Home />}/>
                  <Route path="/profile" element={<Profile />}/>
                  <Route path="/:code" element={<GameLayout />}/>
                </Route>
                <Route path="/*" element={<Navigate to='/' />}/>
              </Route>
              <Route path="/register" element={<Register />}/>
            </Routes>
        </UserProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
