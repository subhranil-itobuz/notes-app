import React, { useState } from 'react'

const AuthContext = React.createContext()

const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'))
  const [accessToken, setAccessToken] = useState('')
  const [refreshToken, setRefreshToken] = useState('')

  const loginFunction = () => {
    setIsLoggedIn(true)
    localStorage.setItem('isLoggedIn', true)
  }
  const logoutFunction = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }

  const tokenSetFunction = (accessToken, refreshToken) => {
    setAccessToken(accessToken)
    localStorage.setItem('accessToken', accessToken)

    setRefreshToken(refreshToken)
    localStorage.setItem('refreshToken', refreshToken)
  }

  const tokenRemoveFunction = () => {
    setAccessToken('')
    setRefreshToken('')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, loginFunction, logoutFunction, tokenSetFunction, accessToken, tokenRemoveFunction, refreshToken }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }