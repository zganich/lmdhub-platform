import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

// Customer Portal Components
const CustomerAuth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    company: ''
  })
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    // Mock authentication - in real app, this would call your backend
    if (isLogin) {
      if (formData.email === 'customer@example.com' && formData.password === 'password123') {
        onLogin({
          id: 'cust_001',
          email: formData.email,
          firstName: 'John',
          lastName: 'Customer',
          company: 'ABC Company'
        })
      } else {
        setError('Invalid credentials')
      }
    } else {
      // Mock registration
      onLogin({
        id: 'cust_' + Date.now(),
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        company: formData.company
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
              </>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            )}

            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                {isLogin ? 'Sign in' : 'Create account'}
              </button>
            </div>
          </form>

          {isLogin && (
            <div className="mt-6">
              <div className="text-center text-sm text-gray-600">
                Demo credentials: customer@example.com / password123
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const CustomerDashboard = ({ customer, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [deliveries, setDeliveries] = useState([
    {
      id: 'del_001',
      pickupAddress: '123 Main St, Salt Lake City, UT',
      deliveryAddress: '456 Oak Ave, Sandy, UT',
      status: 'completed',
      date: '2024-08-15',
      price: 45.00,
      type: 'scheduled'
    },
    {
      id: 'del_002',
      pickupAddress: '789 Pine St, Salt Lake City, UT',
      deliveryAddress: '321 Elm St, West Jordan, UT',
      status: 'in_progress',
      date: '2024-08-17',
      price: 38.50,
      type: 'urgent'
    }
  ])

  const [newDelivery, setNewDelivery] = useState({
    pickupAddress: '',
    pickupAddress2: '',
    deliveryAddress: '',
    deliveryAddress2: '',
    deliveryType: 'scheduled',
    scheduledDate: '',
    scheduledTime: '',
    specialInstructions: '',
    multipleDrops: false,
    drops: []
  })

  const addDropLocation = () => {
    setNewDelivery({
      ...newDelivery,
      drops: [...newDelivery.drops, { address: '', address2: '' }]
    })
  }

  const removeDropLocation = (index) => {
    setNewDelivery({
      ...newDelivery,
      drops: newDelivery.drops.filter((_, i) => i !== index)
    })
  }

  const updateDropLocation = (index, field, value) => {
    const updatedDrops = [...newDelivery.drops]
    updatedDrops[index][field] = value
    setNewDelivery({ ...newDelivery, drops: updatedDrops })
  }

  const createDelivery = () => {
    const delivery = {
      id: 'del_' + Date.now(),
      ...newDelivery,
      status: 'pending',
      date: newDelivery.scheduledDate || new Date().toISOString().split('T')[0],
      price: 35.00 + (newDelivery.drops.length * 12),
      customer: customer.id
    }
    setDeliveries([delivery, ...deliveries])
    setNewDelivery({
      pickupAddress: '',
      pickupAddress2: '',
      deliveryAddress: '',
      deliveryAddress2: '',
      deliveryType: 'scheduled',
      scheduledDate: '',
      scheduledTime: '',
      specialInstructions: '',
      multipleDrops: false,
      drops: []
    })
    setActiveTab('dashboard')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'in_progress': return 'text-blue-600 bg-blue-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'cancelled': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Customer Portal</h1>
              <p className="text-sm text-gray-600">Welcome back, {customer.firstName}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{customer.email}</span>
              <button
                onClick={onLogout}
                className="text-sm text-red-600 hover:text-red-500"
              >
                Sign out
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
              { id: 'dashboard', name: 'Dashboard' },
              { id: 'new-delivery', name: 'New Delivery' },
              { id: 'deliveries', name: 'My Deliveries' },
              { id: 'payments', name: 'Payments' },
              { id: 'profile', name: 'Profile' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Deliveries</dt>
                        <dd className="text-lg font-medium text-gray-900">{deliveries.length}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Completed</dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {deliveries.filter(d => d.status === 'completed').length}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">In Progress</dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {deliveries.filter(d => d.status === 'in_progress').length}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Spent</dt>
                        <dd className="text-lg font-medium text-gray-900">
                          ${deliveries.reduce((sum, d) => sum + d.price, 0).toFixed(2)}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Deliveries */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Deliveries</h3>
                <div className="space-y-4">
                  {deliveries.slice(0, 3).map((delivery) => (
                    <div key={delivery.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">
                            {delivery.pickupAddress} → {delivery.deliveryAddress}
                          </p>
                          <p className="text-sm text-gray-600">{delivery.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">${delivery.price.toFixed(2)}</p>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(delivery.status)}`}>
                            {delivery.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'new-delivery' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">Create New Delivery</h3>
              
              <div className="space-y-6">
                {/* Delivery Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Type</label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: 'scheduled', label: 'Scheduled', description: 'Plan ahead' },
                      { value: 'same_day', label: 'Same Day', description: 'Today delivery' },
                      { value: 'urgent', label: 'Urgent', description: 'ASAP delivery' }
                    ].map((type) => (
                      <label key={type.value} className="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none">
                        <input
                          type="radio"
                          name="deliveryType"
                          value={type.value}
                          checked={newDelivery.deliveryType === type.value}
                          onChange={(e) => setNewDelivery({...newDelivery, deliveryType: e.target.value})}
                          className="sr-only"
                        />
                        <span className="flex flex-1">
                          <span className="flex flex-col">
                            <span className="block text-sm font-medium text-gray-900">{type.label}</span>
                            <span className="mt-1 flex items-center text-sm text-gray-500">{type.description}</span>
                          </span>
                        </span>
                        <span className="pointer-events-none absolute -inset-px rounded-lg border-2" aria-hidden="true"></span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Pickup Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Pickup Address</label>
                    <input
                      type="text"
                      value={newDelivery.pickupAddress}
                      onChange={(e) => setNewDelivery({...newDelivery, pickupAddress: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="123 Main St, Salt Lake City, UT"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Suite/Apt (Optional)</label>
                    <input
                      type="text"
                      value={newDelivery.pickupAddress2}
                      onChange={(e) => setNewDelivery({...newDelivery, pickupAddress2: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Suite 100"
                    />
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Delivery Address</label>
                    <input
                      type="text"
                      value={newDelivery.deliveryAddress}
                      onChange={(e) => setNewDelivery({...newDelivery, deliveryAddress: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="456 Oak Ave, Sandy, UT"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Suite/Apt (Optional)</label>
                    <input
                      type="text"
                      value={newDelivery.deliveryAddress2}
                      onChange={(e) => setNewDelivery({...newDelivery, deliveryAddress2: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Suite 200"
                    />
                  </div>
                </div>

                {/* Multiple Drops */}
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newDelivery.multipleDrops}
                      onChange={(e) => setNewDelivery({...newDelivery, multipleDrops: e.target.checked})}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Multiple delivery stops</span>
                  </label>
                </div>

                {newDelivery.multipleDrops && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-700">Additional Stops</h4>
                    {newDelivery.drops.map((drop, index) => (
                      <div key={index} className="flex space-x-4">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={drop.address}
                            onChange={(e) => updateDropLocation(index, 'address', e.target.value)}
                            className="block w-full border border-gray-300 rounded-md px-3 py-2"
                            placeholder="Additional delivery address"
                          />
                        </div>
                        <div className="flex-1">
                          <input
                            type="text"
                            value={drop.address2}
                            onChange={(e) => updateDropLocation(index, 'address2', e.target.value)}
                            className="block w-full border border-gray-300 rounded-md px-3 py-2"
                            placeholder="Suite/Apt"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeDropLocation(index)}
                          className="px-3 py-2 text-red-600 hover:text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addDropLocation}
                      className="text-sm text-blue-600 hover:text-blue-500"
                    >
                      + Add another stop
                    </button>
                  </div>
                )}

                {/* Scheduling */}
                {newDelivery.deliveryType === 'scheduled' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Scheduled Date</label>
                      <input
                        type="date"
                        value={newDelivery.scheduledDate}
                        onChange={(e) => setNewDelivery({...newDelivery, scheduledDate: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Preferred Time</label>
                      <input
                        type="time"
                        value={newDelivery.scheduledTime}
                        onChange={(e) => setNewDelivery({...newDelivery, scheduledTime: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                  </div>
                )}

                {/* Special Instructions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Special Instructions</label>
                  <textarea
                    value={newDelivery.specialInstructions}
                    onChange={(e) => setNewDelivery({...newDelivery, specialInstructions: e.target.value})}
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Any special instructions for the driver..."
                  />
                </div>

                {/* Submit */}
                <div className="flex justify-end">
                  <button
                    onClick={createDelivery}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                  >
                    Create Delivery
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'deliveries' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">My Deliveries</h3>
              
              <div className="space-y-4">
                {deliveries.map((delivery) => (
                  <div key={delivery.id} className="border rounded-lg p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <h4 className="text-lg font-medium text-gray-900">Delivery #{delivery.id}</h4>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(delivery.status)}`}>
                            {delivery.status.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">From:</span> {delivery.pickupAddress}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">To:</span> {delivery.deliveryAddress}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Date:</span> {delivery.date}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Type:</span> {delivery.type}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-medium text-gray-900">${delivery.price.toFixed(2)}</p>
                        <button className="text-sm text-blue-600 hover:text-blue-500 mt-2">
                          Track Delivery
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">Payment History</h3>
              
              <div className="space-y-4">
                {deliveries.map((delivery) => (
                  <div key={delivery.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">Delivery #{delivery.id}</p>
                        <p className="text-sm text-gray-600">{delivery.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">${delivery.price.toFixed(2)}</p>
                        <span className="text-sm text-green-600">Paid</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">Profile Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="mt-1 text-sm text-gray-900">{customer.firstName} {customer.lastName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{customer.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company</label>
                  <p className="mt-1 text-sm text-gray-900">{customer.company}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Main Customer Portal Component
const CustomerPortal = () => {
  const [customer, setCustomer] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedCustomer = localStorage.getItem('customer')
    if (savedCustomer) {
      setCustomer(JSON.parse(savedCustomer))
    }
  }, [])

  const handleLogin = (customerData) => {
    setCustomer(customerData)
    localStorage.setItem('customer', JSON.stringify(customerData))
  }

  const handleLogout = () => {
    setCustomer(null)
    localStorage.removeItem('customer')
  }

  if (!customer) {
    return <CustomerAuth onLogin={handleLogin} />
  }

  return <CustomerDashboard customer={customer} onLogout={handleLogout} />
}

export default CustomerPortal
