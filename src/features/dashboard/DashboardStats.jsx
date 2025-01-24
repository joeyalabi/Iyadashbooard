const DashboardStats = ({ title, value, icon, color }) => {
  return (
    <div className={`${color} p-6 rounded-xl shadow-sm`}>
      <div className="flex items-center gap-4">
        <div className="bg-white p-3 rounded-full shadow-sm">
          <span className="text-2xl">{icon}</span>
        </div>
        <div>
          <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
          <p className="text-2xl font-bold text-blue-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;