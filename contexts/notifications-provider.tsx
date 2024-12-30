import React, { createContext, useContext, useEffect, useState } from 'react'
import { HubConnection } from '@microsoft/signalr'
import { useQueryClient } from '@tanstack/react-query'
import useResetUnread from '~/hooks/notifications/use-reset-unread'
import useUnreadAmount from '~/hooks/notifications/use-unread-amount'
import { connectToSignalR, disconnectSignalR } from '~/lib/signalR'
import {
  offReceiveNotification,
  onReceiveNotification,
} from '~/lib/signalR/receive-notification-signalR'

import { useAuth } from './auth-provider'

type NotificationsProviderProps = {
  children: React.ReactNode
}

type NotificationsContextType = {
  connection: HubConnection | null
  unreadAmount: number
  handleInNotificationsScreen: () => void
}

export const NotificationsContext = createContext<NotificationsContextType | null>(null)

const NotificationsProvider = ({ children }: NotificationsProviderProps) => {
  const { accessToken } = useAuth()
  const [connection, setConnection] = useState<HubConnection | null>(null)
  const { data: unreadAmountData } = useUnreadAmount()
  const [unreadAmount, setUnreadAmount] = useState(0)

  const queryClient = useQueryClient()
  const { mutate: resetUnread } = useResetUnread()

  useEffect(() => {
    if (!accessToken) return

    const connection = connectToSignalR('notificationHub', accessToken)
    setConnection(connection)

    return () => {
      disconnectSignalR(connection)
    }
  }, [accessToken])

  useEffect(() => {
    if (!connection) return

    const callback = () => {
      setUnreadAmount((prev) => prev + 1)
    }

    onReceiveNotification(connection, callback)

    return () => {
      offReceiveNotification(connection, callback)
    }
  }, [connection])

  useEffect(() => {
    setUnreadAmount(unreadAmountData || 0)
  }, [unreadAmountData])

  const handleInNotificationsScreen = () => {
    setUnreadAmount(0)
    resetUnread(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['unread-notifications-amount'],
        })
      },
    })
  }

  return (
    <NotificationsContext.Provider
      value={{ connection, unreadAmount, handleInNotificationsScreen }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}

export default NotificationsProvider

export const useNotifications = () => {
  const context = useContext(NotificationsContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider')
  }
  return context
}
