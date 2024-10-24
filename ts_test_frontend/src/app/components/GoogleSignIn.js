'use client';

import { GoogleLogin } from '@react-oauth/google';

import { useAuth } from '../context/AuthContext';
import { googleLoginUser } from '../utils/services/auth.service';

const GoogleSignIn = () => {
  const { login } = useAuth();
  const handleSuccess = async (credentialResponse) => {
    // Send the Google OAuth token to ts-backend
    const response = await googleLoginUser({ token: credentialResponse.credential })
    
    if (response.status >= 200 && response.status < 300) {
      console.log('Google signin success!');
    } else {
      throw new Error('Failed to authenticate with Google');
    }
    
    const data = response.data;

    login(data.access);
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
