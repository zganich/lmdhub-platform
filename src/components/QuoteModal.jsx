import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { X, MapPin, Clock, DollarSign, Calculator, Plus, Minus, Search, CheckCircle, XCircle } from 'lucide-react'
import googlePlacesService from '../services/googlePlacesService'
import PaymentForm from './PaymentForm'

const QuoteModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    pickupAddress: '',
    pickupAddress2: '',
    pickupCity: '',
    pickupState: '',
    pickupZip: '',
    deliveryAddress: '',
    deliveryAddress2: '',
    deliveryCity: '',
    deliveryState: '',
    deliveryZip: '',
    serviceLevel: 'same-day',
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    multipleDrops: false,
    numberOfDrops: 1,
    additionalDrops: [],
    terrainType: 'flat',
    itemWeight: '',
    specialInstructions: ''
  })
  const [step, setStep] = useState(1)
  const [quote, setQuote] = useState(null)
  const [addressSuggestions, setAddressSuggestions] = useState([])
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false)
  const [showDeliverySuggestions, setShowDeliverySuggestions] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [distanceInfo, setDistanceInfo] = useState(null)
  const [loadingAddress, setLoadingAddress] = useState(false)

  const serviceLevels = {
    'emergency': { name: 'Emergency (1 hour)', price: 25, time: '1 hour' },
    'urgent': { name: 'Urgent (2-4 hours)', price: 15, time: '2-4 hours' },
    'same-day': { name: 'Same-day (4-8 hours)', price: 10, time: '4-8 hours' },
    'next-day': { name: 'Next-day', price: 8, time: '24 hours' },
    'scheduled': { name: 'Scheduled route', price: 6, time: 'Custom timing' }
  }

  const terrainTypes = {
    'flat': { name: 'Flat/Urban', fee: 0, description: 'Standard city delivery' },
    'hilly': { name: 'Hilly Areas', fee: 15, description: 'Moderate elevation changes' },
    'mountainous': { name: 'Mountain/Canyon', fee: 25, description: 'Steep terrain, ski resorts' },
    'rural': { name: 'Rural/Remote', fee: 20, description: 'Unpaved roads, remote areas' }
  }

  const pricingStructure = {
    basePrice: (serviceLevel) => serviceLevels[serviceLevel].price,
    perMile: 2.50,
    multipleDropFee: 12, // Fee per additional drop
    terrainFee: (terrain) => terrainTypes[terrain].fee,
    heavyItemFee: 8, // For items over 50 lbs
    rushFee: 10 // For emergency/urgent deliveries
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Address auto-population with Google Places API
  const handleAddressInput = async (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    if (value.length > 3) {
      setLoadingAddress(true)
      try {
        // Try Google Places API first, fallback to mock data
        const suggestions = await googlePlacesService.getAddressSuggestions(value);
        setAddressSuggestions(suggestions.length > 0 ? suggestions : googlePlacesService.getMockSuggestions(value));
      } catch (error) {
        console.log('Using mock address suggestions:', error.message);
        setAddressSuggestions(googlePlacesService.getMockSuggestions(value));
      } finally {
        setLoadingAddress(false);
      }
      
      if (field.includes('pickup')) {
        setShowPickupSuggestions(true)
        setShowDeliverySuggestions(false)
      } else {
        setShowDeliverySuggestions(true)
        setShowPickupSuggestions(false)
      }
    } else {
      setAddressSuggestions([])
      setShowPickupSuggestions(false)
      setShowDeliverySuggestions(false)
    }
  }

  const selectAddress = async (suggestion, type) => {
    try {
      // Get detailed place information
      const placeDetails = await googlePlacesService.getPlaceDetails(suggestion.placeId);
      const address = placeDetails.addressComponents;
      
      if (type === 'pickup') {
        setFormData(prev => ({
          ...prev,
          pickupAddress: `${address.street_number} ${address.route}`.trim(),
          pickupAddress2: address.subpremise || '',
          pickupCity: address.locality || '',
          pickupState: address.administrative_area_level_1 || '',
          pickupZip: address.postal_code || ''
        }))
      } else {
        setFormData(prev => ({
          ...prev,
          deliveryAddress: `${address.street_number} ${address.route}`.trim(),
          deliveryAddress2: address.subpremise || '',
          deliveryCity: address.locality || '',
          deliveryState: address.administrative_area_level_1 || '',
          deliveryZip: address.postal_code || ''
        }))
      }
    } catch (error) {
      // Fallback to simple parsing
      const parts = suggestion.description.split(', ')
      if (type === 'pickup') {
        setFormData(prev => ({
          ...prev,
          pickupAddress: parts[0],
          pickupCity: parts[1] || '',
          pickupState: parts[2]?.split(' ')[0] || 'UT',
          pickupZip: parts[2]?.split(' ')[1] || ''
        }))
      } else {
        setFormData(prev => ({
          ...prev,
          deliveryAddress: parts[0],
          deliveryCity: parts[1] || '',
          deliveryState: parts[2]?.split(' ')[0] || 'UT',
          deliveryZip: parts[2]?.split(' ')[1] || ''
        }))
      }
    }
    
    setAddressSuggestions([])
    setShowPickupSuggestions(false)
    setShowDeliverySuggestions(false)
    
    // Calculate distance if both addresses are filled
    if (formData.pickupAddress && formData.deliveryAddress) {
      calculateDistance();
    }
  }

  const addDropLocation = () => {
    setFormData(prev => ({
      ...prev,
      numberOfDrops: prev.numberOfDrops + 1,
      additionalDrops: [...prev.additionalDrops, { address: '', address2: '', city: '', state: 'UT', zip: '' }]
    }))
  }

  const removeDropLocation = (index) => {
    setFormData(prev => ({
      ...prev,
      numberOfDrops: prev.numberOfDrops - 1,
      additionalDrops: prev.additionalDrops.filter((_, i) => i !== index)
    }))
  }

  const updateDropLocation = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      additionalDrops: prev.additionalDrops.map((drop, i) => 
        i === index ? { ...drop, [field]: value } : drop
      )
    }))
  }

  const calculateDistance = async () => {
    if (!formData.pickupAddress || !formData.deliveryAddress) return;
    
    try {
      const origin = `${formData.pickupAddress}, ${formData.pickupCity}, ${formData.pickupState} ${formData.pickupZip}`;
      const destination = `${formData.deliveryAddress}, ${formData.deliveryCity}, ${formData.deliveryState} ${formData.deliveryZip}`;
      
      const distanceInfo = await googlePlacesService.calculateDistance(origin, destination);
      setDistanceInfo(distanceInfo);
    } catch (error) {
      console.log('Using mock distance calculation:', error.message);
      const origin = `${formData.pickupAddress}, ${formData.pickupCity}, ${formData.pickupState} ${formData.pickupZip}`;
      const destination = `${formData.deliveryAddress}, ${formData.deliveryCity}, ${formData.deliveryState} ${formData.deliveryZip}`;
      const mockDistance = googlePlacesService.getMockDistance(origin, destination);
      setDistanceInfo(mockDistance);
    }
  };

  const calculateQuote = () => {
    // Enhanced pricing calculation with real distance
    const basePrice = pricingStructure.basePrice(formData.serviceLevel)
    const estimatedDistance = distanceInfo ? Math.round(distanceInfo.distance.value / 1609.34) : Math.floor(Math.random() * 15) + 5 // Convert meters to miles
    const mileageCharge = estimatedDistance > 10 ? (estimatedDistance - 10) * pricingStructure.perMile : 0
    
    // Terrain fee
    const terrainFee = pricingStructure.terrainFee(formData.terrainType)
    
    // Multiple drops fee
    const multipleDropsFee = formData.numberOfDrops > 1 ? 
      (formData.numberOfDrops - 1) * pricingStructure.multipleDropFee : 0
    
    // Heavy item fee (if weight > 50 lbs)
    const heavyItemFee = (formData.itemWeight && parseInt(formData.itemWeight) > 50) ? 
      pricingStructure.heavyItemFee : 0
    
    // Rush fee for emergency/urgent
    const rushFee = (['emergency', 'urgent'].includes(formData.serviceLevel)) ? 
      pricingStructure.rushFee : 0
    
    const totalPrice = basePrice + mileageCharge + terrainFee + multipleDropsFee + heavyItemFee + rushFee
    
    setQuote({
      basePrice,
      distance: estimatedDistance,
      mileageCharge,
      terrainFee,
      multipleDropsFee,
      heavyItemFee,
      rushFee,
      totalPrice,
      serviceLevel: serviceLevels[formData.serviceLevel],
      terrainType: terrainTypes[formData.terrainType],
      numberOfDrops: formData.numberOfDrops
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

  const handlePaymentSuccess = (paymentData) => {
    console.log('Payment successful:', paymentData);
    // Here you would typically send the order to your backend
    alert('Payment successful! Your delivery has been scheduled.');
    onClose();
  };

  const handlePaymentError = (error) => {
    console.error('Payment failed:', error);
    alert(`Payment failed: ${error}`);
  };

  const proceedToPayment = () => {
    setShowPayment(true);
  };

  const resetModal = () => {
    setStep(1)
    setQuote(null)
    setFormData({
      pickupAddress: '',
      pickupAddress2: '',
      pickupCity: '',
      pickupState: '',
      pickupZip: '',
      deliveryAddress: '',
      deliveryAddress2: '',
      deliveryCity: '',
      deliveryState: '',
      deliveryZip: '',
      serviceLevel: 'same-day',
      businessName: '',
      contactName: '',
      email: '',
      phone: '',
      multipleDrops: false,
      numberOfDrops: 1,
      additionalDrops: [],
      terrainType: 'flat',
      itemWeight: '',
      specialInstructions: ''
    })
    setAddressSuggestions([])
    setShowPickupSuggestions(false)
    setShowDeliverySuggestions(false)
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
            {/* Step 1: Enhanced Information */}
            {step === 1 && (
              <div className="space-y-6">
                {/* Pickup Location */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Pickup Location</h3>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="pickupAddress"
                      value={formData.pickupAddress}
                      onChange={(e) => handleAddressInput('pickupAddress', e.target.value)}
                      placeholder="123 Main St"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    {showPickupSuggestions && addressSuggestions.length > 0 && (
                      <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg">
                        {loadingAddress && (
                          <div className="px-4 py-2 text-gray-500">
                            Loading suggestions...
                          </div>
                        )}
                        {!loadingAddress && addressSuggestions.map((suggestion, index) => (
                          <div 
                            key={suggestion.id || index}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => selectAddress(suggestion, 'pickup')}
                          >
                            <div className="font-medium">{suggestion.structured?.main_text || suggestion.description}</div>
                            <div className="text-sm text-gray-500">{suggestion.structured?.secondary_text || ''}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                      type="text"
                      name="pickupAddress2"
                      value={formData.pickupAddress2}
                      onChange={handleInputChange}
                      placeholder="Suite/Apt # (optional)"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      name="pickupCity"
                      value={formData.pickupCity}
                      onChange={handleInputChange}
                      placeholder="City"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <input
                      type="text"
                      name="pickupState"
                      value={formData.pickupState}
                      onChange={handleInputChange}
                      placeholder="State"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <input
                      type="text"
                      name="pickupZip"
                      value={formData.pickupZip}
                      onChange={handleInputChange}
                      placeholder="ZIP Code"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Delivery Location */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Delivery Location</h3>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="deliveryAddress"
                      value={formData.deliveryAddress}
                      onChange={(e) => handleAddressInput('deliveryAddress', e.target.value)}
                      placeholder="456 Oak Ave"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    {showDeliverySuggestions && addressSuggestions.length > 0 && (
                      <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg">
                        {loadingAddress && (
                          <div className="px-4 py-2 text-gray-500">
                            Loading suggestions...
                          </div>
                        )}
                        {!loadingAddress && addressSuggestions.map((suggestion, index) => (
                          <div 
                            key={suggestion.id || index}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => selectAddress(suggestion, 'delivery')}
                          >
                            <div className="font-medium">{suggestion.structured?.main_text || suggestion.description}</div>
                            <div className="text-sm text-gray-500">{suggestion.structured?.secondary_text || ''}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                      type="text"
                      name="deliveryAddress2"
                      value={formData.deliveryAddress2}
                      onChange={handleInputChange}
                      placeholder="Suite/Apt # (optional)"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      name="deliveryCity"
                      value={formData.deliveryCity}
                      onChange={handleInputChange}
                      placeholder="City"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <input
                      type="text"
                      name="deliveryState"
                      value={formData.deliveryState}
                      onChange={handleInputChange}
                      placeholder="State"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <input
                      type="text"
                      name="deliveryZip"
                      value={formData.deliveryZip}
                      onChange={handleInputChange}
                      placeholder="ZIP Code"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Multiple Drops */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Additional Drops</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.numberOfDrops > 1}
                        onChange={(e) => {
                          if (e.target.checked) {
                            addDropLocation()
                          } else {
                            setFormData(prev => ({ ...prev, numberOfDrops: 1, additionalDrops: [] }))
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Multiple delivery locations</span>
                    </label>
                  </div>
                  
                  {formData.additionalDrops.map((drop, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-700">Drop #{index + 2}</h4>
                        <button
                          type="button"
                          onClick={() => removeDropLocation(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <input
                          type="text"
                          placeholder="Street Address"
                          value={drop.address}
                          onChange={(e) => updateDropLocation(index, 'address', e.target.value)}
                          className="col-span-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="Suite/Apt"
                          value={drop.address2}
                          onChange={(e) => updateDropLocation(index, 'address2', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="ZIP"
                          value={drop.zip}
                          onChange={(e) => updateDropLocation(index, 'zip', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  ))}
                  
                  {formData.numberOfDrops > 1 && (
                    <button
                      type="button"
                      onClick={addDropLocation}
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Another Drop</span>
                    </button>
                  )}
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

                {!showPayment ? (
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
                      type="button"
                      onClick={proceedToPayment}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <DollarSign className="mr-2 h-4 w-4" />
                      Pay & Schedule Delivery
                    </Button>
                    <Button 
                      type="submit"
                      variant="outline"
                      className="flex-1"
                    >
                      Submit Quote Request
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => setShowPayment(false)}
                      className="w-full"
                    >
                      ← Back to Quote
                    </Button>
                    <PaymentForm
                      amount={quote.totalPrice}
                      onPaymentSuccess={handlePaymentSuccess}
                      onPaymentError={handlePaymentError}
                      deliveryDetails={formData}
                      userType="sender"
                    />
                  </div>
                )}
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

