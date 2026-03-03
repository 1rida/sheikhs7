'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const checkAuth = useCallback(() => {
    const token = Cookies.get('admin_token') || localStorage.getItem('admin_token');
    setIsLoggedIn(!!token);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = (token: string) => {
    Cookies.set('admin_token', token, { expires: 7, path: '/' });
    localStorage.setItem('admin_token', token);
    setIsLoggedIn(true);
    router.push('/admin');
  };

  const logout = useCallback(() => {
    Cookies.remove('admin_token', { path: '/' });
    localStorage.removeItem('admin_token');
    setIsLoggedIn(false);
    router.push('/admin-login');
  }, [router]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
