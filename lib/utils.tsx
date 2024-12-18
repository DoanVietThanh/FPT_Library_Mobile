import { clsx, type ClassValue } from 'clsx'
import { jwtDecode } from 'jwt-decode'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isTokenExpired(token: string): boolean {
  try {
    // Decode the token to get the payload
    const decoded = jwtDecode(token)

    // Check if `exp` exists in the payload
    if (!decoded.exp) {
      throw new Error('Token does not have an expiration date (exp).')
    }

    // Get the current timestamp (in seconds)
    const currentTimestamp = Math.floor(Date.now() / 1000)

    // Check if the token is expired
    return decoded.exp < currentTimestamp
  } catch {
    return true
  }
}
