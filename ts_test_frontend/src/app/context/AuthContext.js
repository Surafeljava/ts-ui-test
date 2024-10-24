'use client'

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { getUserDetails } from '../utils/services/auth.service';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if(isAuthenticated){
      getUserDetails().then((res) => {
        setUserData(res.data);
      }).catch((e) => {
        console.log(e);
      })
    }
  }, [isAuthenticated])

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    Cookies.set('token', token);
    setIsAuthenticated(true);
    router.push('/');
  };

  const logout = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
    // router.push('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);