import { motion } from 'framer-motion'
import { useTransferHandler } from '../../../hooks/useTransferHandler'
import { FiArrowRight } from 'react-icons/fi'

export default function SingleTransferForm({ userId }) {
  const {
    formData,
    errors,
    loading,
    handleChange,
    handleSubmit
  } = useTransferHandler(userId)

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white p-6 rounded-2xl shadow-xl"
    >
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Initiate Transfer</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Destination Account</label>
            <input
              type="text"
              name="destinationAccount"
              value={formData.destinationAccount}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0123456789"
            />
            {errors.destinationAccount && (
              <p className="text-red-500 text-sm mt-1">{errors.destinationAccount}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Amount (₦)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="5000"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2">Narration</label>
            <textarea
              name="narration"
              value={formData.narration}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Transfer purpose..."
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <span>Initiate Transfer</span>
              <FiArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </motion.div>
  )
}
