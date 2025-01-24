import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './features/auth/AuthContext'
import ProtectedRoute from './features/auth/ProtectedRoute'
import Login from './features/auth/Login'
import Dashboard from './features/dashboard/MainDashboard'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transfers" element={<TransfersPage />} />
            <Route path="/kyc" element={<KycPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/vouchers" element={<VouchersPage />} />
            <Route element={<ProtectedRoute requiredRole="admin" />}>
  <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
