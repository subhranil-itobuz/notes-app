import React, { useState } from 'react'

const AuthContext = React.createContext()

const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'))
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'))
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'))
  const [role, setRole] = useState(localStorage.getItem('role'))


  const loginFunction = (role) => {
    setIsLoggedIn(true)
    localStorage.setItem('isLoggedIn', true)
    localStorage.setItem('role', role)
    setRole(role)
  }
  const logoutFunction = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('role')
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
    <AuthContext.Provider value={{
      isLoggedIn,
      role,
      loginFunction,
      logoutFunction,
      tokenSetFunction,
      accessToken,
      tokenRemoveFunction,
      refreshToken
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }