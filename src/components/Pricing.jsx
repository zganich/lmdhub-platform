import { Button } from '@/components/ui/button.jsx'
import { 
  Check, 
  X, 
  Clock, 
  Truck, 
  Shield, 
  Star,
  ArrowRight,
  Calculator,
  Phone,
  Calendar
} from 'lucide-react'

const Pricing = ({ onQuoteClick }) => {
  const pricingTiers = [
    {
      name: 'Pay-Per-Delivery',
      description: 'Perfect for occasional deliveries',
      basePrice: 'Starting at $6',
      features: [
        'Transparent per-delivery pricing',
        'No monthly commitments',
        'Real-time tracking',
        'Photo confirmation',
        'SMS & email updates',
        'Customer support'
      ],
      limitations: [
        'Higher per-delivery cost',
        'No volume discounts'
      ],
      cta: 'Get Quote',
      popular: false,
      color: 'gray'
    },
    {
      name: 'Business Plan',
      description: 'Best for regular delivery needs',
      basePrice: '$99/month',
      subtitle: '+ delivery fees',
      features: [
        'Up to 50 deliveries/month',
        '20% discount on all deliveries',
        'Priority scheduling',
        'Dedicated account manager',
        'Monthly delivery analytics',
        'Custom delivery windows',
        'Bulk upload capability',
        'API access'
      ],
      limitations: [],
      cta: 'Start Free Trial',
      popular: true,
      color: 'blue'
    },
    {
      name: 'Enterprise',
      description: 'For high-volume operations',
      basePrice: 'Custom',
      subtitle: 'Volume-based pricing',
      features: [
        'Unlimited deliveries',
        'Up to 50% volume discounts',
        'Dedicated route optimization',
        'White-label options',
        'Custom integrations',
        'SLA guarantees',
        'Priority support',
        'Custom reporting'
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false,
      color: 'green'
    }
  ]

  const deliveryTypes = [
    {
      name: 'Scheduled Route',
      basePrice: '$6',
      description: 'Regular deliveries on set schedule',
      timeframe: 'Daily/Weekly routes',
      bestFor: 'Suppliers with regular customers',
      savings: 'Up to 50% off'
    },
    {
      name: 'Next-Day',
      basePrice: '$8',
      description: 'Standard business delivery',
      timeframe: 'Next business day',
      bestFor: 'Non-urgent deliveries',
      savings: '30% vs competitors'
    },
    {
      name: 'Same-Day',
      basePrice: '$10',
      description: 'Fast, reliable delivery',
      timeframe: '4-8 hours',
      bestFor: 'Retail & e-commerce',
      savings: '25% vs competitors'
    },
    {
      name: 'Urgent',
      basePrice: '$15',
      description: 'Priority delivery service',
      timeframe: '2-4 hours',
      bestFor: 'Professional services',
      savings: '20% vs competitors'
    },
    {
      name: 'Emergency',
      basePrice: '$25',
      description: 'Critical delivery needs',
      timeframe: '1 hour',
      bestFor: 'Court filings, medical',
      savings: '15% vs competitors'
    }
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Transparent Pricing, No Surprises
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your business. All plans include real-time tracking, professional service, and our on-time guarantee.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <Button 
              onClick={onQuoteClick}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
            >
              <Calculator className="h-5 w-5 mr-2" />
              Get Custom Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600">Flexible options for every business size</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div 
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg border-2 ${
                  tier.popular 
                    ? 'border-blue-500 transform scale-105' 
                    : 'border-gray-200'
                } p-8`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <p className="text-gray-600 mb-4">{tier.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{tier.basePrice}</span>
                    {tier.subtitle && (
                      <span className="text-gray-600 block text-sm">{tier.subtitle}</span>
                    )}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {tier.limitations.map((limitation, limitIndex) => (
                    <div key={limitIndex} className="flex items-center">
                      <X className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-500">{limitation}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={tier.name === 'Enterprise' ? undefined : onQuoteClick}
                  className={`w-full py-3 ${
                    tier.popular 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  {tier.cta}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Types Pricing */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Delivery Service Pricing</h2>
            <p className="text-xl text-gray-600">Base pricing + $0.75/mile beyond 10 miles</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliveryTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{type.name}</h3>
                  <span className="text-2xl font-bold text-blue-600">{type.basePrice}</span>
                </div>
                
                <p className="text-gray-600 mb-3">{type.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-700">{type.timeframe}</span>
                  </div>
                  <div className="flex items-center">
                    <Truck className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-700">{type.bestFor}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-green-700 font-semibold">{type.savings}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Need a custom quote for your specific requirements?</p>
            <Button 
              onClick={onQuoteClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            >
              Calculate Your Costs
            </Button>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Last Mile Express?</h2>
            <p className="text-xl text-gray-600">More value, less cost than traditional carriers</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Hidden Fees</h3>
              <p className="text-gray-600">Transparent pricing with no surprise charges or fuel surcharges</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">On-Time Guarantee</h3>
              <p className="text-gray-600">98% on-time delivery rate with money-back guarantee</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Local Support</h3>
              <p className="text-gray-600">Real people, local team available 24/7 for support</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600">Same-day, scheduled routes, or emergency delivery options</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pricing FAQ</h2>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How is mileage calculated?</h3>
              <p className="text-gray-600">We use GPS routing to calculate the most efficient path. The first 10 miles are included in the base price, then $0.75 per additional mile.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Are there any hidden fees?</h3>
              <p className="text-gray-600">No hidden fees, ever. Our pricing is completely transparent - you pay the quoted price with no surprise charges, fuel surcharges, or additional fees.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What's included in the Business Plan?</h3>
              <p className="text-gray-600">The Business Plan includes up to 50 deliveries per month with a 20% discount, priority scheduling, dedicated account management, and advanced features like API access.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I change plans anytime?</h3>
              <p className="text-gray-600">Yes! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect at the start of your next billing cycle.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer volume discounts?</h3>
              <p className="text-gray-600">Yes! Our Business Plan includes 20% off all deliveries, and Enterprise customers can save up to 50% with volume-based pricing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Saving on Delivery Costs?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Get a custom quote in under 60 seconds and see how much you can save
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onQuoteClick}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
            >
              Get Instant Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
            >
              Schedule Demo
            </Button>
          </div>
          <p className="text-sm text-blue-200 mt-4">
            No setup fees • 30-day money-back guarantee • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  )
}

export default Pricing

