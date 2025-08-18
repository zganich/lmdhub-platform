import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import BackOfficeAuth from './BackOfficeAuth'
import LeadGenerator from './LeadGenerator'
import ROICalculator from './ROICalculator'
import CRMDashboard from './CRMDashboard'
import { 
  LogOut, 
  Building, 
  Calculator, 
  Users, 
  Truck, 
  MapPin, 
  Clock, 
  DollarSign,
  Settings,
  BarChart3,
  FileText,
  MessageSquare,
  Bell,
  Search
} from 'lucide-react'

const WhiteLabelBackOffice = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [companyConfig, setCompanyConfig] = useState({
    name: 'Last Mile Express',
    logo: null,
    primaryColor: '#2563eb',
    secondaryColor: '#1e40af',
    domain: 'lastmileexpress.com',
    phone: '(801) 555-0123',
    email: 'support@lastmileexpress.com'
  })
  const [notifications, setNotifications] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const location = useLocation()

  useEffect(() => {
    // Check if user is already authenticated
    const auth = localStorage.getItem('backoffice-auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }

    // Set active tab based on URL
    if (location.pathname.includes('/dashboard')) setActiveTab('dashboard')
    else if (location.pathname.includes('/leads')) setActiveTab('leads')
    else if (location.pathname.includes('/roi-calculator')) setActiveTab('roi')
    else if (location.pathname.includes('/crm')) setActiveTab('crm')
    else if (location.pathname.includes('/operations')) setActiveTab('operations')
    else if (location.pathname.includes('/analytics')) setActiveTab('analytics')
    else if (location.pathname.includes('/settings')) setActiveTab('settings')
  }, [location])

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('backoffice-auth')
  }

  if (!isAuthenticated) {
    return <BackOfficeAuth onLogin={setIsAuthenticated} />
  }

  const Dashboard = () => (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="relative p-2 text-gray-600 hover:text-gray-900">
            <Bell className="h-5 w-5" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Truck className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Deliveries</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">New Leads</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Today's Revenue</p>
              <p className="text-2xl font-bold text-gray-900">$2,450</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg. Delivery Time</p>
              <p className="text-2xl font-bold text-gray-900">2.3h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New lead from Home Depot</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Delivery completed - RC Willey</p>
                <p className="text-xs text-gray-500">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Customer inquiry - Ferguson Supply</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setActiveTab('leads')}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
            >
              <Building className="h-6 w-6 text-blue-600 mb-2" />
              <p className="font-medium text-gray-900">Generate Leads</p>
              <p className="text-sm text-gray-500">Find new customers</p>
            </button>
            <button
              onClick={() => setActiveTab('roi')}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
            >
              <Calculator className="h-6 w-6 text-green-600 mb-2" />
              <p className="font-medium text-gray-900">Calculate ROI</p>
              <p className="text-sm text-gray-500">Show cost savings</p>
            </button>
            <button
              onClick={() => setActiveTab('crm')}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
            >
              <Users className="h-6 w-6 text-purple-600 mb-2" />
              <p className="font-medium text-gray-900">Manage CRM</p>
              <p className="text-sm text-gray-500">View customers</p>
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
            >
              <BarChart3 className="h-6 w-6 text-orange-600 mb-2" />
              <p className="font-medium text-gray-900">Analytics</p>
              <p className="text-sm text-gray-500">View reports</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const Operations = () => (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Operations</h1>
          <p className="text-gray-600">Manage deliveries, drivers, and routes</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          + New Delivery
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Deliveries</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Home Depot - Salt Lake City</p>
                      <p className="text-sm text-gray-500">Order #HD-{1000 + i}</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      In Transit
                    </span>
                  </div>
                  <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                    <span>Driver: John Smith</span>
                    <span>ETA: 2:30 PM</span>
                    <span>Route: 15 miles</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Driver Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">John Smith</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Sarah Johnson</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">On Break</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Mike Davis</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Offline</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const Analytics = () => (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">Performance metrics and insights</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Revenue Trends</h2>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart placeholder - Revenue over time</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Customer Satisfaction</h2>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart placeholder - Satisfaction scores</p>
          </div>
        </div>
      </div>
    </div>
  )

  const Settings = () => (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Configure your white-label back office</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Company Configuration</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
            <input
              type="text"
              value={companyConfig.name}
              onChange={(e) => setCompanyConfig(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Domain</label>
            <input
              type="text"
              value={companyConfig.domain}
              onChange={(e) => setCompanyConfig(prev => ({ ...prev, domain: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="text"
              value={companyConfig.phone}
              onChange={(e) => setCompanyConfig(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={companyConfig.email}
              onChange={(e) => setCompanyConfig(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="mt-6">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-gray-900">{companyConfig.name} - Back Office</h1>
              
              {/* Navigation Tabs */}
              <nav className="hidden md:flex space-x-8">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'dashboard'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'leads'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Building className="inline h-4 w-4 mr-1" />
                  Lead Generator
                </button>
                <button
                  onClick={() => setActiveTab('roi')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'roi'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Calculator className="inline h-4 w-4 mr-1" />
                  ROI Calculator
                </button>
                <button
                  onClick={() => setActiveTab('crm')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'crm'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Users className="inline h-4 w-4 mr-1" />
                  CRM
                </button>
                <button
                  onClick={() => setActiveTab('operations')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'operations'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Truck className="inline h-4 w-4 mr-1" />
                  Operations
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'analytics'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <BarChart3 className="inline h-4 w-4 mr-1" />
                  Analytics
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'settings'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Settings className="inline h-4 w-4 mr-1" />
                  Settings
                </button>
              </nav>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-6">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'leads' && <LeadGenerator />}
        {activeTab === 'roi' && <ROICalculator />}
        {activeTab === 'crm' && <CRMDashboard />}
        {activeTab === 'operations' && <Operations />}
        {activeTab === 'analytics' && <Analytics />}
        {activeTab === 'settings' && <Settings />}
      </div>
    </div>
  )
}

export default WhiteLabelBackOffice
