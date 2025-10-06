/**
 * Custom Hooks for Appwrite Services
 */

'use client';

import { useState, useEffect } from 'react';
import { 
  databaseService, 
  realtimeService,
  type Credential, 
  type Profile 
} from '@/lib/appwrite';
import { useAuth } from '@/contexts/auth-context';

/**
 * Hook to fetch and manage user credentials
 */
export function useCredentials(userId?: string) {
  const { user } = useAuth();
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const targetUserId = userId || user?.$id;

  useEffect(() => {
    if (!targetUserId) {
      setLoading(false);
      return;
    }

    let unsubscribe: (() => void) | undefined;

    const fetchCredentials = async () => {
      try {
        setLoading(true);
        const data = await databaseService.getCredentialsByUserId(targetUserId);
        setCredentials(data);
        setError(null);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching credentials:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCredentials();

    // Subscribe to realtime updates
    unsubscribe = realtimeService.subscribeToCredentials((response) => {
      if (response.events.includes('databases.*.collections.*.documents.*')) {
        // Refetch credentials when there's an update
        fetchCredentials();
      }
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [targetUserId]);

  return { credentials, loading, error, refetch: () => {
    if (targetUserId) {
      databaseService.getCredentialsByUserId(targetUserId).then(setCredentials);
    }
  }};
}

/**
 * Hook to fetch all verified credentials (for discover page)
 */
export function useAllCredentials() {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [useMockData, setUseMockData] = useState(false);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const fetchCredentials = async () => {
      try {
        setLoading(true);
        const data = await databaseService.getAllVerifiedCredentials();
        
        // Use mock data if no real credentials exist
        if (data.length === 0) {
          const { mockCredentials } = await import('@/lib/mock-credentials');
          setCredentials(mockCredentials);
          setUseMockData(true);
        } else {
          setCredentials(data);
          setUseMockData(false);
        }
        setError(null);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching all credentials:', err);
        // Fallback to mock data on error
        const { mockCredentials } = await import('@/lib/mock-credentials');
        setCredentials(mockCredentials);
        setUseMockData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCredentials();

    // Subscribe to realtime updates
    unsubscribe = realtimeService.subscribeToCredentials((response) => {
      if (response.events.includes('databases.*.collections.*.documents.*')) {
        fetchCredentials();
      }
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return { credentials, loading, error, useMockData };
}

/**
 * Hook to fetch a single credential
 */
export function useCredential(credentialId?: string) {
  const [credential, setCredential] = useState<Credential | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!credentialId) {
      setLoading(false);
      return;
    }

    let unsubscribe: (() => void) | undefined;

    const fetchCredential = async () => {
      try {
        setLoading(true);
        const data = await databaseService.getCredentialById(credentialId);
        setCredential(data);
        setError(null);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching credential:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCredential();

    // Subscribe to realtime updates for this specific credential
    unsubscribe = realtimeService.subscribeToCredential(credentialId, (response) => {
      if (response.events.includes('databases.*.collections.*.documents.*')) {
        fetchCredential();
      }
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [credentialId]);

  return { credential, loading, error };
}

/**
 * Hook to fetch profile by username
 */
export function useProfile(username?: string) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!username) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await databaseService.getProfileByUsername(username);
        setProfile(data);
        setError(null);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  return { profile, loading, error };
}

/**
 * Hook to fetch leaderboard
 */
export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await databaseService.getLeaderboard();
        setLeaderboard(data);
        setError(null);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching leaderboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return { leaderboard, loading, error };
}

/**
 * Hook to check if user has endorsed a credential
 */
export function useHasEndorsed(credentialId?: string) {
  const { user } = useAuth();
  const [hasEndorsed, setHasEndorsed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!credentialId || !user) {
      setLoading(false);
      return;
    }

    const checkEndorsement = async () => {
      try {
        setLoading(true);
        const endorsed = await databaseService.hasUserEndorsed(credentialId, user.$id);
        setHasEndorsed(endorsed);
      } catch (err) {
        console.error('Error checking endorsement:', err);
      } finally {
        setLoading(false);
      }
    };

    checkEndorsement();
  }, [credentialId, user]);

  return { hasEndorsed, loading };
}
