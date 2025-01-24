import { FiAlertTriangle, FiCheckCircle } from 'react-icons/fi'

const StatusBadge = ({ status }) => {
  const statusMap = {
    PENDING: { color: 'bg-yellow-100 text-yellow-800', icon: FiAlertTriangle },
    SUCCESS: { color: 'bg-green-100 text-green-800', icon: FiCheckCircle },
    FAILED: { color: 'bg-red-100 text-red-800', icon: FiAlertTriangle }
  }

  const StatusIcon = statusMap[status].icon

  return (
    <div className={`${statusMap[status].color} px-3 py-1 rounded-full flex items-center gap-2 w-fit`}>
      <StatusIcon className="w-4 h-4" />
      <span className="text-sm">{status}</span>
    </div>
  )
}

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const { data } = await api.transactions.list()
        setTransactions(data)
      } finally {
        setLoading(false)
      }
    }
    loadTransactions()
  }, [])

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-xl font-semibold text-blue-900">Transaction History</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-6 py-4 text-left text-blue-900">Date</th>
              <th className="px-6 py-4 text-left text-blue-900">Description</th>
              <th className="px-6 py-4 text-left text-blue-900">Amount</th>
              <th className="px-6 py-4 text-left text-blue-900">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4">{new Date(txn.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4">{txn.narration}</td>
                <td className="px-6 py-4 font-medium">₦{parseFloat(txn.amount).toLocaleString()}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={txn.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
