import { io } from 'socket.io-client'

export const socket = io(process.env.EXPO_PUBLIC_SCANNER_SOCKET_URL)
