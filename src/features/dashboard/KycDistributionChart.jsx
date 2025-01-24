import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useKycApi } from '../../hooks/useKycManager';

const COLORS = ['#3B82F6', '#60A5FA', '#93C5FD'];

const KycDistributionChart = () => {
  const { tiers, getKycInfo } = useKycApi();
  const [kycData, setKycData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Example data - replace with actual API call
        const mockData = tiers.map(tier => ({
          name: tier.replace('_', ' '),
          value: Math.floor(Math.random() * 100) + 20
        }));
        setKycData(mockData);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="h-64 bg-white p-4 rounded-xl shadow-lg">
      <h3 className="text-blue-900 font-semibold mb-4">KYC Tier Distribution</h3>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={kycData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {kycData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default KycDistributionChart;