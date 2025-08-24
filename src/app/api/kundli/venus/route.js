import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { birthDetails, language = 'english' } = body;
    
    const API_CONFIG = {
      userId: '643886',
      apiKey: '8cfa24ac82f34fa17f090ed5a6a2122b9f3e10bf',
      baseUrl: 'https://json.astrologyapi.com/v1'
    };

    const getAuthHeader = () => {
      const credentials = `${API_CONFIG.userId}:${API_CONFIG.apiKey}`;
      return `Basic ${Buffer.from(credentials).toString('base64')}`;
    };

    // Set language for API call
    const apiLanguage = language === 'hindi' ? 'hi' : 'eng';

    const response = await fetch(`${API_CONFIG.baseUrl}/general_house_report/venus`, {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Language': apiLanguage
      },
      body: JSON.stringify(birthDetails),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error in venus API:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
} 