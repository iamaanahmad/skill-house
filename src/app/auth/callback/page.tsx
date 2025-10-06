'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { GraduationCap } from 'lucide-react';

/**
 * OAuth Callback Page
 * Handles redirects from OAuth providers (GitHub, Google, etc.)
 */
export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, loading, user, profile } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Check for error in URL params
        const errorParam = searchParams.get('error');
        if (errorParam) {
          setError('OAuth authentication failed. Please try again.');
          setStatus('error');
          setTimeout(() => router.push('/auth'), 3000);
          return;
        }

        // Wait for auth context to update
        if (loading) {
          setStatus('loading');
          return;
        }

        if (isAuthenticated && user) {
          console.log('OAuth callback: User authenticated', user);
          
          // Check if profile was created
          if (profile) {
            console.log('OAuth callback: Profile exists', profile);
            setStatus('success');
            // Redirect to dashboard after a short delay
            setTimeout(() => router.push('/dashboard'), 1000);
          } else {
            console.log('OAuth callback: Waiting for profile creation');
            // Profile is being created, wait a bit more
            setTimeout(() => {
              if (!profile) {
                setError('Profile creation is taking longer than expected. Redirecting...');
                setStatus('error');
                setTimeout(() => router.push('/dashboard'), 2000);
              }
            }, 2000);
          }
        } else if (!loading && !isAuthenticated) {
          // Not authenticated after loading complete
          setError('Authentication failed. Please try again.');
          setStatus('error');
          setTimeout(() => router.push('/auth'), 3000);
        }
      } catch (err) {
        console.error('OAuth callback error:', err);
        setError('An unexpected error occurred. Redirecting to login...');
        setStatus('error');
        setTimeout(() => router.push('/auth'), 3000);
      }
    };

    handleCallback();
  }, [loading, isAuthenticated, user, profile, router, searchParams]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <GraduationCap className="h-16 w-16 text-primary" />
        </div>
        
        {status === 'loading' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Completing Sign In...</h2>
              <p className="text-muted-foreground">
                Please wait while we set up your account.
              </p>
            </div>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="flex justify-center">
              <div className="rounded-full bg-green-500/20 p-3">
                <svg
                  className="h-12 w-12 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Success!</h2>
              <p className="text-muted-foreground">
                Redirecting to your dashboard...
              </p>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="flex justify-center">
              <div className="rounded-full bg-red-500/20 p-3">
                <svg
                  className="h-12 w-12 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Authentication Error</h2>
              <p className="text-muted-foreground">{error}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
