import { NavLink } from 'react-router-dom';
import { FiUsers, FiActivity, FiDollarSign } from 'react-icons/fi';

const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-900 text-white h-screen p-4 shadow-xl">
      <h1 className="text-2xl font-bold mb-8 text-blue-200">Iyapays Admin</h1>
      <nav className="space-y-2">
        {[
          { to: '/', icon: <FiActivity />, text: 'Dashboard' },
          { to: '/users', icon: <FiUsers />, text: 'Users' },
          { to: '/transfers', icon: <FiDollarSign />, text: 'Transfers' },
        ].map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => 
              `flex items-center p-3 rounded-lg transition-all hover:bg-blue-800 ${
                isActive ? 'bg-blue-700' : ''
              }`
            }
          >
            <span className="mr-3">{link.icon}</span>
            {link.text}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;