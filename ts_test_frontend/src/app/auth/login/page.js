'use client';

import React, { useState } from 'react';
import { loginUser } from '@/app/utils/services/auth.service';
import GoogleSignIn from '@/app/components/GoogleSignIn'

import { useAuth } from '@/app/context/AuthContext';

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const {login} = useAuth();

  const handleLogin = async (e) => {
      e.preventDefault();
  
      // Mock fetching user info after login, replace with real API call
      const userInfo = {
        username: email,
        password: password
      };
      
      const response = await loginUser(userInfo);

      console.log(response.data);
      

      if (response.status >= 200 && response.status < 300) {
        login(response.data.access);
      } else {
          console.log('Response is not OK. Status code:', response.status);
      }
      
  };

  return (
    <div className='flex flex-col justify-center items-center w-full min-h-screen gap-2'>
        <p className='uppercase'>Login</p>
        <GoogleSignIn />

        <br/>

        <form onSubmit={handleLogin} className='flex flex-col gap-2'>
          <input
          type="text"
          className='px-3 py-2 rounded-lg bg-black border border-gray-700'
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
          <input
          type="password"
          className='px-3 py-2 rounded-lg bg-black border border-gray-700'
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className='w-full bg-green-400 py-2 rounded-lg text-black'>Submit</button>
        </form>
    </div>
  );
}

export default Login