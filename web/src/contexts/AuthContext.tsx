import { createContext, ReactNode, useEffect, useState } from 'react'
import { parseCookies, setCookie } from 'nookies'

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../services/firebase'
import { api } from '../lib/axios'

export interface AuthContextDataProps {
  userIsAuthenticated: boolean

  signInWithGoogle: () => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthProvider({ children }: AuthProviderProps) {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false)

  useEffect(() => {
    const { 'copa.token': tokenB } = parseCookies()

    if (tokenB) {
      setUserIsAuthenticated(true)
    }
  }, [])

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider()

    try {
      const res: any = await signInWithPopup(auth, provider)
      const access_token = res._tokenResponse.oauthAccessToken

      const token = await api.post('/users', { access_token })

      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${token.data.token}`

      setCookie(undefined, 'copa.token', token.data.token, {
        maxAge: 60 * 60 * 24 * 7 // uma semana
      })

      setUserIsAuthenticated(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{ userIsAuthenticated, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}
