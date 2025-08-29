
import { NextResponse } from 'next/server';

// Astrology API Configuration from index.js
const API_CONFIG = {
  userId: '643886',
  apiKey: '13dde4798b686f616d4b2c3a329fb980b244928a',
  baseUrl: 'https://pdf.astrologyapi.com/v1'
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { userData, planType } = body;

    // Validate required fields
    if (!userData || !planType) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Prepare data for PDF generation based on index.js structure
    const pdfData = {
      // User Details from KundliContext
      name: userData.name,
      gender: userData.gender?.toLowerCase() || 'male',
      day: parseInt(userData.day) || 1,
      month: parseInt(userData.month) || 1,
      year: parseInt(userData.year) || 2000,
      hour: parseInt(userData.hour) || 12,
      min: parseInt(userData.min) || 0,
      lat: userData.latitude || 19.132,
      lon: userData.longitude || 72.342,
      language: userData.language === 'hindi' ? 'hi' : 'en',
      tzone: userData.timezone || 5.5,
      place: `${userData.city}, ${userData.country}`,

      // Chart Preferences
      chart_style: "NORTH_INDIAN",

      // Branding / Company Details
      footer_link: "https://nakshatraone.com",
      logo_url: "https://nakshatraone.com/logo.png",
      company_name: "NakshatraOne",
      company_info: "NakshatraOne is your trusted astrology and kundli solution platform providing accurate predictions and remedies.",
      domain_url: "https://nakshatraone.com",
      company_email: "support@nakshatraone.com",
      company_landline: "+91-22-1234-5678",
      company_mobile: "+91-98765-43210"
    };

    // Generate auth header
    const auth = "Basic " + Buffer.from(API_CONFIG.userId + ":" + API_CONFIG.apiKey).toString("base64");

    // Determine API endpoint based on plan type
    let apiEndpoint = 'mini_horoscope_pdf';
    if (planType === 'basic') {
      apiEndpoint = 'basic_horoscope_pdf';
    } else if (planType === 'professional') {
      apiEndpoint = 'pro_horoscope_pdf';
    }

    // Call astrology API to generate PDF
    const response = await fetch(`${API_CONFIG.baseUrl}/${apiEndpoint}`, {
      method: "POST",
      headers: {
        "Authorization": auth,
        "Content-Type": "application/json",
        "Accept-Language": pdfData.language
      },
      body: JSON.stringify(pdfData)
    });

    if (!response.ok) {
      throw new Error(`PDF API Error: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    
    if (result.status === true && result.pdf_url) {
      return NextResponse.json({
        success: true,
        pdf_url: result.pdf_url,
        message: result.msg || 'PDF generated successfully'
      });
    } else {
      throw new Error(result.msg || 'PDF generation failed');
    }

  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
