'use client';

import { GoogleLogin } from '@react-oauth/google';

import { useAuth } from '../context/AuthContext';

const GoogleSignIn = () => {
  const { login } = useAuth();
  const handleSuccess = async (credentialResponse) => {
    // Send the Google OAuth token to your Django backend
    const res = await fetch('http://localhost:8000/auth/social/google/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: credentialResponse.credential }),
    });

    if (!res.ok) {
      throw new Error('Failed to authenticate with Google');
    }
    
    const data = await res.json();
    console.log('JWT Token:', data.token);  // Log the JWT token

    login(data.token);
};

const handleError = () => {
    console.error('Google Sign-In Error');
  };

  return (
    <GoogleLogin
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
      scope="profile email"
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
};

export default GoogleSignIn;
