/**
 * Authentication Context
 * Provides authentication state and methods throughout the app
 */

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Models } from 'appwrite';
import { authService, databaseService, Profile } from '@/lib/appwrite';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: Models.User<Models.Preferences> | null;
  profile: Profile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithOAuth: (provider: string) => void;
  isAuthenticated: boolean;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setLoading(true);
      const currentUser = await authService.getCurrentUser();
      
      if (currentUser) {
        setUser(currentUser);
        console.log('User found:', currentUser);
        // Get or create profile
        let userProfile = await databaseService.getProfileByUserId(currentUser.$id);
        if (!userProfile) {
          console.log('Creating profile for user:', currentUser.$id);
          // Create profile for new user (OAuth or otherwise)
          const username = currentUser.email?.split('@')[0] || `user${currentUser.$id.slice(0, 8)}`;
          userProfile = await databaseService.createProfile({
            userId: currentUser.$id,
            name: currentUser.name || currentUser.email?.split('@')[0] || 'Anonymous',
            username,
            bio: '',
            avatarUrl: '',
            socialLinks: [],
          });
          console.log('Profile created:', userProfile);
        } else {
          console.log('Profile found:', userProfile);
        }
        setProfile(userProfile);
      } else {
        console.log('No user found');
        setUser(null);
        setProfile(null);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      setUser(null);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await authService.login({ email, password });
      await checkAuth();
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string, username: string) => {
    try {
      // Create account
      await authService.createAccount({ email, password, name });
      
      // Get the newly created user
      const newUser = await authService.getCurrentUser();
      
      if (newUser) {
        // Create profile
        const newProfile = await databaseService.createProfile({
          userId: newUser.$id,
          name,
          username,
          bio: '',
          avatarUrl: '',
          socialLinks: [],
        });
        
        setUser(newUser);
        setProfile(newProfile);
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setProfile(null);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const loginWithOAuth = (provider: string) => {
    authService.createOAuth2Session(provider);
  };

  const refreshProfile = async () => {
    if (user) {
      const updatedProfile = await databaseService.getProfileByUserId(user.$id);
      if (updatedProfile) {
        setProfile(updatedProfile);
      }
    }
  };

  const value: AuthContextType = {
    user,
    profile,
    loading,
    login,
    signup,
    logout,
    loginWithOAuth,
    isAuthenticated: !!user,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
