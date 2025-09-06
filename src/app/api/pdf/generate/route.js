import { NextResponse } from 'next/server';

// Astrology API Configuration
const API_CONFIG = {
  userId: '643886',
  apiKey: '13dde4798b686f616d4b2c3a329fb980b244928a',
  baseUrl: 'https://pdf.astrologyapi.com/v1'
};

const monthMap = {
  january: 1, february: 2, march: 3, april: 4,
  may: 5, june: 6, july: 7, august: 8,
  september: 9, october: 10, november: 11, december: 12
};

// Input validation helper
function validateUserData(userData) {
  const errors = [];
  
  if (!userData.name?.trim()) errors.push('Name is required');
  if (!userData.day || userData.day < 1 || userData.day > 31) errors.push('Valid day is required');
  if (!userData.year || userData.year < 1900 || userData.year > new Date().getFullYear()) {
    errors.push('Valid year is required');
  }
  if (userData.hour !== undefined && (userData.hour < 0 || userData.hour > 23)) {
    errors.push('Hour must be between 0-23');
  }
  if (userData.min !== undefined && (userData.min < 0 || userData.min > 59)) {
    errors.push('Minutes must be between 0-59');
  }
  
  return errors;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { userData, planType } = body;

    // Basic validation
    if (!userData || !planType) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields: userData and planType' },
        { status: 400 }
      );
    }

    // Validate input data
    const validationErrors = validateUserData(userData);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Validation errors', errors: validationErrors },
        { status: 400 }
      );
    }

    // Convert month (string -> number)
    let monthValue = parseInt(userData.month);
    if (isNaN(monthValue)) {
      monthValue = monthMap[userData.month?.toLowerCase()];
      if (!monthValue) {
        return NextResponse.json(
          { success: false, message: 'Invalid month provided' },
          { status: 400 }
        );
      }
    }

    // Validate plan type
    const validPlanTypes = ['mini', 'basic', 'professional'];
    if (!validPlanTypes.includes(planType)) {
      return NextResponse.json(
        { success: false, message: 'Invalid plan type. Must be: mini, basic, or professional' },
        { status: 400 }
      );
    }

    // Prepare data for PDF generation
    const pdfData = {
      name: userData.name.trim(),
      gender: userData.gender?.toLowerCase() || 'male',
      day: parseInt(userData.day),
      month: monthValue,
      year: parseInt(userData.year),
      hour: parseInt(userData.hour) || 12,
      min: parseInt(userData.min) || 0,
      lat: parseFloat(userData.latitude) || 19.132, // Default to Mumbai
      lon: parseFloat(userData.longitude) || 72.342,
      language: userData.language === 'hindi' ? 'hi' : 'en',
      tzone: parseFloat(userData.timezone) || 5.5,
      place: `${userData.city || 'Unknown'}, ${userData.country || 'India'}`,
      chart_style: "NORTH_INDIAN",
      footer_link: "https://nakshatraone.in",
      logo_url: "https://cdn.shopify.com/s/files/1/0933/4082/7954/files/logo_new-removebg-preview.png?v=1757161162", // Fixed: Direct reference to public folder
      company_name: "NakshatraOne",
      company_info: "NakshatraOne is your trusted astrology and kundli solution platform providing accurate predictions and remedies.",
      domain_url: "https://nakshatraone.in",
      company_email: "nakshatraonekundali@gmail.com",
    };

    // Generate auth header
    const auth = "Basic " + Buffer.from(`${API_CONFIG.userId}:${API_CONFIG.apiKey}`).toString("base64");

    // Determine API endpoint based on plan type
    const endpointMap = {
      mini: 'mini_horoscope_pdf',
      basic: 'basic_horoscope_pdf',
      professional: 'pro_horoscope_pdf'
    };
    const apiEndpoint = endpointMap[planType];

    console.log(`Generating ${planType} PDF for ${userData.name}`);

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
      const errorText = await response.text();
      console.error(`PDF API Error: ${response.status} - ${response.statusText}`, errorText);
      throw new Error(`PDF API Error: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    
    if (result.status === true && result.pdf_url) {
      return NextResponse.json({
        success: true,
        pdf_url: result.pdf_url,
        message: result.msg || 'PDF generated successfully',
        plan_type: planType
      });
    } else {
      throw new Error(result.msg || 'PDF generation failed - no PDF URL returned');
    }

  } catch (error) {
    console.error('PDF generation error:', error);
    
    // Return appropriate error message
    let errorMessage = 'Internal server error occurred';
    let statusCode = 500;
    
    if (error.message.includes('PDF API Error')) {
      errorMessage = 'Failed to generate PDF from astrology service';
      statusCode = 502; // Bad Gateway
    } else if (error.message.includes('JSON')) {
      errorMessage = 'Invalid request format';
      statusCode = 400;
    }
    
    return NextResponse.json(
      { success: false, message: errorMessage, error: error.message },
      { status: statusCode }
    );
  }
}