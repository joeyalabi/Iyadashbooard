import { useEffect, useState } from 'react'
import { useKycApi } from '../../../hooks/useKycManager'
import { FiUserCheck } from 'react-icons/fi'

export default function KycTierManager({ userId }) {
  const { getInfo, updateTier } = useKycApi()
  const [kycInfo, setKycInfo] = useState(null)
  const [selectedTier, setSelectedTier] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const data = await getInfo(userId)
        setKycInfo(data)
        setSelectedTier(data.kyc_tier)
      } catch (error) {
        console.error('Failed to fetch KYC info:', error)
      }
    }
    fetchInfo()
  }, [userId])

  const handleUpdate = async () => {
    setLoading(true)
    try {
      await updateTier(userId, selectedTier)
      setKycInfo({ ...kycInfo, kyc_tier: selectedTier })
    } finally {
      setLoading(false)
    }
  }

  if (!kycInfo) return <div className="animate-pulse h-24 bg-gray-100 rounded-xl" />

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl">
      <div className="flex items-center gap-4 mb-6">
        <FiUserCheck className="w-8 h-8 text-blue-600" />
        <h3 className="text-xl font-semibold text-blue-900">
          {kycInfo.first_name} {kycInfo.last_name}'s KYC Status
        </h3>
      </div>
      
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="flex-1">
          <p className="text-gray-600 mb-2">Current Tier</p>
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full inline-block">
            {kycInfo.kyc_tier.replace('_', ' ')}
          </div>
        </div>

        <div className="flex-1 w-full">
          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="TIER_1">Tier 1 - Basic Verification</option>
            <option value="TIER_2">Tier 2 - Address Verification</option>
            <option value="TIER_3">Tier 3 - Full Biometric</option>
          </select>
        </div>

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            'Update Tier'
          )}
        </button>
      </div>
    </div>
  )
}
