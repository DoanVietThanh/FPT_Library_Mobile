import { ENotificationType } from '~/types/enum'

export type SocketNotification = {
  notificationId: number
  title: string
  message: string
  isPublic: boolean
  timestamp: Date
  notificationType: ENotificationType
}

export const onReceiveNotification = (
  connection: signalR.HubConnection,
  callback: (notification: SocketNotification) => void,
) => {
  if (!connection) throw new Error('Connection is not established.')
  console.log('onReceiveNotification')

  connection.on('ReceiveNotification', callback)
}

export const offReceiveNotification = (
  connection: signalR.HubConnection,
  callback: (notification: SocketNotification) => void,
) => {
  if (!connection) throw new Error('Connection is not established.')
  console.log('offReceiveNotification')

  connection.off('ReceiveNotification', callback)
}
