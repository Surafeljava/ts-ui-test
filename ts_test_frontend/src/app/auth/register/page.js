'use client';

import React, { useState } from 'react';
import { registerUser } from '@/app/utils/services/auth.service';

function Register() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [username, setUserName] = useState();

    const [showConfirmEmail, setShowConfirmEmail] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
    
        // Mock fetching user info after login, replace with real API call
        const userInfo = {
          name: username,
          email: email,
          password1: password,
          password2: password
        };
        
        const response = await registerUser(userInfo);

        if (response.status >= 200 && response.status < 300) {
            setShowConfirmEmail(true);
        } else {
            console.log('Response is not OK. Status code:', response.status);
        }
        
        // router.push('/dashboard');
    };

    return (
        <div className='flex flex-col justify-center items-center w-full min-h-screen gap-2'>
            <p className='uppercase'>Register</p>

            {!showConfirmEmail && (
                <form onSubmit={handleLogin} className='flex flex-col gap-2'>
                    <input
                    className='px-3 py-2 rounded-lg bg-black border border-gray-700'
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    />
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
            )}

            {showConfirmEmail && (
                <div className=''>
                    <p>Please Confirm your email</p>
                </div>
            )}
        </div>
    );
}

export default Register