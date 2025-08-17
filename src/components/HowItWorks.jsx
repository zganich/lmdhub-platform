import { Button } from '@/components/ui/button.jsx'
import { 
  MapPin, 
  Clock, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  Smartphone,
  Truck,
  Camera,
  MessageSquare,
  Shield,
  BarChart3,
  Users,
  Settings
} from 'lucide-react'

const HowItWorks = ({ onQuoteClick }) => {
  const steps = [
    {
      number: '1',
      title: 'Get Instant Quote',
      description: 'Enter pickup and delivery addresses for transparent, upfront pricing with no hidden fees',
      icon: MapPin,
      details: [
        'Real-time mileage calculation',
        'Transparent pricing breakdown',
        'Multiple service level options',
        'Instant quote in under 30 seconds'
      ]
    },
    {
      number: '2',
      title: 'Schedule Delivery',
      description: 'Choose your service level from emergency 1-hour to scheduled routes',
      icon: Clock,
      details: [
        'Emergency (1 hour) delivery',
        'Same-day (4-8 hours) service',
        'Scheduled route options',
        'Flexible pickup windows'
      ]
    },
    {
      number: '3',
      title: 'AI Optimizes Route',
      description: 'Our smart system finds the fastest, most efficient path for your delivery',
      icon: Zap,
      details: [
        'Real-time traffic analysis',
        'Weather condition adjustments',
        'Driver location optimization',
        'Cost-efficient routing'
      ]
    },
    {
      number: '4',
      title: 'Track & Confirm',
      description: 'Real-time updates and photo confirmation when delivery is complete',
      icon: CheckCircle,
      details: [
        'Live GPS tracking',
        'SMS and email notifications',
        'Photo proof of delivery',
        'Digital signature capture'
      ]
    }
  ]

  const features = [
    {
      icon: Smartphone,
      title: 'Mobile-First Experience',
      description: 'Track deliveries, communicate with drivers, and manage orders from any device'
    },
    {
      icon: Truck,
      title: 'Professional Drivers',
      description: 'Background-checked, insured drivers who represent your brand professionally'
    },
    {
      icon: Camera,
      title: 'Photo Confirmation',
      description: 'Visual proof of delivery with timestamp and GPS coordinates for every package'
    },
    {
      icon: MessageSquare,
      title: 'Real-Time Communication',
      description: 'Direct messaging with drivers and automatic customer notifications'
    },
    {
      icon: Shield,
      title: 'Secure & Insured',
      description: 'Full insurance coverage and secure handling for all your deliveries'
    },
    {
      icon: BarChart3,
      title: 'Business Analytics',
      description: 'Detailed reporting and insights to optimize your delivery operations'
    }
  ]

  const businessTypes = [
    {
      type: 'Retail Stores',
      process: 'Customer orders → Instant quote → Same-day delivery → Happy customer',
      benefits: ['Compete with big box stores', 'Increase customer satisfaction', 'Expand delivery radius']
    },
    {
      type: 'Professional Services',
      process: 'Document ready → Urgent delivery → Client receives → Deadline met',
      benefits: ['Never miss deadlines', 'Professional image', 'Secure document handling']
    },
    {
      type: 'Local Suppliers',
      process: 'Order placed → Scheduled route → Regular delivery → Loyal customers',
      benefits: ['Predictable service', 'Volume discounts', 'Expand customer base']
    }
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              How Last Mile Express Works
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple process, sophisticated technology. Get your deliveries done right, every time.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <Button 
              onClick={onQuoteClick}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
            >
              Try It Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Main Process Steps */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple Process, Sophisticated Technology</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gray-200 transform translate-x-4 -translate-y-1/2"></div>
                )}
                
                <div className="bg-white rounded-2xl shadow-lg border p-8 text-center hover:shadow-xl transition-shadow">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <step.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                    {step.number}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  
                  <ul className="text-sm text-gray-500 space-y-1">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features for Your Business</h2>
            <p className="text-xl text-gray-600">Everything you need for professional delivery service</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Type Workflows */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tailored for Your Business Type</h2>
            <p className="text-xl text-gray-600">See how Last Mile Express works for different industries</p>
          </div>

          <div className="space-y-8">
            {businessTypes.map((business, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{business.type}</h3>
                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Typical Workflow:</h4>
                      <p className="text-blue-800">{business.process}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">Key Benefits:</h4>
                      {business.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl">
                    <div className="text-center">
                      <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <Users className="h-8 w-8" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Ready to Get Started?</h4>
                      <p className="text-gray-600 mb-4">See how much you can save with our transparent pricing</p>
                      <Button 
                        onClick={onQuoteClick}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Get Quote for {business.type}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">AI-Powered Logistics Technology</h2>
            <p className="text-xl text-gray-600">Advanced technology that saves you time and money</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                  <Settings className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Route Optimization</h3>
                  <p className="text-gray-600">AI algorithms analyze traffic, weather, and driver locations to find the most efficient routes, reducing delivery time by up to 30%.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Predictive Analytics</h3>
                  <p className="text-gray-600">Machine learning models predict delivery times, identify potential delays, and automatically adjust schedules to maintain on-time performance.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 rounded-full p-2 flex-shrink-0">
                  <Smartphone className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-Time Tracking</h3>
                  <p className="text-gray-600">GPS tracking with live updates keeps you and your customers informed every step of the way, with automatic notifications at key milestones.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">The Result?</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>On-time delivery rate:</span>
                  <span className="text-2xl font-bold">98%+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Average cost savings:</span>
                  <span className="text-2xl font-bold">35%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Customer satisfaction:</span>
                  <span className="text-2xl font-bold">4.8/5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Support response time:</span>
                  <span className="text-2xl font-bold">&lt;15min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join 200+ local businesses already saving time and money with Last Mile Express
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onQuoteClick}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
            >
              Watch Demo Video
            </Button>
          </div>
          <p className="text-sm text-blue-200 mt-4">
            No setup fees • Same-day delivery available • Local support team
          </p>
        </div>
      </section>
    </div>
  )
}

export default HowItWorks

