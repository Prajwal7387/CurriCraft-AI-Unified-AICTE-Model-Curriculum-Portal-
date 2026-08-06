import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

/**
 * Socket.io client singleton.
 * Phase 1: Basic connection for presence and notifications.
 * Phase 2: Real-time collaboration.
 */
let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
      withCredentials: true,
      transports: ['websocket', 'polling'],
    });
  }
  return socket;
};

export const connectSocket = (userId: string): void => {
  const s = getSocket();
  if (!s.connected) {
    s.connect();
    s.emit('join:user', userId);
    s.emit('presence:online', userId);
  }
};

export const disconnectSocket = (): void => {
  if (socket?.connected) {
    socket.disconnect();
  }
};
