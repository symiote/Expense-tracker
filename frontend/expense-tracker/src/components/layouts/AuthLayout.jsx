import React from 'react'
import CARD_2 from "../../assets/images/card2.png"
import {LuTrendingUpDown} from "react-icons/lu"

const AuthLayout = ({children}) => {
  return (
    <div className='flex'>
        <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
            <h2 className='text-lg font-semibold text-black' >Expense Tracker</h2>
            {children}
        </div>
        <div className='hidden md:block w-[40vw] h-screen bg-violet-50 bg-auto-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative'>
                <div className='w-48 h-48 rounded-[40px] bg-slate-200 absolute -top-7 -left-5'></div>
                <div className='w-48 h-56 rounded-[40px] border-[20px] border-slate-600 absolute top-[30%] -right-10 '></div>
                <div className='w-48 h-48 rounded-[40px] bg-slate-500 absolute -bottom-7 -left-5'></div>
                
                <div className='grid grid-cols-1 z-20'>
                    <StatesInfoCard icon={<LuTrendingUpDown/>} label="Track Your Income and Expense" value="3,80,000" color="bg-purple-700" />
                </div>

                <img src={CARD_2} alt="this is an banner image" className='w-64 lg:w-[90%] absolute bottom-10 shadow shadow-blue-400/15 rounded-2xl ' />
        </div>
    </div>
  )
}

export default AuthLayout;

const StatesInfoCard = ({icon,label,value,color})=>{
    return <div className='z-20 flex  gap-6 bg-white p-4 rounded-xl shadow-md shadow-slate-200'>
        <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`} >
            {icon}
        </div>
        <div>
           <h6 className='text-xs text-gray-500 mb-1 font-semibold'>{label}</h6>
           <h6 className='text-[20px] font-semibold'>₹{value}</h6>
        </div>
    </div>
}

