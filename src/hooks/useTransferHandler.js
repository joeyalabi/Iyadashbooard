import { useState } from 'react'
import api from '../services/api'
import { validateTransfer } from '../utils/validators'

export const useTransferHandler = (userId) => {
  const [formData, setFormData] = useState({
    userId,
    destinationAccount: '',
    amount: '',
    narration: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateTransfer(formData)
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    try {
      await api.transfers.single(formData)
      setFormData({
        userId,
        destinationAccount: '',
        amount: '',
        narration: ''
      })
      api.utils.notifySuccess('Transfer initiated successfully')
    } finally {
      setLoading(false)
    }
  }

  return {
    formData,
    errors,
    loading,
    handleChange,
    handleSubmit
  }
}
