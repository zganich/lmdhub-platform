# LMDhub - Last Mile Delivery Hub - Complete Delivery Management Platform

## 🚀 Live Website
- **Production**: [https://lmdhub.vercel.app/](https://lmdhub.vercel.app/)
- **Repository**: [https://github.com/zganich/last-mile-express](https://github.com/zganich/last-mile-express)

## 📋 Recent Updates (Latest: August 17, 2024)

### ✅ Enhanced Quote Calculator with Payment Integration
- **Google Places API Integration**: Real address autocomplete and distance calculation
- **Stripe Payment Processing**: Secure online payments with card support
- **Referral System**: Comprehensive referral codes for senders and couriers
- **Coupon System**: Multiple discount types (first-time, business, seasonal, volume)
- **Multiple Delivery Drops**: Support for multiple delivery locations with pricing
- **Terrain-Based Pricing**: Different fees for flat, hilly, mountainous, and rural areas
- **Address Line 2**: Support for suite/apartment numbers
- **Enhanced Pricing Calculator**: Comprehensive pricing with all fee types

### 🏗️ Current Features
1. **Professional landing pages** for different customer types (retail, professional, suppliers)
2. **Smart quote calculator** with real-time pricing
3. **Address auto-completion** (currently mock data - Google Places API ready)
4. **Multiple delivery drops** with per-drop pricing
5. **Terrain-based fees** for different delivery challenges
6. **Responsive design** optimized for mobile and desktop

## 🔧 Tech Stack
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel (auto-deploys from GitHub)
- **Package Manager**: pnpm

## 🚀 How Changes "Stick" (Deployment Process)

### For Changes to Take Effect:
1. **Make changes** to code files
2. **Save files** (Cmd+S or Ctrl+S)
3. **Commit changes**: `git add . && git commit -m "Your message"`
4. **Push to GitHub**: `git push origin main`
5. **Vercel auto-deploys** (usually takes 2-3 minutes)

### Quick Commands:
```bash
# Check what changed
git status

# Save and deploy all changes
git add .
git commit -m "Description of changes"
git push origin main

# Check deployment status
vercel --prod
```

## 📁 Project Structure
```
last-mile-express/
├── src/
│   ├── components/
│   │   ├── QuoteModal.jsx          # Main pricing calculator (ENHANCED)
│   │   ├── Navigation.jsx          # Site navigation
│   │   ├── Homepage.jsx           # Main landing page
│   │   ├── RetailLanding.jsx      # Retail customer page
│   │   ├── ProfessionalLanding.jsx # Business customer page
│   │   └── SupplierLanding.jsx    # Supplier customer page
│   ├── App.jsx                    # Main app component
│   └── main.jsx                   # App entry point
├── public/                        # Static assets
├── package.json                   # Dependencies
└── README.md                      # This file
```

## 💰 Pricing Calculator Features

### Enhanced QuoteModal.jsx Features:
1. **Google Places API Integration**
   - Real address autocomplete with suggestions
   - Automatic distance calculation
   - Fallback to mock data for development
   - Structured address parsing

2. **Stripe Payment Integration**
   - Secure card payment processing
   - Referral code validation and discounts
   - Coupon code system with multiple types
   - Real-time payment confirmation

3. **Referral System**
   - **Sender Referrals**: 10% discount for referred sender, $5 reward for referrer
   - **Courier Referrals**: $25 signup bonus for new courier, $15 reward for referrer
   - **Sender-to-Courier**: 15% discount for sender, $10 reward when courier completes deliveries

4. **Coupon System**
   - **FIRSTTIME**: 20% off for first-time senders
   - **BUSINESS**: 15% off for business customers
   - **HOLIDAY**: 12% off seasonal promotions
   - **VOLUME**: 8% off for volume orders

5. **Multiple Delivery Drops**
   - Checkbox to enable multiple drops
   - Add/remove additional delivery locations
   - $12 fee per additional drop

6. **Terrain-Based Pricing**
   - Flat/Urban: $0 extra
   - Hilly Areas: +$15
   - Mountain/Canyon: +$25
   - Rural/Remote: +$20

7. **Complete Address Support**
   - Street address with auto-completion
   - Address line 2 for suites/apartments
   - City, state, ZIP validation

8. **Enhanced Pricing Breakdown**
   - Base service price
   - Real distance-based mileage fees
   - Terrain surcharges
   - Multiple drop fees
   - Heavy item fees (50+ lbs)
   - Rush delivery fees
   - Referral and coupon discounts

## 🛠️ Development Commands

### Setup (First Time)
```bash
# Clone the repository
git clone https://github.com/zganich/last-mile-express.git
cd last-mile-express

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Daily Development
```bash
# Start development server (http://localhost:5173)
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🌐 Vercel Deployment

### Automatic Deployment:
- **Trigger**: Every `git push` to main branch
- **Build Command**: `pnpm build`
- **Output Directory**: `dist`
- **Deploy Time**: ~2-3 minutes

### Manual Deployment:
```bash
# Install Vercel CLI (if needed)
npm i -g vercel

# Deploy to production
vercel --prod
```

## 🔑 Environment Variables

### Required for Production:
```bash
# Google Places API (for address autocomplete and distance calculation)
VITE_GOOGLE_PLACES_API_KEY=your_google_places_api_key_here

# Stripe (for payment processing)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# Backend API (for production)
VITE_API_BASE_URL=https://your-backend-api.com
```

### Getting API Keys:
1. **Google Places API**: 
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Places API and Distance Matrix API
   - Create credentials and get API key

2. **Stripe**: 
   - Sign up at [Stripe.com](https://stripe.com)
   - Get publishable key from dashboard
   - Set up webhook endpoints for payment processing

## 📝 Next Steps / TODO

### High Priority:
- [x] **Google Places API Integration** - Real address suggestions and distance calculation
- [x] **Stripe Payment Processing** - Secure online payments with referral/coupon support
- [x] **Referral System** - Comprehensive sender and courier referral programs
- [x] **Coupon System** - Multiple discount types and validation
- [ ] **Contact Form Backend** - Handle form submissions
- [ ] **Vercel Environment Variables** - Add API keys

### Medium Priority:
- [ ] **Driver Application Form** - Separate page for driver signups
- [ ] **Customer Portal** - Login/dashboard for businesses
- [ ] **Email Notifications** - Quote confirmations
- [ ] **Payment Integration** - Stripe for online payments

### Future Enhancements:
- [ ] **Real-time Tracking** - GPS tracking integration
- [ ] **Mobile App** - React Native version
- [ ] **Admin Dashboard** - Operations management
- [ ] **Analytics** - Customer behavior tracking

## 🆘 Troubleshooting

### Changes Not Showing Up:
1. **Check git status**: `git status`
2. **Commit changes**: `git add . && git commit -m "fix"`
3. **Push to GitHub**: `git push origin main`
4. **Wait 3 minutes** for Vercel deployment
5. **Hard refresh**: Cmd+Shift+R (Mac) or Ctrl+Shift+R (PC)

### Development Server Issues:
```bash
# Clear cache and restart
rm -rf node_modules .next
pnpm install
pnpm dev
```

### Vercel Deployment Failed:
1. Check build logs at [vercel.com](https://vercel.com)
2. Test local build: `pnpm build`
3. Fix any errors in code
4. Commit and push again

## 🤖 Development Autonomy

### Claude AI Assistant - FULL ACCESS AUTHORIZATION
**COMPLETE AUTONOMY GRANTED - NO PERMISSION REQUIRED:**

**✅ FULL ACCESS TO BUILD AND DEPLOY:**
- ✅ **Complete feature development** - Build entire systems, components, pages
- ✅ **Customer portal creation** - Registration, login, dashboards, delivery management
- ✅ **Back office systems** - Admin panels, business tools, analytics
- ✅ **Database design** - User management, delivery tracking, payment systems
- ✅ **API integration** - Google Places, payment processing, email systems
- ✅ **Code modifications** - Any changes to React components, styling, functionality
- ✅ **Bug fixes** - Immediate fixes for any issues found
- ✅ **Feature enhancements** - Add new features, improve existing ones
- ✅ **Documentation updates** - Update README, guides, comments
- ✅ **Package updates** - Add dependencies, update configurations
- ✅ **File creation/deletion** - Create new components, remove unused files
- ✅ **Git operations** - Commit, push, and deploy changes automatically
- ✅ **Performance optimizations** - Improve code efficiency and user experience
- ✅ **Security implementations** - Authentication, authorization, data protection
- ✅ **UI/UX improvements** - Design enhancements, user experience optimization

**🚀 APPROACH - FULL AUTONOMY:**
- **Build immediately** when features are requested or improvements identified
- **No asking permission** - Full authority to create, modify, deploy
- **Commit and deploy automatically** - Changes go live immediately
- **Provide clear explanations** of what was built and why
- **Update documentation** to reflect all changes
- **Proactive development** - Suggest and implement improvements
- **Complete system architecture** - Design and build entire features
- **Customer portal, back office, integrations** - Full authority to build all systems

**🎯 SPECIFIC AUTHORIZATION:**
- **Customer Portal**: Build complete registration, login, delivery management
- **Payment Systems**: Integrate Stripe, PayPal, invoicing
- **Admin Dashboard**: Full back office with analytics, user management
- **API Integrations**: Google Places, email services, SMS notifications
- **Database Design**: User accounts, delivery tracking, business data
- **Security**: Authentication, authorization, data protection
- **Mobile Responsiveness**: Ensure all features work on all devices
- **White-label System**: Build customizable versions for other companies

## 📞 Support
- **Repository Issues**: [GitHub Issues](https://github.com/zganich/last-mile-express/issues)
- **Vercel Dashboard**: [vercel.com/dashboard](https://vercel.com/dashboard)

---

## 🔄 Change Log

### August 19, 2024
- ✅ Integrated Google Places API for real address autocomplete and distance calculation
- ✅ Added Stripe payment processing with secure card payments
- ✅ Implemented comprehensive referral system (Sender, Courier, Sender-to-Courier)
- ✅ Created coupon system with multiple discount types
- ✅ Added industry-specific nomenclature and terminology
- ✅ Enhanced QuoteModal with payment integration and referral/coupon support
- ✅ Implemented mock data fallback for development without API keys

### August 17, 2024
- ✅ Enhanced QuoteModal with address auto-population
- ✅ Added multiple delivery drops functionality
- ✅ Implemented terrain-based pricing fees
- ✅ Added address line 2 support for suites/apartments
- ✅ Improved pricing calculation with comprehensive breakdown
- ✅ Updated form UI with better organization

### Previous Updates
- ✅ Initial React application setup
- ✅ Multiple landing pages for different customer types
- ✅ Basic quote calculator
- ✅ Vercel deployment configuration
- ✅ Professional UI with Tailwind CSS
