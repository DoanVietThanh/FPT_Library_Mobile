import { ENotificationType } from './enum'

export type User = {
  userId: string
  email: string
  firstName: string
  lastName: string
  dob: string
  phone: string
  avatar: string
  isActive: boolean
}

export type Notification = {
  notificationId: number
  title: string
  message: string
  isPublic: boolean
  createDate: Date
  createdBy: string
  notificationType: ENotificationType
  notificationRecipients: []
}
