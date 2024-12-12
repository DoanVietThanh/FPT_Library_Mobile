'use client'

import React, { createContext, useContext, useEffect, useMemo } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { http } from '~/lib/http'
import { ERoleType } from '~/types/enum'
import { decode } from 'react-native-pure-jwt'

interface DecodedToken {
  email: string
  exp: number
  //...
}

type Token = {
  accessToken: string
  refreshToken: string
}

type CurrentUser = {
  email: string
  firstName: string
  lastName: string
  avatar: string
  role: {
    englishName: string
    vietnameseName: string
    roleType: ERoleType
  }
} | null

type AuthProviderProps = {
  children: React.ReactNode
}

type AuthContextType = {
  getAccessToken: () => string | null
  isLoadingAuth: boolean
  isLoggedIn: boolean
  user: CurrentUser | null
}

export const AuthContext = createContext<AuthContextType | null>(null)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const queryClient = useQueryClient()

  const { data: token, isFetching: isLoadingToken } = useQuery<Token | null>({
    queryKey: ['token'],
    queryFn: async () => await getTokens(),
  })

  const { data: userData, isLoading: isLoadingUser } = useQuery({
    queryKey: ['auth', 'who-am-i', token],
    enabled: !!token,
    queryFn: async () =>
      http
        .get<CurrentUser>('/api/auth/current-user', {
          headers: {
            Authorization: `Bearer ${token?.accessToken}`,
          },
        })
        .then((res) => res.data),
  })

  const user = useMemo(() => {
    if (!userData) return null

    return userData
  }, [userData])

  const getAccessToken = () => {
    return token?.accessToken ?? null
  }

  //refresh token
  useEffect(() => {
    const timer = setInterval(
      () => {
        queryClient.invalidateQueries({
          queryKey: ['token'],
        })
      },
      1000 * 60 * 20,
    )

    return () => {
      clearInterval(timer)
    }
  }, [queryClient])

  return (
    <AuthContext.Provider
      value={{
        getAccessToken,
        isLoadingAuth: isLoadingToken || isLoadingUser,
        user,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}

async function getTokens() {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken')
    const refreshToken = await AsyncStorage.getItem('refreshToken')

    if (!refreshToken || !accessToken) {
      throw new Error('Missing tokens')
    }

    if (!(await isTokenExpiringSoon(accessToken))) {
      return { accessToken, refreshToken }
    }

    //need to refresh token
    const { data } = await http.post<{
      accessToken: string
      refreshToken: string
    }>(
      '/api/auth/refresh-token',
      { refreshToken },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    await AsyncStorage.setItem('accessToken', data.accessToken)
    await AsyncStorage.setItem('refreshToken', data.refreshToken)

    return data
  } catch {
    return null
  }
}

async function isTokenExpiringSoon(token: string) {
  try {
    // Decode token để lấy payload
    const decoded = await verifyToken(token)

    if (!decoded?.exp) {
      throw new Error('Token không chứa exp')
    }

    // Thời gian hiện tại (tính bằng giây)
    const currentTime = Math.floor(Date.now() / 1000)

    // Thời gian còn lại (tính bằng giây)
    const timeLeft = decoded.exp - currentTime

    // Kiểm tra nếu thời gian hết hạn còn dưới 1 tiếng (3600 giây)
    return timeLeft <= 3600
  } catch {
    //default return true to trigger refresh token
    return true
  }
}

async function verifyToken(token: string) {
  try {
    const verified = await decode(token, process.env.JWT_SECRET_KEY!)

    return verified.payload as DecodedToken
  } catch {
    return null
  }
}
