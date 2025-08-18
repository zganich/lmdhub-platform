import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Calculator, TrendingUp, DollarSign, Clock, Truck, Users } from 'lucide-react'

const ROICalculator = () => {
  const [businessData, setBusinessData] = useState({
    businessType: '',
    currentDeliveryCost: 0,
    monthlyDeliveries: 0,
    averageDeliveryDistance: 0,
    employeeTimeSpent: 0,
    customerComplaints: 0,
    currentProvider: ''
  })

  const [results, setResults] = useState(null)

  const businessTypes = {
    'retail': {
      name: 'Retail Stores',
      currentCostPerDelivery: 45,
      ourCostPerDelivery: 28,
      timeSavings: 2.5,
      customerSatisfaction: 0.15
    },
    'contractor': {
      name: 'Contractors & Trades',
      currentCostPerDelivery: 65,
      ourCostPerDelivery: 42,
      timeSavings: 4.0,
      customerSatisfaction: 0.20
    },
    'supplier': {
      name: 'Supply Companies',
      currentCostPerDelivery: 55,
      ourCostPerDelivery: 35,
      timeSavings: 3.0,
      customerSatisfaction: 0.18
    },
    'restaurant': {
      name: 'Restaurants & Food Service',
      currentCostPerDelivery: 35,
      ourCostPerDelivery: 22,
      timeSavings: 2.0,
      customerSatisfaction: 0.12
    },
    'office': {
      name: 'Office & Professional',
      currentCostPerDelivery: 25,
      ourCostPerDelivery: 18,
      timeSavings: 1.5,
      customerSatisfaction: 0.10
    }
  }

  const calculateROI = () => {
    const type = businessTypes[businessData.businessType]
    if (!type) return

    // Monthly calculations
    const currentMonthlyCost = businessData.currentDeliveryCost * businessData.monthlyDeliveries
    const ourMonthlyCost = type.ourCostPerDelivery * businessData.monthlyDeliveries
    
    // Time savings (employee hours saved)
    const timeSavingsHours = businessData.monthlyDeliveries * type.timeSavings
    const timeSavingsValue = timeSavingsHours * 25 // $25/hour average employee cost
    
    // Customer satisfaction improvement
    const customerRetentionValue = currentMonthlyCost * type.customerSatisfaction
    
    // Total savings
    const directCostSavings = currentMonthlyCost - ourMonthlyCost
    const totalMonthlySavings = directCostSavings + timeSavingsValue + customerRetentionValue
    
    // Annual calculations
    const annualSavings = totalMonthlySavings * 12
    const annualOurCost = ourMonthlyCost * 12
    const roi = (annualSavings / annualOurCost) * 100

    setResults({
      currentMonthlyCost,
      ourMonthlyCost,
      directCostSavings,
      timeSavingsHours,
      timeSavingsValue,
      customerRetentionValue,
      totalMonthlySavings,
      annualSavings,
      annualOurCost,
      roi,
      paybackPeriod: annualOurCost / annualSavings * 12
    })
  }

  const handleInputChange = (field, value) => {
    setBusinessData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }))
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          <Calculator className="inline h-10 w-10 mr-3 text-blue-600" />
          ROI Calculator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Calculate your potential savings and return on investment with our personalized delivery service
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Business Information</h2>
          
          <div className="space-y-6">
            {/* Business Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
              <select
                value={businessData.businessType}
                onChange={(e) => setBusinessData(prev => ({ ...prev, businessType: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select your business type</option>
                {Object.entries(businessTypes).map(([key, type]) => (
                  <option key={key} value={key}>{type.name}</option>
                ))}
              </select>
            </div>

            {/* Current Delivery Cost */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Average Cost Per Delivery
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  type="number"
                  value={businessData.currentDeliveryCost}
                  onChange={(e) => handleInputChange('currentDeliveryCost', e.target.value)}
                  placeholder="45.00"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Monthly Deliveries */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Number of Deliveries
              </label>
              <input
                type="number"
                value={businessData.monthlyDeliveries}
                onChange={(e) => handleInputChange('monthlyDeliveries', e.target.value)}
                placeholder="50"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Average Distance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Average Delivery Distance (miles)
              </label>
              <input
                type="number"
                value={businessData.averageDeliveryDistance}
                onChange={(e) => handleInputChange('averageDeliveryDistance', e.target.value)}
                placeholder="15"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Employee Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee Hours Spent on Delivery Coordination (per month)
              </label>
              <input
                type="number"
                value={businessData.employeeTimeSpent}
                onChange={(e) => handleInputChange('employeeTimeSpent', e.target.value)}
                placeholder="20"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <Button
              onClick={calculateROI}
              disabled={!businessData.businessType || !businessData.currentDeliveryCost || !businessData.monthlyDeliveries}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
            >
              <Calculator className="mr-2 h-4 w-4" />
              Calculate ROI
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your ROI Analysis</h2>
          
          {results ? (
            <div className="space-y-6">
              {/* Monthly Savings Breakdown */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Savings Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Monthly Cost:</span>
                    <span className="font-semibold">${results.currentMonthlyCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Our Monthly Cost:</span>
                    <span className="font-semibold text-green-600">${results.ourMonthlyCost.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between">
                    <span className="text-gray-600">Direct Cost Savings:</span>
                    <span className="font-semibold text-green-600">${results.directCostSavings.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Additional Value */}
              <div className="space-y-4">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Clock className="h-5 w-5 text-yellow-600 mr-2" />
                    <h4 className="font-semibold text-yellow-900">Time Savings</h4>
                  </div>
                  <p className="text-yellow-800">
                    {results.timeSavingsHours.toFixed(1)} hours saved monthly = ${results.timeSavingsValue.toFixed(2)} value
                  </p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Users className="h-5 w-5 text-purple-600 mr-2" />
                    <h4 className="font-semibold text-purple-900">Customer Satisfaction</h4>
                  </div>
                  <p className="text-purple-800">
                    Improved customer retention = ${results.customerRetentionValue.toFixed(2)} monthly value
                  </p>
                </div>
              </div>

              {/* Total ROI */}
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-900 mb-4">Total Impact</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-lg">
                    <span className="text-green-700">Total Monthly Savings:</span>
                    <span className="font-bold text-green-900">${results.totalMonthlySavings.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-green-700">Annual Savings:</span>
                    <span className="font-bold text-green-900">${results.annualSavings.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl">
                    <span className="text-green-700">ROI:</span>
                    <span className="font-bold text-green-900">{results.roi.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Payback Period:</span>
                    <span>{results.paybackPeriod.toFixed(1)} months</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Truck className="mr-2 h-4 w-4" />
                  Get Started with Our Service
                </Button>
                <Button variant="outline" className="w-full">
                  Download Detailed Report
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                Fill in your business information and click "Calculate ROI" to see your potential savings
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Industry Benchmarks */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Industry Benchmarks</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(businessTypes).map(([key, type]) => (
            <div key={key} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{type.name}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg. Current Cost:</span>
                  <span className="font-medium">${type.currentCostPerDelivery}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Our Cost:</span>
                  <span className="font-medium text-green-600">${type.ourCostPerDelivery}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Savings:</span>
                  <span className="font-medium text-green-600">
                    ${(type.currentCostPerDelivery - type.ourCostPerDelivery).toFixed(0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time Saved:</span>
                  <span className="font-medium">{type.timeSavings}h/delivery</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ROICalculator
