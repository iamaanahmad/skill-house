/**
 * Authentication Service
 * Handles all authentication-related operations with Appwrite
 */

import { ID, Models } from 'appwrite';
import { account } from './client';

export interface CreateUserParams {
  email: string;
  password: string;
  name: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export class AuthService {
  /**
   * Create a new user account
   */
  async createAccount({ email, password, name }: CreateUserParams) {
    try {
      // Check if there's an existing session and delete it
      const existingUser = await this.getCurrentUser();
      if (existingUser) {
        console.log('Active session detected, logging out first');
        await this.logout();
      }
      
      const newAccount = await account.create(ID.unique(), email, password, name);
      
      if (newAccount) {
        // Automatically log in the user after account creation
        return await this.login({ email, password });
      }
      
      return newAccount;
    } catch (error) {
      console.error('Error creating account:', error);
      throw error;
    }
  }

  /**
   * Login with email and password
   */
  async login({ email, password }: LoginParams) {
    try {
      // Check if there's an existing session and delete it
      const existingUser = await this.getCurrentUser();
      if (existingUser) {
        console.log('Active session detected, logging out first');
        await this.logout();
      }
      
      const session = await account.createEmailPasswordSession(email, password);
      return session;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }

  /**
   * Get current logged-in user
   */
  async getCurrentUser(): Promise<Models.User<Models.Preferences> | null> {
    try {
      const user = await account.get();
      return user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  /**
   * Logout current user
   */
  async logout() {
    try {
      await account.deleteSession('current');
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    try {
      const user = await this.getCurrentUser();
      return !!user;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get user session
   */
  async getSession() {
    try {
      return await account.getSession('current');
    } catch (error) {
      console.error('Error getting session:', error);
      return null;
    }
  }

  /**
   * Create OAuth2 session (for social login)
   */
  async createOAuth2Session(provider: string, successUrl?: string, failureUrl?: string) {
    try {
      // Check if there's an existing session and delete it
      const existingUser = await this.getCurrentUser();
      if (existingUser) {
        console.log('Active session detected, logging out first');
        await this.logout();
      }
      
      const success = successUrl || `${window.location.origin}/auth/callback`;
      const failure = failureUrl || `${window.location.origin}/auth?error=oauth_failed`;
      
      account.createOAuth2Session(
        provider as any,
        success,
        failure
      );
    } catch (error) {
      console.error('Error creating OAuth2 session:', error);
      throw error;
    }
  }

  /**
   * Send password recovery email
   */
  async sendPasswordRecovery(email: string) {
    try {
      const resetUrl = `${window.location.origin}/reset-password`;
      return await account.createRecovery(email, resetUrl);
    } catch (error) {
      console.error('Error sending password recovery:', error);
      throw error;
    }
  }

  /**
   * Complete password recovery
   */
  async completePasswordRecovery(userId: string, secret: string, password: string) {
    try {
      return await account.updateRecovery(userId, secret, password);
    } catch (error) {
      console.error('Error completing password recovery:', error);
      throw error;
    }
  }
}

export const authService = new AuthService();
