/**
 * Appwrite Configuration
 * Central configuration for all Appwrite services
 */

export const appwriteConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1',
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '68e0b33700078b078177',
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'skillhouse',
  collections: {
    profiles: process.env.NEXT_PUBLIC_APPWRITE_PROFILES_COLLECTION_ID || 'profiles',
    credentials: process.env.NEXT_PUBLIC_APPWRITE_CREDENTIALS_COLLECTION_ID || 'credentials',
    endorsements: process.env.NEXT_PUBLIC_APPWRITE_ENDORSEMENTS_COLLECTION_ID || 'endorsements',
    flaggedCredentials: process.env.NEXT_PUBLIC_APPWRITE_FLAGGED_COLLECTION_ID || 'flagged_credentials',
  },
  buckets: {
    avatars: process.env.NEXT_PUBLIC_APPWRITE_AVATARS_BUCKET_ID || 'user-avatars',
    evidence: process.env.NEXT_PUBLIC_APPWRITE_EVIDENCE_BUCKET_ID || 'evidence-files',
  },
};

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002';
