import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Separator } from '@/components/ui/separator.jsx';
import { 
  CreditCard, 
  Gift, 
  Users, 
  Truck, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  DollarSign,
  Percent,
  UserPlus,
  Copy,
  Check
} from 'lucide-react';
import { paymentConfig, validateCouponCode, validateReferralCode } from '../config/paymentConfig';

// Load Stripe
const stripePromise = loadStripe(paymentConfig.stripe.publishableKey);

// Payment form component
const PaymentFormComponent = ({ 
  amount, 
  onPaymentSuccess, 
  onPaymentError, 
  deliveryDetails,
  userType = 'sender' // 'sender' or 'courier'
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [couponValidation, setCouponValidation] = useState(null);
  const [referralValidation, setReferralValidation] = useState(null);
  const [discounts, setDiscounts] = useState({
    coupon: 0,
    referral: 0,
    total: 0
  });
  const [finalAmount, setFinalAmount] = useState(amount);
  const [showReferralInfo, setShowReferralInfo] = useState(false);

  useEffect(() => {
    calculateFinalAmount();
  }, [amount, discounts]);

  const calculateFinalAmount = () => {
    const totalDiscount = discounts.coupon + discounts.referral;
    const final = Math.max(0, amount - totalDiscount);
    setFinalAmount(final);
    setDiscounts(prev => ({ ...prev, total: totalDiscount }));
  };

  const handleCouponValidation = () => {
    if (!couponCode.trim()) {
      setCouponValidation({ valid: false, message: 'Please enter a coupon code' });
      return;
    }

    const validation = validateCouponCode(couponCode.toUpperCase(), amount);
    setCouponValidation(validation);

    if (validation.valid) {
      setDiscounts(prev => ({ ...prev, coupon: validation.discount }));
    } else {
      setDiscounts(prev => ({ ...prev, coupon: 0 }));
    }
  };

  const handleReferralValidation = () => {
    if (!referralCode.trim()) {
      setReferralValidation({ valid: false, message: 'Please enter a referral code' });
      return;
    }

    const validation = validateReferralCode(referralCode.toUpperCase(), userType);
    setReferralValidation(validation);

    if (validation.valid) {
      if (validation.type === 'senderReferral') {
        const discount = (amount * validation.discount / 100);
        setDiscounts(prev => ({ ...prev, referral: discount }));
      } else if (validation.type === 'courierReferral' && userType === 'courier') {
        // For courier signup, show bonus info
        setShowReferralInfo(true);
      }
    } else {
      setDiscounts(prev => ({ ...prev, referral: 0 }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      // Create payment intent on your backend
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(finalAmount * 100), // Convert to cents
          currency: paymentConfig.stripe.currency,
          couponCode: couponCode.toUpperCase(),
          referralCode: referralCode.toUpperCase(),
          deliveryDetails,
          userType
        }),
      });

      const { clientSecret } = await response.json();

      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: deliveryDetails?.contactName || 'Delivery Customer',
            email: deliveryDetails?.email || '',
          },
        },
      });

      if (error) {
        onPaymentError(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        onPaymentSuccess({
          paymentIntent,
          couponCode: couponCode.toUpperCase(),
          referralCode: referralCode.toUpperCase(),
          discounts,
          finalAmount
        });
      }
    } catch (error) {
      onPaymentError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyReferralCode = (code) => {
    navigator.clipboard.writeText(code);
    // You could add a toast notification here
  };

  const getReferralCodeInfo = () => {
    if (userType === 'sender') {
      return {
        title: 'Sender Referral Program',
        description: 'Refer other senders and earn rewards!',
        benefits: [
          '10% discount for referred sender',
          '$5 reward for you',
          'Valid for 90 days'
        ]
      };
    } else {
      return {
        title: 'Courier Referral Program',
        description: 'Refer other couriers and earn bonuses!',
        benefits: [
          '$25 signup bonus for new courier',
          '$15 reward for you',
          'Valid for 180 days'
        ]
      };
    }
  };

  return (
    <div className="space-y-6">
      {/* Referral & Coupon Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Discounts & Referrals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Coupon Code */}
          <div className="space-y-2">
            <Label htmlFor="coupon">Coupon Code</Label>
            <div className="flex gap-2">
              <Input
                id="coupon"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1"
              />
              <Button 
                variant="outline" 
                onClick={handleCouponValidation}
                disabled={!couponCode.trim()}
              >
                Apply
              </Button>
            </div>
            {couponValidation && (
              <div className={`flex items-center gap-2 text-sm ${
                couponValidation.valid ? 'text-green-600' : 'text-red-600'
              }`}>
                {couponValidation.valid ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                {couponValidation.message}
              </div>
            )}
          </div>

          {/* Referral Code */}
          <div className="space-y-2">
            <Label htmlFor="referral">Referral Code</Label>
            <div className="flex gap-2">
              <Input
                id="referral"
                placeholder="Enter referral code"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                className="flex-1"
              />
              <Button 
                variant="outline" 
                onClick={handleReferralValidation}
                disabled={!referralCode.trim()}
              >
                Apply
              </Button>
            </div>
            {referralValidation && (
              <div className={`flex items-center gap-2 text-sm ${
                referralValidation.valid ? 'text-green-600' : 'text-red-600'
              }`}>
                {referralValidation.valid ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                {referralValidation.message}
              </div>
            )}
          </div>

          {/* Referral Program Info */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-900">Referral Program</span>
            </div>
            <p className="text-sm text-blue-700 mb-2">
              {getReferralCodeInfo().description}
            </p>
            <ul className="text-sm text-blue-700 space-y-1">
              {getReferralCodeInfo().benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Payment Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Base Amount:</span>
              <span>${amount.toFixed(2)}</span>
            </div>
            
            {discounts.coupon > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Coupon Discount:</span>
                <span>-${discounts.coupon.toFixed(2)}</span>
              </div>
            )}
            
            {discounts.referral > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Referral Discount:</span>
                <span>-${discounts.referral.toFixed(2)}</span>
              </div>
            )}
            
            <Separator />
            
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>${finalAmount.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Card Details</Label>
              <div className="border rounded-md p-3">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                  }}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={!stripe || loading || finalAmount <= 0}
              className="w-full"
            >
              {loading ? 'Processing...' : `Pay $${finalAmount.toFixed(2)}`}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Referral Code Generation (for existing users) */}
      {showReferralInfo && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Your Referral Code
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Share this code with friends and earn rewards when they sign up!
              </p>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                <code className="flex-1 font-mono text-lg">
                  {referralCode.toUpperCase()}
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyReferralCode(referralCode.toUpperCase())}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-sm text-gray-600">
                <p>• Share with other {userType === 'sender' ? 'senders' : 'couriers'}</p>
                <p>• Earn rewards when they complete their first order</p>
                <p>• Codes are valid for {userType === 'sender' ? '90' : '180'} days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Wrapper component with Stripe Elements
const PaymentForm = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentFormComponent {...props} />
    </Elements>
  );
};

export default PaymentForm;
