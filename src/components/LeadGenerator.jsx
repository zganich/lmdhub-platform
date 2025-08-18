import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Search, Building, MapPin, DollarSign, Users, TrendingUp } from 'lucide-react'

const LeadGenerator = () => {
  const [businessType, setBusinessType] = useState('')
  const [location, setLocation] = useState('')
  const [leads, setLeads] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedLead, setSelectedLead] = useState(null)

  // Pre-defined business categories with targeting criteria
  const businessCategories = {
    'retail-stores': {
      name: 'Retail Stores',
      description: 'Brick & mortar stores needing local delivery',
      targeting: ['appliance stores', 'furniture stores', 'electronics stores', 'home improvement'],
      painPoints: ['High delivery costs', 'Customer wait times', 'Limited delivery radius'],
      savings: '30-50% delivery cost reduction'
    },
    'contractors': {
      name: 'Contractors & Trades',
      description: 'Construction and service businesses',
      targeting: ['plumbers', 'electricians', 'contractors', 'HVAC', 'roofers'],
      painPoints: ['Material delivery delays', 'Job site coordination', 'Multiple supplier pickups'],
      savings: '40-60% time savings on material delivery'
    },
    'suppliers': {
      name: 'Supply Companies',
      description: 'Businesses selling to other businesses',
      targeting: ['lumber yards', 'electrical suppliers', 'plumbing suppliers', 'hardware wholesalers'],
      painPoints: ['Delivery scheduling conflicts', 'Customer service issues', 'Route optimization'],
      savings: '25-40% operational cost reduction'
    },
    'restaurants': {
      name: 'Restaurants & Food Service',
      description: 'Food businesses needing ingredient delivery',
      targeting: ['restaurants', 'catering', 'food trucks', 'cafes'],
      painPoints: ['Ingredient delivery timing', 'Multiple supplier coordination', 'Last-minute orders'],
      savings: '20-35% delivery cost savings'
    },
    'offices': {
      name: 'Office & Professional',
      description: 'Businesses needing document and supply delivery',
      targeting: ['law firms', 'accounting firms', 'real estate', 'consulting'],
      painPoints: ['Document delivery delays', 'Supply restocking', 'Client service'],
      savings: '15-30% delivery cost reduction'
    }
  }

  // Mock lead data - replace with real scraping
  const mockLeads = {
    'retail-stores': [
      {
        id: 1,
        name: 'Home Depot - Salt Lake City',
        address: '1850 S 300 W, Salt Lake City, UT 84115',
        phone: '(801) 466-4444',
        website: 'homedepot.com',
        type: 'Home Improvement',
        employees: '50-100',
        estimatedDeliveryVolume: '20-30 deliveries/week',
        currentPainPoints: ['High delivery costs', 'Customer complaints about delays'],
        potentialSavings: '$2,500/month',
        contactPerson: 'Store Manager',
        email: 'manager@homedepot-slc.com'
      },
      {
        id: 2,
        name: 'RC Willey Furniture',
        address: '1950 S 300 W, Salt Lake City, UT 84115',
        phone: '(801) 487-4444',
        website: 'rcwilley.com',
        type: 'Furniture Store',
        employees: '25-50',
        estimatedDeliveryVolume: '15-25 deliveries/week',
        currentPainPoints: ['Limited delivery radius', 'Scheduling conflicts'],
        potentialSavings: '$1,800/month',
        contactPerson: 'Operations Manager',
        email: 'ops@rcwilley-slc.com'
      }
    ],
    'contractors': [
      {
        id: 3,
        name: 'Ferguson Plumbing Supply',
        address: '2150 S 300 W, Salt Lake City, UT 84115',
        phone: '(801) 466-4444',
        website: 'ferguson.com',
        type: 'Plumbing Supply',
        employees: '10-25',
        estimatedDeliveryVolume: '30-40 deliveries/week',
        currentPainPoints: ['Material delivery delays', 'Job site coordination'],
        potentialSavings: '$3,200/month',
        contactPerson: 'Purchasing Manager',
        email: 'purchasing@ferguson-slc.com'
      }
    ],
    'suppliers': [
      {
        id: 4,
        name: 'Ace Hardware - Downtown',
        address: '1100 E 2100 S, Salt Lake City, UT 84106',
        phone: '(801) 466-4444',
        website: 'acehardware.com',
        type: 'Hardware Store',
        employees: '15-30',
        estimatedDeliveryVolume: '25-35 deliveries/week',
        currentPainPoints: ['Delivery scheduling conflicts', 'Customer service issues'],
        potentialSavings: '$2,100/month',
        contactPerson: 'Store Owner',
        email: 'owner@acehardware-downtown.com'
      }
    ]
  }

  const generateLeads = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const categoryLeads = mockLeads[businessType] || []
      setLeads(categoryLeads)
      setIsLoading(false)
    }, 1500)
  }

  const calculateROI = (lead) => {
    const monthlySavings = parseInt(lead.potentialSavings.replace(/[^0-9]/g, ''))
    const annualSavings = monthlySavings * 12
    const ourServiceCost = monthlySavings * 0.7 // We charge 70% of their current cost
    const netSavings = monthlySavings - ourServiceCost
    const annualROI = (netSavings * 12) / (ourServiceCost * 12) * 100
    
    return {
      monthlySavings,
      annualSavings,
      ourServiceCost,
      netSavings,
      annualROI
    }
  }

  const exportLeads = () => {
    const csvContent = [
      ['Business Name', 'Address', 'Phone', 'Email', 'Type', 'Potential Monthly Savings', 'ROI %'],
      ...leads.map(lead => {
        const roi = calculateROI(lead)
        return [
          lead.name,
          lead.address,
          lead.phone,
          lead.email,
          lead.type,
          `$${roi.monthlySavings}`,
          `${roi.annualROI.toFixed(1)}%`
        ]
      })
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `leads-${businessType}-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          <Building className="inline h-10 w-10 mr-3 text-blue-600" />
          Business Lead Generator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover small to medium businesses in your area that could save money with our personalized local delivery service
        </p>
      </div>

      {/* Business Type Selection */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Select Business Category</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(businessCategories).map(([key, category]) => (
            <div
              key={key}
              className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                businessType === key
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => setBusinessType(key)}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  {category.savings}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-2" />
                  {category.targeting.length} target segments
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lead Generation */}
      {businessType && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Generate Leads for {businessCategories[businessType].name}
            </h2>
            <Button
              onClick={generateLeads}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating...
                </div>
              ) : (
                <div className="flex items-center">
                  <Search className="h-4 w-4 mr-2" />
                  Generate Leads
                </div>
              )}
            </Button>
          </div>

          {/* Pain Points & Value Proposition */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-semibold text-red-900 mb-3">Current Pain Points</h3>
              <ul className="space-y-2">
                {businessCategories[businessType].painPoints.map((point, index) => (
                  <li key={index} className="flex items-center text-red-700">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-3">Our Solution</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-green-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Personalized delivery service
                </li>
                <li className="flex items-center text-green-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Cost savings of {businessCategories[businessType].savings}
                </li>
                <li className="flex items-center text-green-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Real-time tracking & communication
                </li>
                <li className="flex items-center text-green-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Dedicated account management
                </li>
              </ul>
            </div>
          </div>

          {/* Generated Leads */}
          {leads.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  Generated Leads ({leads.length})
                </h3>
                <Button
                  onClick={exportLeads}
                  variant="outline"
                  className="border-green-500 text-green-600 hover:bg-green-50"
                >
                  Export to CSV
                </Button>
              </div>

              <div className="grid gap-6">
                {leads.map((lead) => {
                  const roi = calculateROI(lead)
                  return (
                    <div
                      key={lead.id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">{lead.name}</h4>
                          <p className="text-sm text-gray-600">{lead.type}</p>
                          <div className="flex items-center text-sm text-gray-500 mt-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            {lead.address}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Contact</p>
                          <p className="font-medium">{lead.contactPerson}</p>
                          <p className="text-sm text-blue-600">{lead.email}</p>
                          <p className="text-sm text-gray-600">{lead.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Business Info</p>
                          <p className="font-medium">{lead.employees} employees</p>
                          <p className="text-sm text-gray-600">{lead.estimatedDeliveryVolume}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Potential Savings</p>
                          <p className="font-semibold text-green-600">{lead.potentialSavings}/month</p>
                          <p className="text-sm text-gray-600">ROI: {roi.annualROI.toFixed(1)}%</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Lead Details</h2>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Business Name</label>
                      <p className="font-medium">{selectedLead.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Type</label>
                      <p className="font-medium">{selectedLead.type}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Address</label>
                      <p className="font-medium">{selectedLead.address}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Website</label>
                      <a href={`https://${selectedLead.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {selectedLead.website}
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Contact Person</label>
                      <p className="font-medium">{selectedLead.contactPerson}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email</label>
                      <p className="font-medium">{selectedLead.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Phone</label>
                      <p className="font-medium">{selectedLead.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">ROI Analysis</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {(() => {
                    const roi = calculateROI(selectedLead)
                    return (
                      <>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-sm text-blue-600">Current Monthly Cost</p>
                          <p className="text-2xl font-bold text-blue-900">${roi.monthlySavings}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <p className="text-sm text-green-600">Our Service Cost</p>
                          <p className="text-2xl font-bold text-green-900">${roi.ourServiceCost}</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <p className="text-sm text-purple-600">Monthly Savings</p>
                          <p className="text-2xl font-bold text-purple-900">${roi.netSavings}</p>
                        </div>
                      </>
                    )
                  })()}
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                  Create Outreach Campaign
                </Button>
                <Button variant="outline" className="flex-1">
                  Add to CRM
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LeadGenerator
