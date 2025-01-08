'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { socket } from '~/lib/socket'
import { Socket } from 'socket.io-client'

import { useAuth } from './auth-provider'

type SocketProviderProps = {
  children: React.ReactNode
}

type SocketContextType = {
  socket: Socket
  authenticated: boolean
}

export const SocketContext = createContext<SocketContextType | null>(null)

const SocketProvider = ({ children }: SocketProviderProps) => {
  const { accessToken } = useAuth()
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    console.log('SocketProvider')
    console.log(socket)
  }, [])

  useEffect(() => {
    socket.emit('message', 'Hello from client ' + socket.id)
  }, [])

  useEffect(() => {
    socket.on('authenticated', () => {
      setAuthenticated(true)
      console.log('Authenticated socket')
    })

    return () => {
      socket.off('authenticated')
    }
  }, [])

  useEffect(() => {
    if (!accessToken) return
    socket.emit('authenticate', accessToken)
  }, [accessToken])

  return (
    <SocketContext.Provider value={{ socket, authenticated }}>{children}</SocketContext.Provider>
  )
}

export default SocketProvider

export const useSocket = () => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context
}
