import { motion } from 'framer-motion'
import { FiGift } from 'react-icons/fi'
import { useVoucherHandler } from '../../../hooks/useVoucherHandler'

export default function VoucherRedeemForm() {
  const {
    formData,
    errors,
    loading,
    handleChange,
    handleSubmit
  } = useVoucherHandler()

  return (
    <motion.div
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      className="bg-white p-6 rounded-2xl shadow-xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <FiGift className="w-7 h-7 text-blue-600" />
        <h2 className="text-2xl font-bold text-blue-900">Redeem Voucher</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Voucher Code</label>
            <input
              type="text"
              name="voucherCode"
              value={formData.voucherCode}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="XXXX-XXXX-XXXX"
            />
            {errors.voucherCode && (
              <p className="text-red-500 text-sm mt-1">{errors.voucherCode}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Redeem Amount (₦)</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">₦</span>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
            )}
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
            'Redeem Voucher'
          )}
        </button>
      </form>
    </motion.div>
  )
}
