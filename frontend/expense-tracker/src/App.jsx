import React from 'react'
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";
import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';
import Income from './pages/Dashboard/Income';
import Home from './pages/Dashboard/Home';
import Expense from './pages/Dashboard/expense';
import UserProvider from './context/userContext';
import {Toaster} from "react-hot-toast"
import RecentPage from './pages/Dashboard/RecentPage';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';


const App = () => {
  return (
    <UserProvider>
    <div className=''>
          <Router>
             <Routes>
                <Route path='/' element={<Root/>} ></Route>
                <Route path='/login' exact element={<Login/>} ></Route>
                <Route path='/signup' exact element={<SignUp/>} ></Route>
                {/* //new */}
                <Route path='/forgot-password' exact element={<ForgotPassword/>} ></Route>
                <Route path='/reset-password/:token' exact element={<ResetPassword/>} ></Route>
                {/* //new end */}
                <Route path='/dashboard' exact element={<Home/>} ></Route>
                <Route path='/income' exact element={<Income/>} ></Route>
                <Route path='/expense' exact element={<Expense/>} ></Route>
                <Route path='/recent' exact element={<RecentPage/>} ></Route>
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