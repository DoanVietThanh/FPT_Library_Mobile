import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '~/types/models'

type AuthProviderProps = {
  children: React.ReactNode
}

type AuthContextType = {
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>

  isLoading: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // getCurrentUser()
    //   .then((res) => {
    //     if (res) {
    //       setIsLoggedIn(true)
    //       setUser(res)
    //     } else {
    //       setIsLoggedIn(false)
    //       setUser(null)
    //     }
    //   })
    //   .finally(() => {
    //     setIsLoading(false)
    //   })
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, isLoading }}>
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
