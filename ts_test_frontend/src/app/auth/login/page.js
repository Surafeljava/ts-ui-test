import React from 'react'
import GoogleSignIn from '@/app/components/GoogleSignIn'

function Login() {
  return (
    <div className='flex flex-col justify-center items-center w-full min-h-screen gap-2'>
        <p className='uppercase'>Login</p>
        <GoogleSignIn />
    </div>
  )
}

export default Login