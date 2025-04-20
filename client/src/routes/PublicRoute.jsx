import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Skeleton } from '@/components/ui/skeleton';

export default function PublicRoute() {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  if (isLoading) return <Skeleton className="w-full h-screen" />;
  return !isAuthenticated ? <Outlet /> : <Navigate to="/admin/dashboard" replace />;
}
