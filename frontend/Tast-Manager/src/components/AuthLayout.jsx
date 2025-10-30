import React from 'react'
import auth_umage from "../assets/images/auth-image.png"

const AuthLayout = ({children}) => {
  return (
    <div className='flex'>
        <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
            <h2 className='text-lg font-medium text-black'>Task Manager</h2>
            {children}
        </div>

        <div className='hidden md:flex w-[40vw] h-screen bg-blue-50 justify-center items-center bg-cover bg-center overflow-hidden p-3'>
            <img src={auth_umage} className='w-full h-full lg:w-[100%]'/>
        </div>
    </div>
  )
}

export default AuthLayout