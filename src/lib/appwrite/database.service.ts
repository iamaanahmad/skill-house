/**
 * Database Service
 * Handles all database operations with Appwrite
 */

import { ID, Query, Models } from 'appwrite';
import { databases } from './client';
import { appwriteConfig } from './config';

export interface Profile {
  $id?: string;
  userId: string;
  name: string;
  username: string;
  avatarUrl?: string;
  bio?: string;
  socialLinks?: string[];
  $createdAt?: string;
  $updatedAt?: string;
}

export interface Credential {
  $id?: string;
  userId: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
  evidence: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'pending' | 'verified' | 'rejected';
  endorsementCount?: number;
  isNft?: boolean;
  $createdAt?: string;
  $updatedAt?: string;
}

export interface Endorsement {
  $id?: string;
  credentialId: string;
  endorserId: string;
  $createdAt?: string;
}

export interface FlaggedCredential {
  $id?: string;
  credentialId: string;
  reason: string;
  reporterId: string;
  status: 'open' | 'resolved' | 'dismissed';
  $createdAt?: string;
  $updatedAt?: string;
}

export class DatabaseService {
  // ==================== PROFILES ====================

  /**
   * Create a new profile
   */
  async createProfile(profile: Profile): Promise<Profile> {
    try {
      const response = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.profiles,
        ID.unique(),
        profile
      );
      return response as unknown as Profile;
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  }

  /**
   * Get profile by user ID
   */
  async getProfileByUserId(userId: string): Promise<Profile | null> {
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.collections.profiles,
        [Query.equal('userId', userId)]
      );
      
      if (response.documents.length > 0) {
        return response.documents[0] as unknown as Profile;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting profile:', error);
      return null;
    }
  }

  /**
   * Get profile by username
   */
  async getProfileByUsername(username: string): Promise<Profile | null> {
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.collections.profiles,
        [Query.equal('username', username)]
      );
      
      if (response.documents.length > 0) {
        return response.documents[0] as unknown as Profile;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting profile by username:', error);
      return null;
    }
  }

  /**
   * Update profile
   */
  async updateProfile(profileId: string, updates: Partial<Profile>): Promise<Profile> {
    try {
      const response = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.profiles,
        profileId,
        updates
      );
      return response as unknown as Profile;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  // ==================== CREDENTIALS ====================

  /**
   * Create a new credential
   */
  async createCredential(credential: Credential): Promise<Credential> {
    try {
      const response = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.credentials,
        ID.unique(),
        credential
      );
      return response as unknown as Credential;
    } catch (error) {
      console.error('Error creating credential:', error);
      throw error;
    }
  }

  /**
   * Get credentials by user ID
   */
  async getCredentialsByUserId(userId: string): Promise<Credential[]> {
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.collections.credentials,
        [
          Query.equal('userId', userId),
          Query.orderDesc('$createdAt')
        ]
      );
      return response.documents as unknown as Credential[];
    } catch (error) {
      console.error('Error getting credentials:', error);
      return [];
    }
  }

  /**
   * Get a single credential by ID
   */
  async getCredentialById(credentialId: string): Promise<Credential | null> {
    try {
      const response = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.credentials,
        credentialId
      );
      return response as unknown as Credential;
    } catch (error) {
      console.error('Error getting credential:', error);
      return null;
    }
  }

  /**
   * Get all verified credentials (for discover page)
   */
  async getAllVerifiedCredentials(limit = 100): Promise<Credential[]> {
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.collections.credentials,
        [
          Query.equal('status', 'verified'),
          Query.orderDesc('$createdAt'),
          Query.limit(limit)
        ]
      );
      return response.documents as unknown as Credential[];
    } catch (error) {
      console.error('Error getting verified credentials:', error);
      return [];
    }
  }

  /**
   * Search credentials by name or description
   */
  async searchCredentials(searchTerm: string): Promise<Credential[]> {
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.collections.credentials,
        [
          Query.equal('status', 'verified'),
          Query.search('name', searchTerm),
          Query.orderDesc('$createdAt')
        ]
      );
      return response.documents as unknown as Credential[];
    } catch (error) {
      console.error('Error searching credentials:', error);
      return [];
    }
  }

  /**
   * Update credential
   */
  async updateCredential(credentialId: string, updates: Partial<Credential>): Promise<Credential> {
    try {
      const response = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.credentials,
        credentialId,
        updates
      );
      return response as unknown as Credential;
    } catch (error) {
      console.error('Error updating credential:', error);
      throw error;
    }
  }

  /**
   * Delete credential
   */
  async deleteCredential(credentialId: string): Promise<void> {
    try {
      await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.credentials,
        credentialId
      );
    } catch (error) {
      console.error('Error deleting credential:', error);
      throw error;
    }
  }

  // ==================== ENDORSEMENTS ====================

  /**
   * Create an endorsement
   */
  async createEndorsement(credentialId: string, endorserId: string): Promise<Endorsement> {
    try {
      // First, create the endorsement
      const endorsement = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.endorsements,
        ID.unique(),
        {
          credentialId,
          endorserId,
        }
      );

      // Then, increment the endorsement count on the credential
      const credential = await this.getCredentialById(credentialId);
      if (credential) {
        await this.updateCredential(credentialId, {
          endorsementCount: (credential.endorsementCount || 0) + 1,
        });
      }

      return endorsement as unknown as Endorsement;
    } catch (error) {
      console.error('Error creating endorsement:', error);
      throw error;
    }
  }

  /**
   * Check if user has endorsed a credential
   */
  async hasUserEndorsed(credentialId: string, userId: string): Promise<boolean> {
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.collections.endorsements,
        [
          Query.equal('credentialId', credentialId),
          Query.equal('endorserId', userId)
        ]
      );
      return response.documents.length > 0;
    } catch (error) {
      console.error('Error checking endorsement:', error);
      return false;
    }
  }

  /**
   * Get endorsements for a credential
   */
  async getEndorsements(credentialId: string): Promise<Endorsement[]> {
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.collections.endorsements,
        [Query.equal('credentialId', credentialId)]
      );
      return response.documents as unknown as Endorsement[];
    } catch (error) {
      console.error('Error getting endorsements:', error);
      return [];
    }
  }

  // ==================== FLAGGED CREDENTIALS ====================

  /**
   * Flag a credential
   */
  async flagCredential(flagged: Omit<FlaggedCredential, '$id'>): Promise<FlaggedCredential> {
    try {
      const response = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.flaggedCredentials,
        ID.unique(),
        flagged
      );
      return response as unknown as FlaggedCredential;
    } catch (error) {
      console.error('Error flagging credential:', error);
      throw error;
    }
  }

  /**
   * Get flagged credentials (admin only)
   */
  async getFlaggedCredentials(status?: 'open' | 'resolved' | 'dismissed'): Promise<FlaggedCredential[]> {
    try {
      const queries = status ? [Query.equal('status', status)] : [];
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.collections.flaggedCredentials,
        queries
      );
      return response.documents as unknown as FlaggedCredential[];
    } catch (error) {
      console.error('Error getting flagged credentials:', error);
      return [];
    }
  }

  /**
   * Update flagged credential status
   */
  async updateFlaggedCredential(flagId: string, status: 'open' | 'resolved' | 'dismissed'): Promise<FlaggedCredential> {
    try {
      const response = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.flaggedCredentials,
        flagId,
        { status }
      );
      return response as unknown as FlaggedCredential;
    } catch (error) {
      console.error('Error updating flagged credential:', error);
      throw error;
    }
  }

  // ==================== LEADERBOARD ====================

  /**
   * Get top users by credential count
   */
  async getLeaderboard(limit = 10) {
    try {
      // Get all profiles
      const profilesResponse = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.collections.profiles
      );

      // Get credentials for each profile
      const leaderboard = await Promise.all(
        profilesResponse.documents.map(async (profile) => {
          const credentials = await this.getCredentialsByUserId(profile.userId);
          const verifiedCount = credentials.filter(c => c.status === 'verified').length;
          const totalEndorsements = credentials.reduce((sum, c) => sum + (c.endorsementCount || 0), 0);
          
          return {
            profile: profile as unknown as Profile,
            credentialCount: verifiedCount,
            endorsementCount: totalEndorsements,
            score: verifiedCount * 10 + totalEndorsements,
          };
        })
      );

      // Sort by score and return top users
      return leaderboard
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
    } catch (error) {
      console.error('Error getting leaderboard:', error);
      return [];
    }
  }
}

export const databaseService = new DatabaseService();
