import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import BackOfficeAuth from './BackOfficeAuth'
import LeadGenerator from './LeadGenerator'
import ROICalculator from './ROICalculator'
import CRMDashboard from './CRMDashboard'
import { LogOut, Building, Calculator, Users } from 'lucide-react'

const BackOffice = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('leads')
  const location = useLocation()

  useEffect(() => {
    // Check if user is already authenticated
    const auth = localStorage.getItem('backoffice-auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }

    // Set active tab based on URL
    if (location.pathname.includes('/leads')) setActiveTab('leads')
    else if (location.pathname.includes('/roi-calculator')) setActiveTab('roi')
    else if (location.pathname.includes('/crm')) setActiveTab('crm')
  }, [location])

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('backoffice-auth')
  }

  if (!isAuthenticated) {
    return <BackOfficeAuth onLogin={setIsAuthenticated} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-gray-900">Last Mile Express - Back Office</h1>
              
              {/* Navigation Tabs */}
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'leads'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Building className="inline h-4 w-4 mr-2" />
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
                  <Calculator className="inline h-4 w-4 mr-2" />
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
                  <Users className="inline h-4 w-4 mr-2" />
                  CRM Dashboard
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
        {activeTab === 'leads' && <LeadGenerator />}
        {activeTab === 'roi' && <ROICalculator />}
        {activeTab === 'crm' && <CRMDashboard />}
      </div>
    </div>
  )
}

export default BackOffice
