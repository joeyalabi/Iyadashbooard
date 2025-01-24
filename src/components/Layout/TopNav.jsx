import { FiBell, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../features/auth/AuthContext';

const TopNav = () => {
  const { user, logout } = useAuth();

  return (
    <div className="bg-white shadow-sm p-4 flex justify-between items-center">
      <div className="flex-1"></div> {/* Spacer */}
      
      <div className="flex items-center gap-6">
        <button className="text-blue-600 hover:text-blue-800">
          <FiBell className="w-6 h-6" />
        </button>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-medium">
              {user?.name?.[0] || 'A'}
            </span>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-2 text-red-600 hover:text-red-800"
          >
            <FiLogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNav;