import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    return NextResponse.json({
      success: false,
      message: 'Payment failed. Please try again.',
      error: body
    }, { status: 400 });

  } catch (error) {
    console.error('Payment failure handler error:', error);
    return NextResponse.json(
      { success: false, message: 'Payment processing error' },
      { status: 500 }
    );
  }
}
