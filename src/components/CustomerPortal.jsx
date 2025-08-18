import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { 
  User, 
  Lock, 
  Truck, 
  MapPin, 
  Clock, 
  DollarSign, 
  Calendar,
  Package,
  CheckCircle,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Eye,
  Phone,
  Mail,
  Home,
  LogOut
} from 'lucide-react'

const CustomerPortal = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [user, setUser] = useState(null)
  const [deliveries, setDeliveries] = useState([])
  const [addresses, setAddresses] = useState([])
  const [payments, setPayments] = useState([])
  const location = useLocation()

  useEffect(() => {
    // Check if user is already authenticated
    const auth = localStorage.getItem('customer-auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      setUser({
        id: 1,
        name: 'John Doe',
        email: 'customer@example.com',
        phone: '(801) 555-0123',
        company: 'ABC Company'
      })
    }

    // Set active tab based on URL
    if (location.pathname.includes('/dashboard')) setActiveTab('dashboard')
    else if (location.pathname.includes('/deliveries')) setActiveTab('deliveries')
    else if (location.pathname.includes('/schedule')) setActiveTab('schedule')
    else if (location.pathname.includes('/tracking')) setActiveTab('tracking')
    else if (location.pathname.includes('/payments')) setActiveTab('payments')
    else if (location.pathname.includes('/addresses')) setActiveTab('addresses')
    else if (location.pathname.includes('/profile')) setActiveTab('profile')
  }, [location])

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('customer-auth')
  }

  if (!isAuthenticated) {
    return <CustomerAuth onLogin={setIsAuthenticated} />
  }

  const CustomerAuth = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      name: '',
      phone: '',
      company: ''
    })

    const handleSubmit = (e) => {
      e.preventDefault()
      // Mock authentication
      if (isLogin && formData.email === 'customer@example.com' && formData.password === 'password123') {
        localStorage.setItem('customer-auth', 'true')
        onLogin(true)
      } else if (!isLogin) {
        // Mock registration
        localStorage.setItem('customer-auth', 'true')
        onLogin(true)
      }
    }

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="relative">
              <Truck className="h-12 w-12 text-blue-600" />
              <Package className="h-6 w-6 text-orange-500 absolute -bottom-1 -right-1" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {!isLogin && (
                <>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <div className="mt-1">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <div className="mt-1">
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                      Company (Optional)
                    </label>
                    <div className="mt-1">
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {isLogin ? 'Sign in' : 'Create account'}
                </button>
              </div>
            </form>

            {isLogin && (
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Demo Credentials</span>
                  </div>
                </div>
                <div className="mt-6 text-center text-sm text-gray-600">
                  <p>Email: customer@example.com</p>
                  <p>Password: password123</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  const Dashboard = () => (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600">Manage your deliveries and track your shipments</p>
        </div>
        <button
          onClick={() => setActiveTab('schedule')}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Schedule Delivery
        </button>
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
              <p className="text-2xl font-bold text-gray-900">{deliveries.filter(d => d.status === 'in-transit').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{deliveries.filter(d => d.status === 'delivered').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-gray-900">{deliveries.filter(d => d.status === 'scheduled').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">${deliveries.reduce((sum, d) => sum + (d.price || 0), 0).toFixed(0)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Deliveries */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Deliveries</h3>
          <button
            onClick={() => setActiveTab('deliveries')}
            className="text-blue-600 hover:text-blue-500"
          >
            View all
          </button>
        </div>
        <div className="space-y-4">
          {deliveries.slice(0, 5).map((delivery, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${
                  delivery.status === 'delivered' ? 'bg-green-500' :
                  delivery.status === 'in-transit' ? 'bg-blue-500' :
                  delivery.status === 'scheduled' ? 'bg-orange-500' : 'bg-gray-500'
                }`}></div>
                <div>
                  <p className="font-medium text-gray-900">{delivery.trackingNumber}</p>
                  <p className="text-sm text-gray-600">{delivery.from} → {delivery.to}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">${delivery.price}</p>
                <p className="text-sm text-gray-600">{delivery.status}</p>
              </div>
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
      case 'deliveries':
        return <div className="max-w-7xl mx-auto p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Deliveries</h2>
          <p className="text-gray-600">Delivery management system coming soon...</p>
        </div>
      case 'schedule':
        return <div className="max-w-7xl mx-auto p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule Delivery</h2>
          <p className="text-gray-600">Delivery scheduling system coming soon...</p>
        </div>
      case 'tracking':
        return <div className="max-w-7xl mx-auto p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Track Deliveries</h2>
          <p className="text-gray-600">Real-time tracking system coming soon...</p>
        </div>
      case 'payments':
        return <div className="max-w-7xl mx-auto p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment History</h2>
          <p className="text-gray-600">Payment management system coming soon...</p>
        </div>
      case 'addresses':
        return <div className="max-w-7xl mx-auto p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Address Book</h2>
          <p className="text-gray-600">Address management system coming soon...</p>
        </div>
      case 'profile':
        return <div className="max-w-7xl mx-auto p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h2>
          <p className="text-gray-600">Profile management system coming soon...</p>
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
                  <Truck className="h-8 w-8 text-blue-600" />
                  <Package className="h-4 w-4 text-orange-500 absolute -bottom-1 -right-1" />
                </div>
                <span className="text-xl font-bold text-gray-900">Customer Portal</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{user?.email}</span>
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
              { id: 'dashboard', name: 'Dashboard', icon: Home },
              { id: 'deliveries', name: 'My Deliveries', icon: Package },
              { id: 'schedule', name: 'Schedule', icon: Calendar },
              { id: 'tracking', name: 'Tracking', icon: Truck },
              { id: 'payments', name: 'Payments', icon: DollarSign },
              { id: 'addresses', name: 'Addresses', icon: MapPin },
              { id: 'profile', name: 'Profile', icon: User }
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

export default CustomerPortal
