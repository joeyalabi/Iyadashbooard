export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(String(email).toLowerCase())
}

export const validateTransfer = (data) => {
  const errors = {}
  if (!data.destinationAccount) errors.destinationAccount = 'Account number required'
  if (!data.amount || data.amount <= 0) errors.amount = 'Valid amount required'
  return errors
}

export const validateKycUpdate = (data) => {
  const errors = {}
  if (!data.userId) errors.userId = 'User ID required'
  if (!data.newTier) errors.newTier = 'Tier selection required'
  return errors
}
