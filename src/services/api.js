import axios from 'axios'
import { toast } from '../utils/notifications'
import { globusRequest } from './globus';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('iyapays_token')}`
  }
})

// Request interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem('iyapays_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    const message = error.response?.data?.error || 'Request failed'
    toast.error(message)
    
    if (error.response?.status === 401) {
      localStorage.removeItem('iyapays_token')
      window.location.href = '/login'
    }
    
    return Promise.reject(error)
  }
)

export default {
  auth: {
    login: (credentials) => api.post('/api/auth/login', credentials)
  },
  users: {
    list: (params) => api.get('/api/users', { params }),
    register: (data) => api.post('/api/users/register', data),
    nameEnquiry: (accountNumber) => 
      api.get(`/api/users/name-enquiry?accountNumber=${accountNumber}`)
  },
  transfers: {
    single: (data) => api.post('/api/transfers/single', data)
  },
  kyc: {
    updateTier: (data) => api.patch('/api/kyc/update-tier', data),
    getInfo: (userId) => api.get(`/api/kyc/user/${userId}`)
  },
  vouchers: {
    redeem: (data) => api.post('/api/vouchers/redeem', data)
  }
  globus: {
    transfer: (data) => globusRequest('POST', '/api/Transfer/singletransfer', data),
    nameEnquiry: (accountNumber) => 
      globusRequest('GET', `/api/accounts/name-enquiry?accountNumber=${accountNumber}`)
  }
}
