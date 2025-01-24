import { motion } from 'framer-motion'
import DashboardStats from './DashboardStats'
import KycDistributionChart from './KycDistributionChart'
import RecentTransactions from './RecentTransactions'

export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 bg-blue-50 min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-8">Dashboard Overview</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <DashboardStats 
            title="Total Users"
            value="2,548"
            icon="👥"
            color="bg-blue-100"
          />
          <DashboardStats
            title="Active Transactions"
            value="₦ 48.2M"
            icon="💸"
            color="bg-green-100"
          />
          <DashboardStats
            title="Pending KYC"
            value="89"
            icon="📑"
            color="bg-purple-100"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">KYC Tier Distribution</h2>
            <KycDistributionChart />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Recent Transactions</h2>
            <RecentTransactions />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
