// Payment and Referral System Configuration
export const paymentConfig = {
  // Stripe Configuration
  stripe: {
    publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_test_key_here',
    currency: 'usd',
    supportedPaymentMethods: ['card', 'apple_pay', 'google_pay'],
  },

  // Referral System Configuration
  referrals: {
    // Sender Referrals (people referring other senders)
    senderReferral: {
      codePrefix: 'SENDER',
      discountPercentage: 10, // 10% off for referred sender
      rewardAmount: 5.00, // $5 reward for referrer
      minOrderAmount: 25.00, // Minimum order to qualify
      expirationDays: 90, // Code expires in 90 days
    },

    // Courier Referrals (drivers referring other drivers)
    courierReferral: {
      codePrefix: 'COURIER',
      signupBonus: 25.00, // $25 bonus for new courier
      rewardAmount: 15.00, // $15 reward for referrer
      minDeliveries: 5, // Minimum deliveries to qualify
      expirationDays: 180, // Code expires in 180 days
    },

    // Sender Referrals (senders referring couriers)
    senderToCourier: {
      codePrefix: 'SENDCOURIER',
      discountPercentage: 15, // 15% off for sender
      rewardAmount: 10.00, // $10 reward for sender
      minDeliveries: 3, // Minimum deliveries by referred courier
      expirationDays: 120, // Code expires in 120 days
    },
  },

  // Coupon System Configuration
  coupons: {
    // First-time sender discount
    firstTimeSender: {
      code: 'FIRSTTIME',
      discountPercentage: 20,
      maxDiscount: 50.00,
      usageLimit: 1,
      minOrderAmount: 30.00,
    },

    // Business customer discount
    businessCustomer: {
      code: 'BUSINESS',
      discountPercentage: 15,
      maxDiscount: 100.00,
      usageLimit: 5,
      minOrderAmount: 50.00,
    },

    // Seasonal promotions
    seasonal: {
      code: 'HOLIDAY',
      discountPercentage: 12,
      maxDiscount: 75.00,
      usageLimit: 3,
      minOrderAmount: 40.00,
      validUntil: '2024-12-31',
    },

    // Volume discount
    volume: {
      code: 'VOLUME',
      discountPercentage: 8,
      maxDiscount: 200.00,
      usageLimit: 10,
      minOrderAmount: 100.00,
    },
  },

  // Payment Processing Fees
  fees: {
    processingFee: 0.029, // 2.9%
    fixedFee: 0.30, // $0.30
    internationalFee: 0.039, // 3.9% for international
  },

  // Delivery Pricing Tiers
  pricingTiers: {
    sameDay: {
      basePrice: 25.00,
      perMile: 2.50,
      rushFee: 10.00,
    },
    nextDay: {
      basePrice: 18.00,
      perMile: 2.00,
      rushFee: 5.00,
    },
    standard: {
      basePrice: 15.00,
      perMile: 1.75,
      rushFee: 0.00,
    },
  },
};

// Referral Code Generation
export const generateReferralCode = (type, userId) => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  const prefix = paymentConfig.referrals[type]?.codePrefix || 'REF';
  return `${prefix}${userId}${timestamp}${random}`.toUpperCase();
};

// Coupon Code Validation
export const validateCouponCode = (code, orderAmount) => {
  const coupon = paymentConfig.coupons[code.toLowerCase()];
  if (!coupon) return { valid: false, message: 'Invalid coupon code' };
  
  if (orderAmount < coupon.minOrderAmount) {
    return { 
      valid: false, 
      message: `Minimum order amount of $${coupon.minOrderAmount} required` 
    };
  }

  return { 
    valid: true, 
    discount: Math.min(
      (orderAmount * coupon.discountPercentage / 100),
      coupon.maxDiscount
    ),
    coupon 
  };
};

// Referral Code Validation
export const validateReferralCode = (code, userType) => {
  // Check if it's a sender referral code
  if (code.startsWith('SENDER')) {
    return { 
      valid: true, 
      type: 'senderReferral',
      discount: paymentConfig.referrals.senderReferral.discountPercentage,
      reward: paymentConfig.referrals.senderReferral.rewardAmount
    };
  }

  // Check if it's a courier referral code
  if (code.startsWith('COURIER')) {
    return { 
      valid: true, 
      type: 'courierReferral',
      bonus: paymentConfig.referrals.courierReferral.signupBonus,
      reward: paymentConfig.referrals.courierReferral.rewardAmount
    };
  }

  // Check if it's a sender-to-courier referral code
  if (code.startsWith('SENDCOURIER')) {
    return { 
      valid: true, 
      type: 'senderToCourier',
      discount: paymentConfig.referrals.senderToCourier.discountPercentage,
      reward: paymentConfig.referrals.senderToCourier.rewardAmount
    };
  }

  return { valid: false, message: 'Invalid referral code' };
};
