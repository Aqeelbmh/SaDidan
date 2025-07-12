'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie.includes('adminToken=authenticated');
    setIsAuthenticated(token);
    setLoading(false);

    // Redirect to login if not authenticated and not already on /admin/login
    if (!token && typeof window !== 'undefined' && window.location.pathname !== '/admin/login') {
      router.replace('/admin/login');
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (!isAuthenticated && typeof window !== 'undefined' && window.location.pathname !== '/admin/login') {
    return null; // Prevents flash of admin content
  }

  return <>{children}</>;
};

export default AuthWrapper; 