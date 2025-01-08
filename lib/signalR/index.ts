// src/services/signalRService.ts

import * as signalR from '@microsoft/signalr'

export const connectToSignalR = (hubName: string, token: string) => {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl(`${process.env.EXPO_PUBLIC_API_ENDPOINT}/${hubName}`, {
      accessTokenFactory: () => token,
    }) // Pass userId as query string
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information) // Optional: logging
    .build()

  connection
    .start()
    .then(() => {
      // console.log('SignalR Connected.')
    })
    .catch((err) => console.error('SignalR Connection Error: ', err))

  connection.onreconnected(() => {
    // console.log('SignalR Reconnected.')
  })
  connection.onclose(() => console.warn('SignalR Disconnected.'))

  return connection
}

export const disconnectSignalR = (connection: signalR.HubConnection) => {
  if (connection) {
    connection.stop().then(() => console.log('SignalR Disconnected.'))
  }
}
