import { Button } from '@/components/ui/button.jsx'
import { 
  ShoppingBag, 
  Clock, 
  DollarSign, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Truck,
  Smartphone,
  BarChart3,
  Users,
  Package,
  MapPin
} from 'lucide-react'

const RetailLanding = ({ onQuoteClick }) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  For Retail & E-commerce
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Same-day delivery that helps you{' '}
                  <span className="text-blue-600">compete with Amazon</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Offer your customers the fast, reliable delivery they expect while saving 30-50% on logistics costs
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={onQuoteClick}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
                >
                  Get Instant Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
                >
                  See Success Stories
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">98%</div>
                  <div className="text-sm text-gray-600">On-time delivery</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">4-8hrs</div>
                  <div className="text-sm text-gray-600">Same-day delivery</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">35%</div>
                  <div className="text-sm text-gray-600">Average savings</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900">Retail Success Calculator</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Orders</label>
                      <input 
                        type="number" 
                        placeholder="500"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Delivery Cost</label>
                      <input 
                        type="number" 
                        placeholder="$15"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">$2,500/month</div>
                      <div className="text-sm text-green-700">Estimated savings with Last Mile Express</div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={onQuoteClick}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                  >
                    Get My Custom Quote
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
              Stop Losing Customers to Big Box Stores
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your customers expect Amazon-level delivery speed. We make it affordable for local retailers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 rounded-full p-2 flex-shrink-0">
                  <Clock className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Slow Delivery = Lost Sales</h3>
                  <p className="text-gray-600">73% of customers abandon purchases when delivery takes longer than expected. Don't let slow shipping kill your sales.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-red-100 rounded-full p-2 flex-shrink-0">
                  <DollarSign className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">High Shipping Costs</h3>
                  <p className="text-gray-600">Traditional carriers charge premium rates for fast delivery. These costs either hurt your margins or drive away price-sensitive customers.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-red-100 rounded-full p-2 flex-shrink-0">
                  <Package className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Delivery Visibility</h3>
                  <p className="text-gray-600">Customers call asking "Where's my order?" because you can't provide real-time tracking updates.</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Same-Day Delivery</h3>
                  <p className="text-gray-600">Offer 4-8 hour delivery that matches customer expectations while keeping costs reasonable for your business.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Transparent Pricing</h3>
                  <p className="text-gray-600">No hidden fees or surge pricing. Know exactly what you'll pay upfront so you can price competitively.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-Time Tracking</h3>
                  <p className="text-gray-600">Your customers get live updates and photo confirmation. No more "Where's my order?" calls.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features for Retail */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Built Specifically for Retail Success
            </h2>
            <p className="text-xl text-gray-600">
              Every feature designed to help you compete and win
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Smartphone className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Notifications</h3>
              <p className="text-gray-600">Automated SMS and email updates keep customers informed and reduce support calls by 60%.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Delivery Analytics</h3>
              <p className="text-gray-600">Track delivery performance, customer satisfaction, and identify opportunities to improve your service.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Brand Representation</h3>
              <p className="text-gray-600">Our local drivers understand they represent your brand and provide the professional service your customers expect.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Local Coverage</h3>
              <p className="text-gray-600">Complete coverage of Salt Lake Valley including East Bench, Millcreek, Holladay, Cottonwood Heights, and Sandy.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexible Service Levels</h3>
              <p className="text-gray-600">From emergency 1-hour delivery to cost-effective scheduled routes - match service level to customer needs.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Handling</h3>
              <p className="text-gray-600">Professional handling of your products with photo confirmation and signature capture for high-value items.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Retail Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              See how local retailers are winning with Last Mile Express
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6 text-lg">
                "Same-day delivery increased our online sales by 45% in just 3 months. Customers love getting their boutique items the same day they order, and we're saving $1,200 monthly compared to our old delivery service."
              </p>
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">SC</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Sarah Chen</div>
                  <div className="text-gray-600">Owner, Mountain View Boutique</div>
                  <div className="text-sm text-blue-600">45% increase in online sales</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6 text-lg">
                "Our customers were abandoning carts because of slow shipping. Now we offer same-day delivery and our conversion rate jumped 30%. The transparent pricing helps us offer free delivery on orders over $75."
              </p>
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <span className="text-green-600 font-bold">MJ</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Mike Johnson</div>
                  <div className="text-gray-600">Owner, Valley Sports Gear</div>
                  <div className="text-sm text-green-600">30% higher conversion rate</div>
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
            Ready to Compete with the Big Retailers?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join 50+ local retailers already offering same-day delivery and saving thousands monthly
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
            No setup fees • Same-day delivery available • 30-day money-back guarantee
          </p>
        </div>
      </section>
    </div>
  )
}

export default RetailLanding

