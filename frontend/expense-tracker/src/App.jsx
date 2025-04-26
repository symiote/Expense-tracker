import React from 'react'
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";
import SignUp from './pages/Auth/signup';
import Login from './pages/Auth/login';
import Income from './pages/Dashboard/Income';
import Home from './pages/Dashboard/Home';
import Expense from './pages/Dashboard/expense';
import UserProvider from './context/userContext';
import {Toaster} from "react-hot-toast"

const App = () => {
  return (
    <UserProvider>
    <div className=''>
          <Router>
             <Routes>
                <Route path='/' element={<Root/>} ></Route>
                <Route path='/login' exact element={<Login/>} ></Route>
                <Route path='/signup' exact element={<SignUp/>} ></Route>
                <Route path='/dashboard' exact element={<Home/>} ></Route>
                <Route path='/income' exact element={<Income/>} ></Route>
                <Route path='/expense' exact element={<Expense/>} ></Route>
             </Routes>
          </Router>
    </div>
    <Toaster toastOptions={{
      className:"",
       style:{
        fontSize:"13px"
       }, 
    }} />
    </UserProvider>
  )
}

export default App


const Root =()=>{
  //check if token exist in loacl storage
  const isAuthenticataed = !!localStorage.getItem("token");

  //redirect to dashboard if authenticated ,otherwise to login
  return isAuthenticataed ? (
     <Navigate to="/dashboard" /> 
  ):(
    <Navigate to="/login" />
  )
};