'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from 'chart.js';
import NavigationLayout from '@/components/NavigationLayout';
import { fetchUserMetrics, fetchUserAgents, fetchDailyMetrics, fetchCurrentUser, type MetricsResponse, type Agent, type DailyMetric, type User } from '@/lib/api';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

export default function Dashboard() {
  const [metrics, setMetrics] = useState<MetricsResponse | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [dailyMetrics, setDailyMetrics] = useState<DailyMetric[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const timeOptions = ['Last day', 'Last 7 days', 'Last 14 days', 'Last 21 days', 'Last 28 days', 'Last month', 'Year till date'];

  const languageDataMap: Record<string, Record<string, number>> = {
    'Last day': {}, // No data
    'Last 7 days': {
      Hindi: 63.2,
      English: 36.8,
    },

    'Last 14 days': {
      English: 48.2,
      Hindi: 51.8,
    },
    'Last 21 days': {
      English: 55,
      Hindi: 45,
    },
    'Last 28 days': {
      English: 50,
      Hindi: 50,
    },
    'Last month': {
      Hindi: 57.9,
      English: 42.1,
    },
    'Year till date': {
      English: 60,
      Hindi: 40,
    },
  };



  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [agentDropdownOpen, setAgentDropdownOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('Last 14 days');
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false);
  const [activeStat, setActiveStat] = useState<string | null>(null);
  const [showAllAgents, setShowAllAgents] = useState(false);

  const getDateRange = (timeOption: string) => {
    const endDate = new Date();
    const startDate = new Date();
    
    switch (timeOption) {
      case 'Last day':
        startDate.setDate(endDate.getDate() - 1);
        break;
      case 'Last 7 days':
        startDate.setDate(endDate.getDate() - 7);
        break;
      case 'Last 14 days':
        startDate.setDate(endDate.getDate() - 14);
        break;
      case 'Last 21 days':
        startDate.setDate(endDate.getDate() - 21);
        break;
      case 'Last 28 days':
        startDate.setDate(endDate.getDate() - 28);
        break;
      case 'Last month':
        startDate.setMonth(endDate.getMonth() - 1);
        break;
      case 'Year till date':
        startDate.setMonth(0, 1); // January 1st of current year
        break;
      default:
        startDate.setDate(endDate.getDate() - 14); // Default to 14 days
    }
    
    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    };
  };


  const agentDropdownRef = useRef<HTMLDivElement>(null);
  const timeDropdownRef = useRef<HTMLDivElement>(null);

  // Initial load to fetch user and agents
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [userData, agentsData] = await Promise.all([
          fetchCurrentUser(),
          fetchUserAgents()
        ]);
        setCurrentUser(userData);
        setAgents(agentsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch initial data');
      }
    };
    
    fetchInitialData();
  }, []);

  // Fetch general metrics when agents are loaded
  useEffect(() => {
    const fetchGeneralMetrics = async () => {
      if (agents.length === 0) return; // Wait for agents to load first
      
      try {
        setLoading(true);
        const metricsData = await fetchUserMetrics();
        setMetrics(metricsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch general metrics');
      } finally {
        setLoading(false);
      }
    };

    fetchGeneralMetrics();
  }, [agents]);

  // Fetch daily metrics (for graphs) when time or agent changes
  useEffect(() => {
    const fetchDailyData = async () => {
      if (agents.length === 0) return; // Wait for agents to load first
      
      try {
        const { startDate, endDate } = getDateRange(selectedTime);
        
        // Find the selected agent ID
        const selectedAgentObj = selectedAgent ? agents.find(agent => agent.name === selectedAgent) : null;
        const selectedAgentId = selectedAgentObj ? selectedAgentObj.agent_id : undefined;
        
        const dailyData = await fetchDailyMetrics(startDate, endDate, selectedAgentId);
        setDailyMetrics(dailyData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch daily metrics');
      }
    };

    fetchDailyData();
  }, [selectedTime, selectedAgent, agents]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (agentDropdownRef.current && !agentDropdownRef.current.contains(event.target as Node)) {
        setAgentDropdownOpen(false);
      }
      if (timeDropdownRef.current && !timeDropdownRef.current.contains(event.target as Node)) {
        setTimeDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredAgents = selectedAgent
    ? agents.filter(agent => agent.name === selectedAgent)
    : agents;

  const getDynamicLabels = () => {
    if (dailyMetrics && dailyMetrics.length > 0) {
      return dailyMetrics.map(metric => {
        const date = new Date(metric.date);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      });
    }
    
    // Fallback labels if no data
    switch (selectedTime) {
      case 'Last day':
        return ['Yesterday', 'Today'];
      case 'Last 7 days':
        return ['7d ago', '6d ago', '5d ago', '4d ago', '3d ago', '2d ago', 'Yesterday'];
      case 'Last 14 days':
        return Array.from({ length: 14 }, (_, i) => `${14-i}d ago`);
      case 'Last 21 days':
        return Array.from({ length: 21 }, (_, i) => `${21-i}d ago`);
      case 'Last 28 days':
        return Array.from({ length: 28 }, (_, i) => `${28-i}d ago`);
      default:
        return Array.from({ length: 14 }, (_, i) => `${14-i}d ago`);
    }
  };


  const labels = getDynamicLabels();

  const generateStatData = () => {
    if (!dailyMetrics || dailyMetrics.length === 0) {
      return Array(labels.length).fill(0);
    }

    switch (activeStat) {
      case 'calls':
        return dailyMetrics.map(metric => metric.total_calls);
      case 'minutes':
        // For average duration, we'll use a placeholder since it's not in the daily API
        // You might want to add average_duration to the daily API response
        return dailyMetrics.map(() => metrics?.average_duration || 0);
      default:
        return dailyMetrics.map(metric => metric.total_calls);
    }
  };

  const lineData = {
    labels,
    datasets: [
      {
        label: {
          calls: 'Number of Calls',
          minutes: 'Average Duration (min)',
          // credits: 'Total Credits',
          // llmCost: 'Total LLM Cost ($)',
          // averageCost: 'Average Cost per Call',
          // averageLlmCost: 'Average LLM Cost per Min',
        }[activeStat || 'calls'] || 'Number of Calls',
        data: generateStatData(),
        fill: false,
        borderColor: '#000',
        tension: 0.3,
      },
    ],
  };

  

  const areaData = {
    labels,
    datasets: [
      {
        label: 'Success Rate',
        data: dailyMetrics && dailyMetrics.length > 0 
          ? dailyMetrics.map(metric => metric.success_rate)
          : Array(labels.length).fill(0),
        backgroundColor: 'rgba(34,197,94,0.6)',
        fill: true,
        borderColor: 'rgba(34,197,94,1)',
        tension: 0.3,
      },
    ],
  };

  const handleStatClick = (stat: string) => {
    setActiveStat(prev => (prev === stat ? null : stat));
  };

  if (loading && agents.length === 0) {
    return (
      <NavigationLayout title="Dashboard" currentPage="/dashboard">
        <div className="p-8 text-center">
          <p>Loading dashboard data...</p>
        </div>
      </NavigationLayout>
    );
  }

  if (error) {
    return (
      <NavigationLayout title="Dashboard" currentPage="/dashboard">
        <div className="p-8 text-center text-red-500">
          <p>Error: {error}</p>
        </div>
      </NavigationLayout>
    );
  }

  // Show create agent message if user has no agents
  if (!loading && agents.length === 0) {
    return (
      <NavigationLayout title="Dashboard" currentPage="/dashboard">
        <div className="p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">No Agents Found</h2>
              <p className="text-gray-600 mb-6">
                Please create an Agent to display the dashboard.
              </p>
              <button
                onClick={() => window.location.href = '/create-agent'}
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md transition-all cursor-pointer"
              >
                Create Your First Agent
              </button>
            </div>
          </div>
        </div>
      </NavigationLayout>
    );
  }

  return (
    <NavigationLayout
    title="Dashboard" 
    currentPage="/dashboard">
     <div className="p-8 text-sm font-sans">
      <div className="flex gap-4 items-center">
        <span className="px-2 py-1 rounded-full text-xs flex items-center gap-2 border rounded-xl">
          <span className="relative flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-black"></span>
          </span>
          Active calls: {metrics?.active_calls ?? 0}
        </span>
    </div>
    <div className="p-8 text-sm font-sans">
      <header className="flex justify-between items-center">
        <div>
          <h5 className="text-gray-500">My Workspace</h5>
          <h2 className="text-3xl font-semibold">Good morning, {currentUser?.name || 'User'}</h2>
        </div>

        <div className="flex gap-4">
          {/* Agent dropdown */}
          {true && (
            <div className="relative" ref={agentDropdownRef}>
              <button
                onClick={() => setAgentDropdownOpen(!agentDropdownOpen)}
                className="border rounded-lg px-4 py-2 flex items-center gap-2 cursor-pointer"
              >
                {selectedAgent || 'All Agents'}
                <svg
                  className={`w-4 h-4 transition-transform ${
                    agentDropdownOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {agentDropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10"
                >
                  <li
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setSelectedAgent(null);
                      setAgentDropdownOpen(false);
                      setActiveStat(null);
                    }}
                  >
                    All Agents
                  </li>
                  {agents.map(agent => (
                    <li
                      key={agent.name}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      onClick={() => {
                        setSelectedAgent(agent.name);
                        setAgentDropdownOpen(false);
                        setActiveStat(null);
                      }}
                    >
                      {agent.name}
                    </li>
                  ))}
                </motion.ul>
              )}
            </div>
          )}

          <div className="relative" ref={timeDropdownRef}>
            <button
              onClick={() => setTimeDropdownOpen(!timeDropdownOpen)}
              className="border rounded-lg px-4 py-2 flex items-center gap-2 cursor-pointer"
            >
              {selectedTime}
              <svg
                className={`w-4 h-4 transition-transform ${
                  timeDropdownOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {timeDropdownOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10"
              >
                {timeOptions.map(option => (
                  <li
                    key={option}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setSelectedTime(option);
                      setTimeDropdownOpen(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </motion.ul>
            )}
          </div>
        </div>
      </header>

      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        {[
          { label: 'Number of calls', key: 'calls' },
          { label: 'Avg Duration', key: 'minutes' },
          // { label: 'Total cost', key: 'credits' },
          // { label: 'Average cost', key: 'averageCost' },
          // { label: 'Total LLM Cost', key: 'llmCost' },
          // { label: 'Average LLM Cost', key: 'averageLlmCost' },
        ].map(stat => {
          const value = (() => {
            if (!metrics) return stat.key === 'minutes' ? '0m 0s' : 0;

            switch (stat.key) {
              case 'calls':
                return metrics.total_calls || 0;
              case 'minutes':
                const avgDuration = metrics.average_duration || 0;
                const mins = Math.floor(avgDuration);
                const secs = Math.round((avgDuration - mins) * 60);
                return `${mins}m ${secs}s`;
              default:
                return 0;
            }
          })();

          return (
            <div
              key={stat.key}
              className={`cursor-pointer px-6 py-3 rounded-xl border shadow-sm transition-all duration-200 flex flex-col items-center text-sm ${
                activeStat === stat.key
                  ? 'bg-black text-white'
                  : 'hover:bg-gray-100 text-black'
              }`}
              onClick={() => handleStatClick(stat.key)}
            >
              <div>{stat.label}</div>
              <div className="font-bold text-lg">{value}</div>
              
            </div>
          );
        })}
      </div>


      {/* 📈 Chart Section */}
      <div className="mt-10 flex gap-6">
        {/* Line Chart */}
        <div className="w-1/2">
          <h3 className="text-xl font-semibold mb-2">
            {activeStat === 'calls' ? 'Number of Calls' : 
             activeStat === 'minutes' ? 'Average Duration' : 
             'Number of Calls'}
          </h3>
          {(!dailyMetrics || dailyMetrics.length === 0) ? (
            <div className="h-[250px] w-full text-center flex flex-col justify-center items-center border border-dashed rounded-xl text-gray-500">
              <h3 className="text-lg font-semibold">No data available</h3>
              <p>No metrics found for the selected period.</p>
            </div>
          ) : (
            <div className="h-[300px] w-full">
              <Line
                data={lineData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                    y: {
                      grid: {
                        color: 'rgba(0,0,0,0.05)',
                      },
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          )}
        </div>

        {/* Area Chart */}
        <div className="w-1/2">
          <h3 className="text-xl font-semibold mb-2">Overall Success Rate</h3>
          {(!dailyMetrics || dailyMetrics.length === 0) ? (
            <div className="h-[250px] w-full text-center flex flex-col justify-center items-center border border-dashed rounded-xl text-gray-500">
              <h3 className="text-lg font-semibold">No data available</h3>
              <p>No metrics found for the selected period.</p>
            </div>
          ) : (
            <div className="h-[300px] w-full">
              <Line
                data={areaData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                    y: {
                      grid: {
                        color: 'rgba(0,0,0,0.05)',
                      },
                      beginAtZero: true,
                      max: 100,
                    },
                  },
                }}
              />
            </div>
          )}
        </div>
      </div>

     {(
        <div className="grid grid-cols-2 mt-8 gap-8">
          {/* Most called agents */}
          <div>
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold mb-2">Most called agents</h3>
              {metrics?.most_agents_called && metrics.most_agents_called.length > 3 && (
                <button
                  className="text-[13px] border rounded-xl p-1 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setShowAllAgents(prev => !prev)}
                >
                  {showAllAgents ? 'Collapse' : 'See All Agents'}
                </button>
              )}
            </div>
            <div className="w-full text-left mt-3 border-separate border-spacing-y-4">
              {(!metrics?.most_agents_called || metrics.most_agents_called.length === 0) ? (
                <div className="text-center py-8 text-gray-500">
                  <h4 className="text-lg font-semibold">No call data</h4>
                  <p>No agents have been called in the selected period.</p>
                </div>
              ) : (
                <table className="w-full text-left mt-2">
                  <thead>
                    <tr className="text-gray-500 border-b">
                      <th>Agent name</th>
                      <th>Number of calls</th>
                      <th>Call Minutes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metrics.most_agents_called.slice(0, showAllAgents ? undefined : 3).map((agentCall, i) => {
                      const agent = agents.find(a => a.agent_id === agentCall.agent_id);
                      return (
                        <tr key={i} className="hover:bg-gray-50 cursor-pointer">
                          <td className="p-3 font-bold">{agent?.name || 'Unknown Agent'}</td>
                          <td className="p-3">{agentCall.count || 0}</td>
                          <td className="p-3">-</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Language Section - Hidden for now */}
          {false && Object.keys(languageDataMap[selectedTime]).length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Language</h3>
              <div className="mt-3">
                {Object.entries(languageDataMap[selectedTime]).map(([lang, percent]) => (
                  <div key={lang} className="mb-2">
                    <div className="flex justify-between">
                      <span>{lang}</span>
                      <span>{percent.toFixed(1)}%</span>
                    </div>
                    <div className="bg-gray-200 h-2 rounded-full">
                      <motion.div
                        key={`${lang}-${percent}`} // unique to time change
                        className="bg-black h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  </div>
  </NavigationLayout>
  );
}
