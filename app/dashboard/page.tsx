'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createApiUrl } from '@/lib/config';
import { motion } from 'framer-motion';
import { 
  Building2, 
  UserPlus, 
  Bot, 
  BarChart3, 
  Settings, 
  Plus,
  ArrowRight,
  TrendingUp,
  Users,
  Activity
} from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  totalAgents: number;
  totalRuns: number;
  activeIntegrations: number;
  monthlyUsage: number;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{name: string, email: string, userType: string} | null>(null);
  const [userType, setUserType] = useState<'COMPANY' | 'AGENT_CREATOR' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalAgents: 0,
    totalRuns: 0,
    activeIntegrations: 0,
    monthlyUsage: 0
  });

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('jwtToken');
      
      if (!token) {
        router.push('/');
        return;
      }
      
      let userData = localStorage.getItem('userData');
      
      // If no user data in localStorage, fetch from API
      if (!userData) {
        try {
          const response = await fetch(createApiUrl('/me'), {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const userInfo = await response.json();
            // Add default userType if not provided by backend
            const userWithDefaults = {
              ...userInfo,
              userType: userInfo.userType || 'COMPANY'
            };
            localStorage.setItem('userData', JSON.stringify(userWithDefaults));
            setUser(userWithDefaults);
            setUserType(userWithDefaults.userType);
          } else {
            // Invalid token, redirect to login
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('userData');
            router.push('/');
            return;
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          router.push('/');
          return;
        }
      } else {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setUserType(parsedUser.userType || 'COMPANY');
      }
      
      fetchDashboardStats();
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Please sign in</h1>
          <Link 
            href="/auth/signin"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Welcome back, {user?.name || 'User'}!
              </h1>
              <p className="text-gray-400 mt-1">
                {userType === 'COMPANY' ? 'Manage your AI agents and integrations' : 'Build and monetize your AI agents'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/marketplace"
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Browse Marketplace
              </Link>
              <Link
                href="/agent-builder"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Agent
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Agents</p>
                <p className="text-2xl font-bold text-white">{stats.totalAgents}</p>
              </div>
              <Bot className="w-8 h-8 text-purple-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Runs</p>
                <p className="text-2xl font-bold text-white">{stats.totalRuns}</p>
              </div>
              <Activity className="w-8 h-8 text-green-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Integrations</p>
                <p className="text-2xl font-bold text-white">{stats.activeIntegrations}</p>
              </div>
              <Settings className="w-8 h-8 text-blue-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Monthly Usage</p>
                <p className="text-2xl font-bold text-white">{stats.monthlyUsage}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-yellow-500" />
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-800 rounded-lg border border-gray-700"
          >
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-white text-sm">Agent "Customer Support Bot" processed 15 requests</p>
                    <p className="text-gray-400 text-xs">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-white text-sm">New integration added: Slack</p>
                    <p className="text-gray-400 text-xs">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-white text-sm">Agent "Sales Assistant" published to marketplace</p>
                    <p className="text-gray-400 text-xs">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-800 rounded-lg border border-gray-700"
          >
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <Link
                  href="/agent-builder"
                  className="flex items-center justify-between p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Plus className="w-5 h-5 text-purple-500" />
                    <span className="text-white">Create New Agent</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </Link>

                <Link
                  href="/marketplace"
                  className="flex items-center justify-between p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Bot className="w-5 h-5 text-green-500" />
                    <span className="text-white">Browse Marketplace</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </Link>

                <Link
                  href="/integrations"
                  className="flex items-center justify-between p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-blue-500" />
                    <span className="text-white">Manage Integrations</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </Link>

                {userType === 'AGENT_CREATOR' && (
                  <Link
                    href="/analytics"
                    className="flex items-center justify-between p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <BarChart3 className="w-5 h-5 text-yellow-500" />
                      <span className="text-white">View Analytics</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
