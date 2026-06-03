import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  onUnauthorized: () => void;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, onUnauthorized }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-maroon"></div>
      </div>
    );
  }

  if (!user) {
    onUnauthorized();
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
