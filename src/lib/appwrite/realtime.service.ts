/**
 * Realtime Service
 * Handles realtime subscriptions with Appwrite
 */

import { client } from './client';
import { appwriteConfig } from './config';
import type { Models, RealtimeResponseEvent } from 'appwrite';

export type RealtimeCallback = (payload: RealtimeResponseEvent<any>) => void;

export class RealtimeService {
  /**
   * Subscribe to credential updates
   */
  subscribeToCredentials(callback: RealtimeCallback) {
    const channel = `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.collections.credentials}.documents`;
    
    return client.subscribe(channel, callback);
  }

  /**
   * Subscribe to specific credential
   */
  subscribeToCredential(credentialId: string, callback: RealtimeCallback) {
    const channel = `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.collections.credentials}.documents.${credentialId}`;
    
    return client.subscribe(channel, callback);
  }

  /**
   * Subscribe to endorsements
   */
  subscribeToEndorsements(callback: RealtimeCallback) {
    const channel = `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.collections.endorsements}.documents`;
    
    return client.subscribe(channel, callback);
  }

  /**
   * Subscribe to profile updates
   */
  subscribeToProfile(userId: string, callback: RealtimeCallback) {
    const channel = `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.collections.profiles}.documents`;
    
    return client.subscribe(channel, callback);
  }

  /**
   * Subscribe to flagged credentials (admin)
   */
  subscribeToFlaggedCredentials(callback: RealtimeCallback) {
    const channel = `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.collections.flaggedCredentials}.documents`;
    
    return client.subscribe(channel, callback);
  }
}

export const realtimeService = new RealtimeService();
