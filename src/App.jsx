import { useState } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter,Route,Routes} from 'react-router-dom'
import Body from './components/Body'
import Signup from './components/Signup'
import Login from './components/Login'
import { Provider } from 'react-redux'
import { appStore } from './utils/appStore'
import Feed from './components/Feed'
import Profile from './components/Profile'
import Chat from './components/Chat'
import Payment from "./components/Payment"
import Connections from './components/Connections'
import Requests from './components/Requests'
function App() {
 

  return (
    <>
     

     <Provider store={appStore}>
     <BrowserRouter basename='/'>
     <Routes>
         <Route path="/" element={<Body/>}>
            <Route path="/login" element={<Login/>}/>
            <Route path="/feed" element={<Feed/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/connections" element={<Connections/>}/>
            <Route path="/requests" element={<Requests/>}/>
            <Route path="/chat/:targetUserId" element={<Chat/>}/>    
            <Route path="/payment" element={<Payment/>}/>    
          
          
          </Route>
     </Routes>
     </BrowserRouter>
     </Provider>
     

    </>
  )
}

export default App;
