/**
 * Appwrite Configuration
 * Central configuration for all Appwrite services
 */

// Provide fallback values for build time
const getEnvVar = (key: string, fallback: string = '') => {
  return process.env[key] || fallback;
};

export const appwriteConfig = {
  endpoint: getEnvVar('NEXT_PUBLIC_APPWRITE_ENDPOINT', 'https://cloud.appwrite.io/v1'),
  projectId: getEnvVar('NEXT_PUBLIC_APPWRITE_PROJECT_ID', 'skillhouse'),
  databaseId: getEnvVar('NEXT_PUBLIC_APPWRITE_DATABASE_ID', 'skillhouse'),
  collections: {
    profiles: getEnvVar('NEXT_PUBLIC_APPWRITE_PROFILES_COLLECTION_ID', 'profiles'),
    credentials: getEnvVar('NEXT_PUBLIC_APPWRITE_CREDENTIALS_COLLECTION_ID', 'credentials'),
    endorsements: getEnvVar('NEXT_PUBLIC_APPWRITE_ENDORSEMENTS_COLLECTION_ID', 'endorsements'),
    flaggedCredentials: getEnvVar('NEXT_PUBLIC_APPWRITE_FLAGGED_COLLECTION_ID', 'flagged_credentials'),
  },
  buckets: {
    avatars: getEnvVar('NEXT_PUBLIC_APPWRITE_AVATARS_BUCKET_ID', 'user-avatars'),
    evidence: getEnvVar('NEXT_PUBLIC_APPWRITE_EVIDENCE_BUCKET_ID', 'evidence-files'),
  },
};

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002';
