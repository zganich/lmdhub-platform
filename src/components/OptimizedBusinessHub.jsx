import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import BackOfficeAuth from './BackOfficeAuth'
import EnhancedLeadGenerator from './EnhancedLeadGenerator'
import EnhancedLeadList from './EnhancedLeadList'
import EnhancedLeadDetail from './EnhancedLeadDetail'
import EnhancedDashboard from './EnhancedDashboard'
import ROICalculator from './ROICalculator'
import CRMDashboard from './CRMDashboard'
import CustomerPortal from './CustomerPortal'
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
  Search,
  UserPlus,
  Target,
  TrendingUp,
  Shield,
  Zap,
  Globe
} from 'lucide-react'
import whiteLabelConfig from '../config/whiteLabelConfig'

const OptimizedBusinessHub = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [companyConfig, setCompanyConfig] = useState(whiteLabelConfig.company)
  const [notifications, setNotifications] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [leads, setLeads] = useState([])
  const [customers, setCustomers] = useState([])
  const [deliveries, setDeliveries] = useState([])
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
    else if (location.pathname.includes('/customers')) setActiveTab('customers')
    else if (location.pathname.includes('/deliveries')) setActiveTab('deliveries')
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
          <h1 className="text-3xl font-bold text-gray-900">{companyConfig.name} Business Hub</h1>
          <p className="text-gray-600">Complete delivery management and business intelligence platform</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search leads, customers, deliveries..."
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
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Leads</p>
              <p className="text-2xl font-bold text-gray-900">{leads.filter(l => l.status === 'active').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Truck className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Today's Deliveries</p>
              <p className="text-2xl font-bold text-gray-900">{deliveries.filter(d => d.date === new Date().toISOString().split('T')[0]).length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${deliveries.reduce((sum, d) => sum + (d.price || 0), 0).toFixed(0)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button 
              onClick={() => setActiveTab('leads')}
              className="w-full flex items-center p-3 text-left rounded-lg hover:bg-gray-50 transition-colors"
            >
              <UserPlus className="h-5 w-5 text-blue-600 mr-3" />
              <span className="font-medium">Add New Lead</span>
            </button>
            <button 
              onClick={() => setActiveTab('customers')}
              className="w-full flex items-center p-3 text-left rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Users className="h-5 w-5 text-green-600 mr-3" />
              <span className="font-medium">Manage Customers</span>
            </button>
            <button 
              onClick={() => setActiveTab('deliveries')}
              className="w-full flex items-center p-3 text-left rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Truck className="h-5 w-5 text-orange-600 mr-3" />
              <span className="font-medium">Track Deliveries</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Intelligence</h3>
          <div className="space-y-3">
            <button 
              onClick={() => setActiveTab('roi')}
              className="w-full flex items-center p-3 text-left rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Calculator className="h-5 w-5 text-purple-600 mr-3" />
              <span className="font-medium">ROI Calculator</span>
            </button>
            <button 
              onClick={() => setActiveTab('analytics')}
              className="w-full flex items-center p-3 text-left rounded-lg hover:bg-gray-50 transition-colors"
            >
              <BarChart3 className="h-5 w-5 text-indigo-600 mr-3" />
              <span className="font-medium">Analytics</span>
            </button>
            <button 
              onClick={() => setActiveTab('crm')}
              className="w-full flex items-center p-3 text-left rounded-lg hover:bg-gray-50 transition-colors"
            >
              <MessageSquare className="h-5 w-5 text-teal-600 mr-3" />
              <span className="font-medium">CRM Dashboard</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Features</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 rounded-lg bg-blue-50">
              <Shield className="h-5 w-5 text-blue-600 mr-3" />
              <span className="font-medium">Security & Compliance</span>
            </div>
            <div className="flex items-center p-3 rounded-lg bg-green-50">
              <Zap className="h-5 w-5 text-green-600 mr-3" />
              <span className="font-medium">Real-time Tracking</span>
            </div>
            <div className="flex items-center p-3 rounded-lg bg-purple-50">
              <Globe className="h-5 w-5 text-purple-600 mr-3" />
              <span className="font-medium">White-label Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {leads.slice(0, 5).map((lead, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium text-gray-900">{lead.company}</p>
                  <p className="text-sm text-gray-600">{lead.contact}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{lead.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'leads':
        return <EnhancedLeadList />
      case 'roi':
        return <ROICalculator />
      case 'crm':
        return <CRMDashboard />
      case 'customers':
        return <CustomerPortal />
      case 'deliveries':
        return <div className="max-w-7xl mx-auto p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Management</h2>
          <p className="text-gray-600">Delivery tracking and management system coming soon...</p>
        </div>
      case 'operations':
        return <div className="max-w-7xl mx-auto p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Operations</h2>
          <p className="text-gray-600">Operations management system coming soon...</p>
        </div>
      case 'analytics':
        return <EnhancedDashboard />
      case 'settings':
        return <div className="max-w-7xl mx-auto p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
          <p className="text-gray-600">Platform settings and configuration coming soon...</p>
        </div>
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Building className="h-8 w-8 text-blue-600" />
                  <Truck className="h-4 w-4 text-orange-500 absolute -bottom-1 -right-1" />
                </div>
                <span className="text-xl font-bold text-gray-900">{companyConfig.name}</span>
              </div>
              <span className="text-sm text-gray-500">Business Hub</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{companyConfig.email}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-sm text-red-600 hover:text-red-500"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
              { id: 'leads', name: 'Lead Management', icon: Target },
              { id: 'customers', name: 'Customer Portal', icon: Users },
              { id: 'deliveries', name: 'Deliveries', icon: Truck },
              { id: 'roi', name: 'ROI Calculator', icon: Calculator },
              { id: 'crm', name: 'CRM', icon: MessageSquare },
              { id: 'analytics', name: 'Analytics', icon: TrendingUp },
              { id: 'settings', name: 'Settings', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        {renderContent()}
      </div>
    </div>
  )
}

export default OptimizedBusinessHub
