import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../services/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const login = async (credentials) => {
    try {
      const { data } = await loginUser(credentials)
      localStorage.setItem('iyapays_token', data.accessToken)
      setUser(data.user)
      navigate('/')
    } catch (error) {
      throw new Error('Authentication failed')
    }
  }

  const logout = () => {
    localStorage.removeItem('iyapays_token')
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
