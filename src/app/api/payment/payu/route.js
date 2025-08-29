import { NextResponse } from 'next/server';
import { setPaymentContext } from '../_store';

// PayU Configuration (use env to switch Test/Live)
// Test defaults (PayU sample creds) are provided for local testing
const PAYU_CONFIG = {
  key: process.env.NEXT_PUBLIC_PAYU_KEY || 'gtKFFx',
  salt: process.env.NEXT_PUBLIC_PAYU_SALT || 'eCwWELxi',
  baseUrl: process.env.NEXT_PUBLIC_PAYU_BASE_URL || 'https://test.payu.in'
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { amount, planType, userData, txnid } = body;

    // Validate required fields
    if (!amount || !planType || !userData || !txnid) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Prepare udf1 payload (base64 JSON of plan and user)
    const udf1 = Buffer.from(JSON.stringify({ planType, userData })).toString('base64');

    // Generate hash for PayU (key|txnid|amount|productinfo|firstname|email|udf1|||||||||salt)
    const amountStr = String(amount);
    const hashString = [
      PAYU_CONFIG.key,
      txnid,
      amountStr,
      planType,
      userData.name,
      userData.email || 'user@example.com',
      udf1,
      '', '', '', '', '', '', '', '', '',
      PAYU_CONFIG.salt
    ].join('|');

    const hash = require('crypto').createHash('sha512').update(hashString).digest('hex');

    // PayU payment request data
    const paymentData = {
      key: PAYU_CONFIG.key,
      txnid: txnid,
      amount: amountStr,
      productinfo: planType,
      firstname: userData.name,
      email: userData.email || 'user@example.com',
      phone: userData.mobile || '9999999999',
      surl: `${process.env.NEXT_PUBLIC_BASE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')}/api/payment/success`,
      furl: `${process.env.NEXT_PUBLIC_BASE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')}/api/payment/failure`,
      hash: hash,
      // Pass-through data so we can generate the PDF after success
      udf1
    };

    // For testing, return a mock payment URL
    // In production, you would redirect to PayU's payment gateway
    const paymentUrl = `${PAYU_CONFIG.baseUrl}/_payment`;
    
    // Save minimal context for success step
    try { setPaymentContext(txnid, { userData, planType }); } catch (_) {}

    return NextResponse.json({
      success: true,
      paymentUrl,
      paymentData,
      message: 'Payment initiated successfully'
    });

  } catch (error) {
    console.error('PayU payment error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
