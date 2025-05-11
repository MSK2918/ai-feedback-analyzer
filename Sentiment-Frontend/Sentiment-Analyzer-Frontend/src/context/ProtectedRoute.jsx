import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuthStore} from './authStore';


export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [loading, isAuthenticated, navigate]);

  return children;
}


