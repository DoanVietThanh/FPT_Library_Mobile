import { clsx, type ClassValue } from 'clsx'
import { jwtDecode } from 'jwt-decode'
import queryString from 'query-string'
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

export const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export function isImageLinkValid(link: string): boolean {
  try {
    const url = new URL(link)
    const imageUrlRegex = /\.(jpeg|jpg|gif|png)$/i
    return url.protocol === 'https:' && imageUrlRegex.test(url.pathname)
  } catch {
    return false
  }
}

export function splitCamelCase(text: string): string {
  return text.replace(/([a-z])([A-Z])/g, '$1 $2')
}

export function formUrlQuery({
  params,
  updates,
  url,
}: {
  params: string
  updates: Record<string, string | (string | null)[] | null>
  url: string
}) {
  const query = queryString.parse(params)

  Object.keys(updates).forEach((key) => {
    query[key] = updates[key]
  })

  return queryString.stringifyUrl(
    {
      url: url || '',
      query,
    },
    { skipNull: true },
  )
}
