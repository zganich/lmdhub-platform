import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { X, MapPin, Clock, DollarSign, Calculator } from 'lucide-react'

const QuoteModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    pickupAddress: '',
    deliveryAddress: '',
    serviceLevel: 'same-day',
    businessName: '',
    contactName: '',
    email: '',
    phone: ''
  })
  const [step, setStep] = useState(1)
  const [quote, setQuote] = useState(null)

  const serviceLevels = {
    'emergency': { name: 'Emergency (1 hour)', price: 25, time: '1 hour' },
    'urgent': { name: 'Urgent (2-4 hours)', price: 15, time: '2-4 hours' },
    'same-day': { name: 'Same-day (4-8 hours)', price: 10, time: '4-8 hours' },
    'next-day': { name: 'Next-day', price: 8, time: '24 hours' },
    'scheduled': { name: 'Scheduled route', price: 6, time: 'Custom timing' }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const calculateQuote = () => {
    // Simulate distance calculation and pricing
    const basePrice = serviceLevels[formData.serviceLevel].price
    const estimatedDistance = Math.floor(Math.random() * 15) + 5 // 5-20 miles
    const mileageCharge = estimatedDistance > 10 ? (estimatedDistance - 10) * 0.75 : 0
    const totalPrice = basePrice + mileageCharge
    
    setQuote({
      basePrice,
      distance: estimatedDistance,
      mileageCharge,
      totalPrice,
      serviceLevel: serviceLevels[formData.serviceLevel]
    })
    setStep(2)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (step === 1) {
      calculateQuote()
    } else {
      // Submit quote request
      console.log('Quote request submitted:', formData, quote)
      setStep(3)
    }
  }

  const resetModal = () => {
    setStep(1)
    setQuote(null)
    setFormData({
      pickupAddress: '',
      deliveryAddress: '',
      serviceLevel: 'same-day',
      businessName: '',
      contactName: '',
      email: '',
      phone: ''
    })
  }

  const handleClose = () => {
    resetModal()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {step === 1 && 'Get Instant Quote'}
              {step === 2 && 'Your Quote Details'}
              {step === 3 && 'Quote Submitted!'}
            </h2>
            <button 
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      Pickup Address
                    </label>
                    <input
                      type="text"
                      name="pickupAddress"
                      value={formData.pickupAddress}
                      onChange={handleInputChange}
                      placeholder="123 Main St, Salt Lake City, UT"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      name="deliveryAddress"
                      value={formData.deliveryAddress}
                      onChange={handleInputChange}
                      placeholder="456 Oak Ave, Sandy, UT"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="inline h-4 w-4 mr-1" />
                    Service Level
                  </label>
                  <select
                    name="serviceLevel"
                    value={formData.serviceLevel}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Object.entries(serviceLevels).map(([key, level]) => (
                      <option key={key} value={key}>
                        {level.name} - ${level.price} base price
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Pricing Information</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Base price includes pickup, delivery, and tracking</li>
                    <li>• Additional $0.75 per mile beyond 10 miles</li>
                    <li>• No hidden fees or surge pricing</li>
                    <li>• Monthly plans available with volume discounts</li>
                  </ul>
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate Quote
                </Button>
              </div>
            )}

            {/* Step 2: Quote Results & Contact Info */}
            {step === 2 && quote && (
              <div className="space-y-6">
                {/* Quote Display */}
                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl border">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Your Quote</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Service Level:</span>
                          <span className="font-medium">{quote.serviceLevel.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Estimated Distance:</span>
                          <span className="font-medium">{quote.distance} miles</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Base Price:</span>
                          <span className="font-medium">${quote.basePrice}</span>
                        </div>
                        {quote.mileageCharge > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Mileage Charge:</span>
                            <span className="font-medium">${quote.mileageCharge.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="border-t pt-2 flex justify-between text-lg font-bold">
                          <span>Total Price:</span>
                          <span className="text-blue-600">${quote.totalPrice.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">What's Included:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>✓ Professional pickup & delivery</li>
                        <li>✓ Real-time GPS tracking</li>
                        <li>✓ Photo confirmation</li>
                        <li>✓ SMS & email updates</li>
                        <li>✓ Customer support</li>
                        <li>✓ Delivery guarantee</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        placeholder="Your Business Name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
                      <input
                        type="text"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleInputChange}
                        placeholder="Your Name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(801) 555-0123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Back to Edit
                  </Button>
                  <Button 
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Submit Quote Request
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="text-center space-y-6">
                <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Quote Submitted Successfully!</h3>
                  <p className="text-gray-600">
                    We'll contact you within 15 minutes to confirm your delivery details and schedule pickup.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-left">
                  <h4 className="font-semibold text-blue-900 mb-2">What happens next:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>1. Our team will call you within 15 minutes</li>
                    <li>2. We'll confirm pickup and delivery details</li>
                    <li>3. Your driver will be dispatched immediately</li>
                    <li>4. You'll receive real-time tracking updates</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Need immediate assistance?</p>
                  <a 
                    href="tel:801-555-0123" 
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Call us: (801) 555-0123
                  </a>
                </div>
                <Button 
                  onClick={handleClose}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Close
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default QuoteModal

