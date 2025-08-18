import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Menu, X, Mountain, Truck, Phone } from 'lucide-react'

const Navigation = ({ onQuoteClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative">
              <Mountain className="h-8 w-8 text-blue-600" />
              <Truck className="h-4 w-4 text-orange-500 absolute -bottom-1 -right-1" />
            </div>
            <span className="text-xl font-bold text-gray-900">Last Mile Express</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 font-medium">
                Solutions
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-2">
                  <Link 
                    to="/retail" 
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                  >
                    <div className="font-medium">Retail & E-commerce</div>
                    <div className="text-xs text-gray-500">Same-day delivery for stores</div>
                  </Link>
                  <Link 
                    to="/professional" 
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                  >
                    <div className="font-medium">Professional Services</div>
                    <div className="text-xs text-gray-500">Secure document delivery</div>
                  </Link>
                  <Link 
                    to="/suppliers" 
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                  >
                    <div className="font-medium">Local Suppliers</div>
                    <div className="text-xs text-gray-500">Emergency parts delivery</div>
                  </Link>
                </div>
              </div>
            </div>
            
            <Link 
              to="/pricing" 
              className={`font-medium ${isActive('/pricing') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Pricing
            </Link>
            <Link 
              to="/how-it-works" 
              className={`font-medium ${isActive('/how-it-works') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              How It Works
            </Link>
            <Link 
              to="/about" 
              className={`font-medium ${isActive('/about') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium ${isActive('/contact') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Contact
            </Link>
            
            {/* Business Tools Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 font-medium">
                Business Tools
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-2">
                  <Link 
                    to="/leads" 
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                  >
                    <div className="font-medium">Lead Generator</div>
                    <div className="text-xs text-gray-500">Find potential customers</div>
                  </Link>
                  <Link 
                    to="/roi-calculator" 
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                  >
                    <div className="font-medium">ROI Calculator</div>
                    <div className="text-xs text-gray-500">Calculate cost savings</div>
                  </Link>
                  <Link 
                    to="/crm" 
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                  >
                    <div className="font-medium">CRM Dashboard</div>
                    <div className="text-xs text-gray-500">Manage leads & customers</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <a 
              href="tel:801-555-0123" 
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="text-sm font-medium">(801) 555-0123</span>
            </a>
            <Button 
              onClick={onQuoteClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
            >
              Get Instant Quote
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/retail" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Retail & E-commerce
              </Link>
              <Link 
                to="/professional" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Professional Services
              </Link>
              <Link 
                to="/suppliers" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Local Suppliers
              </Link>
              <Link 
                to="/pricing" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                to="/how-it-works" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                to="/about" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              {/* Business Tools Mobile */}
              <div className="border-t pt-3 mt-3">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Business Tools
                </div>
                <Link 
                  to="/leads" 
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Lead Generator
                </Link>
                <Link 
                  to="/roi-calculator" 
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ROI Calculator
                </Link>
                <Link 
                  to="/crm" 
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  CRM Dashboard
                </Link>
              </div>
              <div className="border-t pt-3 mt-3">
                <a 
                  href="tel:801-555-0123" 
                  className="block px-3 py-2 text-gray-600 hover:text-blue-600"
                >
                  📞 (801) 555-0123
                </a>
                <Button 
                  onClick={() => {
                    onQuoteClick()
                    setIsMenuOpen(false)
                  }}
                  className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Get Instant Quote
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation

