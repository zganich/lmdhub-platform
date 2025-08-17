import { Button } from '@/components/ui/button.jsx'
import { 
  Briefcase, 
  Clock, 
  Shield, 
  Star, 
  CheckCircle, 
  ArrowRight,
  FileText,
  Lock,
  Users,
  AlertTriangle,
  Calendar,
  Phone
} from 'lucide-react'

const ProfessionalLanding = ({ onQuoteClick }) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  <Briefcase className="h-4 w-4 mr-2" />
                  For Professional Services
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Never miss a{' '}
                  <span className="text-indigo-600">deadline</span>{' '}
                  again
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Secure, reliable document delivery for law firms, accounting practices, and professional services
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={onQuoteClick}
                  size="lg"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 text-lg"
                >
                  Get Instant Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-4 text-lg"
                >
                  View Case Studies
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">100%</div>
                  <div className="text-sm text-gray-600">On-time delivery</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">1hr</div>
                  <div className="text-sm text-gray-600">Emergency service</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">Secure</div>
                  <div className="text-sm text-gray-600">Confidential handling</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900">Emergency Delivery Calculator</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        <option>Court Filing</option>
                        <option>Legal Documents</option>
                        <option>Contracts</option>
                        <option>Financial Reports</option>
                        <option>Client Materials</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        <option>Emergency (1 hour) - $25</option>
                        <option>Urgent (2-4 hours) - $15</option>
                        <option>Same-day (4-8 hours) - $10</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="h-5 w-5 text-indigo-600" />
                      <span className="font-semibold text-indigo-900">Secure Delivery Included</span>
                    </div>
                    <ul className="text-sm text-indigo-800 space-y-1">
                      <li>• Chain of custody tracking</li>
                      <li>• Signature confirmation</li>
                      <li>• Photo documentation</li>
                    </ul>
                  </div>
                  
                  <Button 
                    onClick={onQuoteClick}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3"
                  >
                    Get Emergency Quote
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
              When Deadlines Can't Be Missed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional services require absolute reliability. One missed deadline can cost thousands.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 rounded-full p-2 flex-shrink-0">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Court Filing Deadlines</h3>
                  <p className="text-gray-600">Missing a court deadline can result in case dismissal, sanctions, or malpractice claims. The stakes are too high for unreliable delivery.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-red-100 rounded-full p-2 flex-shrink-0">
                  <Lock className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Confidential Documents</h3>
                  <p className="text-gray-600">Client confidentiality is paramount. Standard couriers don't understand the sensitivity of legal and financial documents.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-red-100 rounded-full p-2 flex-shrink-0">
                  <Clock className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Last-Minute Requests</h3>
                  <p className="text-gray-600">Clients need documents delivered urgently. Traditional services can't accommodate emergency requests or charge excessive premiums.</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Guaranteed Delivery</h3>
                  <p className="text-gray-600">100% on-time delivery guarantee with real-time tracking and immediate confirmation when documents are delivered.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Chain of Custody</h3>
                  <p className="text-gray-600">Professional handling with documented chain of custody, signature capture, and photo confirmation for complete peace of mind.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Emergency Response</h3>
                  <p className="text-gray-600">1-hour emergency delivery available 24/7. When you need it delivered now, we make it happen.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features for Professional Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Built for Professional Standards
            </h2>
            <p className="text-xl text-gray-600">
              Every feature designed for the highest level of professionalism
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Confidential Handling</h3>
              <p className="text-gray-600">All drivers are background-checked and trained in confidential document handling protocols.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Chain of Custody</h3>
              <p className="text-gray-600">Complete documentation trail from pickup to delivery with timestamps and signatures at every step.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Court Filing Service</h3>
              <p className="text-gray-600">Specialized court filing service with knowledge of local court procedures and filing requirements.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Emergency Service</h3>
              <p className="text-gray-600">Round-the-clock availability for urgent deliveries. When you need it now, we're here.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Appearance</h3>
              <p className="text-gray-600">Drivers dressed professionally and trained to represent your firm with the highest standards.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Storage</h3>
              <p className="text-gray-600">Temperature-controlled vehicles and secure storage for sensitive documents during transport.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Leading Professionals
            </h2>
            <p className="text-xl text-gray-600">
              See how professional services firms rely on Last Mile Express
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-2xl border">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6 text-lg">
                "Never missed a court deadline since switching to Last Mile Express. Their secure handling and reliable service gives us complete peace of mind. The emergency 1-hour service has saved us multiple times."
              </p>
              <div className="flex items-center">
                <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <span className="text-indigo-600 font-bold">MR</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Michael Rodriguez</div>
                  <div className="text-gray-600">Partner, Rodriguez & Associates Law</div>
                  <div className="text-sm text-indigo-600">100% on-time court filings</div>
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
                "The secure document handling and chain of custody documentation is exactly what we need for sensitive financial documents. Our clients trust us because we trust Last Mile Express."
              </p>
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">LK</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Lisa Kim</div>
                  <div className="text-gray-600">CPA, Kim & Partners Accounting</div>
                  <div className="text-sm text-blue-600">Secure confidential delivery</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Never Miss Another Deadline
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Join 25+ professional services firms who trust Last Mile Express with their most important deliveries
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onQuoteClick}
              size="lg"
              className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 text-lg"
            >
              Get Emergency Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-4 text-lg"
            >
              Schedule Consultation
            </Button>
          </div>
          <p className="text-sm text-indigo-200 mt-4">
            24/7 emergency service • Secure handling • 100% on-time guarantee
          </p>
        </div>
      </section>
    </div>
  )
}

export default ProfessionalLanding

