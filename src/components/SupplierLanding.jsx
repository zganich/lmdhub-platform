import { Button } from '@/components/ui/button.jsx'
import { 
  Truck, 
  Clock, 
  DollarSign, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Package,
  BarChart3,
  Calendar,
  Users,
  MapPin,
  Repeat
} from 'lucide-react'

const SupplierLanding = ({ onQuoteClick }) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-blue-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <Truck className="h-4 w-4 mr-2" />
                  For Local Suppliers
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Become the{' '}
                  <span className="text-green-600">preferred supplier</span>{' '}
                  in Salt Lake Valley
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Reliable scheduled routes and on-demand delivery that helps you serve more customers better
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={onQuoteClick}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg"
                >
                  Get Route Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 text-lg"
                >
                  View Route Examples
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">50%</div>
                  <div className="text-sm text-gray-600">Cost savings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">Daily</div>
                  <div className="text-sm text-gray-600">Scheduled routes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">More</div>
                  <div className="text-sm text-gray-600">Customers served</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900">Route Planning Calculator</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                        <option>Office Supply Distributor</option>
                        <option>Industrial Supply Company</option>
                        <option>Medical Supply Distributor</option>
                        <option>Food Service Supplier</option>
                        <option>Other B2B Supplier</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Weekly Deliveries</label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                        <option>10-25 deliveries/week</option>
                        <option>25-50 deliveries/week</option>
                        <option>50-100 deliveries/week</option>
                        <option>100+ deliveries/week</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="h-5 w-5 text-green-600" />
                      <span className="font-semibold text-green-900">Scheduled Route Benefits</span>
                    </div>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Predictable daily delivery windows</li>
                      <li>• Volume discounts up to 50% off</li>
                      <li>• Dedicated route optimization</li>
                    </ul>
                  </div>
                  
                  <Button 
                    onClick={onQuoteClick}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                  >
                    Plan My Routes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points & Solutions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stop Losing Customers to Bigger Suppliers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your customers choose suppliers based on reliability and service. Make delivery your competitive advantage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 rounded-full p-2 flex-shrink-0">
                  <Clock className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Inconsistent Delivery Times</h3>
                  <p className="text-gray-600">Customers can't plan their operations when deliveries arrive at unpredictable times. This hurts their business and yours.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-red-100 rounded-full p-2 flex-shrink-0">
                  <DollarSign className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">High Delivery Costs</h3>
                  <p className="text-gray-600">Individual deliveries are expensive. You either absorb the cost (hurting margins) or pass it on (losing customers).</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-red-100 rounded-full p-2 flex-shrink-0">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Limited Service Area</h3>
                  <p className="text-gray-600">Can't cost-effectively serve customers across the valley. This limits your growth and market reach.</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Scheduled Route Service</h3>
                  <p className="text-gray-600">Predictable daily delivery windows that your customers can count on. Build trust through consistency.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Volume Discounts</h3>
                  <p className="text-gray-600">Save up to 50% with scheduled routes. Lower costs mean better margins or more competitive pricing.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Valley-Wide Coverage</h3>
                  <p className="text-gray-600">Serve customers from downtown Salt Lake to Sandy with the same reliable service. Expand your market reach.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features for Suppliers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Built for B2B Supply Chain Excellence
            </h2>
            <p className="text-xl text-gray-600">
              Every feature designed to help you serve more customers better
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Scheduled Routes</h3>
              <p className="text-gray-600">Daily, weekly, or custom schedules that your customers can depend on. Build predictable service into your offering.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Route Optimization</h3>
              <p className="text-gray-600">AI-powered route planning reduces delivery time and costs while improving customer satisfaction.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexible Delivery Options</h3>
              <p className="text-gray-600">From scheduled routes to emergency same-day delivery - offer your customers the service level they need.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Valley-Wide Coverage</h3>
              <p className="text-gray-600">Complete coverage from downtown to the suburbs. Serve customers wherever they are in the Salt Lake Valley.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Repeat className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Recurring Delivery Management</h3>
              <p className="text-gray-600">Set up recurring deliveries for regular customers. Automate your logistics and reduce administrative overhead.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Communication</h3>
              <p className="text-gray-600">Your customers get delivery notifications and tracking updates, reducing support calls and improving satisfaction.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Suppliers Growing with Last Mile Express
            </h2>
            <p className="text-xl text-gray-600">
              See how local suppliers are expanding their reach and improving service
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6 text-lg">
                "Scheduled routes cut our delivery costs by 40% and our customers love the predictable service. We've been able to take on 25 new accounts across the valley because of reliable delivery."
              </p>
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <span className="text-green-600 font-bold">DM</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">David Martinez</div>
                  <div className="text-gray-600">Owner, Valley Office Supply</div>
                  <div className="text-sm text-green-600">40% cost reduction, 25 new accounts</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6 text-lg">
                "The route optimization and customer notifications have made us look like a much bigger operation. Our customers think we're the most professional supplier they work with."
              </p>
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">JL</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Jennifer Lee</div>
                  <div className="text-gray-600">Operations Manager, Mountain Medical Supply</div>
                  <div className="text-sm text-blue-600">Enhanced professional image</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Become the Preferred Supplier?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Join 15+ local suppliers already growing their business with reliable, cost-effective delivery
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onQuoteClick}
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg"
            >
              Plan My Routes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg"
            >
              See Route Examples
            </Button>
          </div>
          <p className="text-sm text-green-200 mt-4">
            Volume discounts available • Scheduled routes • Same-day backup service
          </p>
        </div>
      </section>
    </div>
  )
}

export default SupplierLanding

