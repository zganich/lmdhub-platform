import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navigation from './components/Navigation'
import Homepage from './components/Homepage'
import RetailLanding from './components/RetailLanding'
import ProfessionalLanding from './components/ProfessionalLanding'
import SupplierLanding from './components/SupplierLanding'
import Pricing from './components/Pricing'
import HowItWorks from './components/HowItWorks'
import About from './components/About'
import Contact from './components/Contact'
import QuoteModal from './components/QuoteModal'
import LeadGenerator from './components/LeadGenerator'
import ROICalculator from './components/ROICalculator'
import CRMDashboard from './components/CRMDashboard'
import './App.css'

function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navigation onQuoteClick={() => setIsQuoteModalOpen(true)} />
        
        <Routes>
          <Route path="/" element={<Homepage onQuoteClick={() => setIsQuoteModalOpen(true)} />} />
          <Route path="/retail" element={<RetailLanding onQuoteClick={() => setIsQuoteModalOpen(true)} />} />
          <Route path="/professional" element={<ProfessionalLanding onQuoteClick={() => setIsQuoteModalOpen(true)} />} />
          <Route path="/suppliers" element={<SupplierLanding onQuoteClick={() => setIsQuoteModalOpen(true)} />} />
          <Route path="/pricing" element={<Pricing onQuoteClick={() => setIsQuoteModalOpen(true)} />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/leads" element={<LeadGenerator />} />
          <Route path="/roi-calculator" element={<ROICalculator />} />
          <Route path="/crm" element={<CRMDashboard />} />
        </Routes>

        <QuoteModal 
          isOpen={isQuoteModalOpen} 
          onClose={() => setIsQuoteModalOpen(false)} 
        />
      </div>
    </Router>
  )
}

export default App

