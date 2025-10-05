/**
 * Appwrite Client Setup
 * Initialize Appwrite services for client-side usage
 */

import { Client, Account, Databases, Storage } from 'appwrite';
import { appwriteConfig } from './config';

// Create and configure the Appwrite client
const client = new Client();

// Only set endpoint and project if they are available (not during build time)
if (appwriteConfig.endpoint && appwriteConfig.projectId) {
  client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId);
}

// Initialize Appwrite services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export { client };
