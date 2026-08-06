import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '@/store';
import { setCredentials, logout as logoutAction, setUser, setLoading } from '@/store/slices/authSlice';
import { authApi } from '@/services/auth.service';
import { connectSocket, disconnectSocket } from '@/lib/socket';
import { useCallback } from 'react';

/**
 * Custom hook for authentication operations.
 * Wraps Redux actions and API calls into a clean interface.
 */
export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, accessToken } = useSelector(
    (state: RootState) => state.auth
  );

  const login = useCallback(async (email: string, password: string) => {
    const { data } = await authApi.login({ email, password });
    const { accessToken, refreshToken, user } = data.data;
    dispatch(setCredentials({ user, accessToken, refreshToken }));
    connectSocket(user._id || user.id);
    navigate('/dashboard');
  }, [dispatch, navigate]);

  const register = useCallback(async (payload: Parameters<typeof authApi.register>[0]) => {
    const { data } = await authApi.register(payload);
    return data;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // Ignore errors — still logout locally
    }
    disconnectSocket();
    dispatch(logoutAction());
    navigate('/login');
  }, [dispatch, navigate]);

  const checkAuth = useCallback(async () => {
    if (!accessToken) {
      dispatch(setLoading(false));
      return;
    }
    try {
      const { data } = await authApi.getProfile();
      dispatch(setUser(data.data.user));
      connectSocket(data.data.user._id || data.data.user.id);
    } catch {
      dispatch(logoutAction());
    }
  }, [accessToken, dispatch]);

  const hasPermission = useCallback(
    (permission: string) => {
      return user?.role?.permissions?.includes(permission) ?? false;
    },
    [user]
  );

  const hasRole = useCallback(
    (roleName: string) => {
      return user?.role?.name === roleName;
    },
    [user]
  );

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    checkAuth,
    hasPermission,
    hasRole,
  };
};
