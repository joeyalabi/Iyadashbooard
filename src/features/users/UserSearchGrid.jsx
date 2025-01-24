import { useState, useEffect } from 'react'
import { useUserApi } from '../../../hooks/useUserManager'
import { FiSearch, FiUserPlus } from 'react-icons/fi'

export default function UserSearchGrid() {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const { fetchUsers } = useUserApi()

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true)
      try {
        const data = await fetchUsers({ search: searchTerm })
        setUsers(data)
      } finally {
        setLoading(false)
      }
    }
    const timer = setTimeout(() => loadUsers(), 500)
    return () => clearTimeout(timer)
  }, [searchTerm])

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name, email, or phone..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
            <FiUserPlus className="w-5 h-5" />
            Add New User
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-6 py-4 text-left text-blue-900">Name</th>
              <th className="px-6 py-4 text-left text-blue-900">Email</th>
              <th className="px-6 py-4 text-left text-blue-900">Phone</th>
              <th className="px-6 py-4 text-left text-blue-900">KYC Tier</th>
              <th className="px-6 py-4 text-left text-blue-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4">{user.first_name} {user.last_name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {user.kyc_tier}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 transition">
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
