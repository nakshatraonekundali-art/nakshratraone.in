import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { birthDetails, chartType = 'D1', language = 'english' } = body;
    
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

    // Fetch chart data
    const chartResponse = await fetch(`${API_CONFIG.baseUrl}/chart`, {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Language': apiLanguage
      },
      body: JSON.stringify({ ...birthDetails, chart_type: chartType }),
    });

    if (!chartResponse.ok) {
      throw new Error(`Chart API Error: ${chartResponse.status} - ${chartResponse.statusText}`);
    }

    const chartData = await chartResponse.json();

    // Fetch chart image
    const imageResponse = await fetch(`${API_CONFIG.baseUrl}/chart_image`, {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Language': apiLanguage
      },
      body: JSON.stringify({ ...birthDetails, chart_type: chartType }),
    });

    if (!imageResponse.ok) {
      throw new Error(`Chart Image API Error: ${imageResponse.status} - ${imageResponse.statusText}`);
    }

    const chartImage = await imageResponse.json();

    return NextResponse.json({ 
      success: true, 
      chartData, 
      chartImage 
    });
  } catch (error) {
    console.error('Error in chart API:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
} 