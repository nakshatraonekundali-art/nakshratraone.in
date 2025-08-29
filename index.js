

const api = 'mini_horoscope_pdf';
const userId = '643886';
const apiKey = '13dde4798b686f616d4b2c3a329fb980b244928a';
const language = 'hi';

const data = {
  // User Details
  name: "Ketan Gupta",   // 👈 yahan apne user ka naam dalna
  gender: "female",          // 👈 "male" / "female" / "other"
  day: 6,
  month: 1,
  year: 2025,
  hour: 7,
  min: 45,
  lat: 19.132,
  lon: 72.342,
  language: "en",          // 👈 "en", "hi", "ma", etc.
  tzone: 5.5,
  place: "Mumbai, Maharashtra, India", // 👈 birth place

  // Chart Preferences
  chart_style: "NORTH_INDIAN", // 👈 "NORTH_INDIAN" | "SOUTH_INDIAN" | "EAST_INDIAN"

  // Branding / Company Details
  footer_link: "https://www.okdriver.in",  // 👈 apna domain
  logo_url: "https://www.okdriver.in/logo.png", // 👈 apna logo ka URL
  company_name: "Ok Driver Pvt. Ltd.",
  company_info: "Ok Driver is your trusted astrology and kundli solution platform providing accurate predictions and remedies.",
  domain_url: "https://www.okdriver.in",
  company_email: "support@okdriver.in",
  company_landline: "+91-22-1234-5678",
  company_mobile: "+91-98765-43210"
};




const auth = "Basic " + Buffer.from(userId + ":" + apiKey).toString("base64");

(async () => {
  try {
    const response = await fetch(`https://pdf.astrologyapi.com/v1/${api}`, {
      method: "POST",
      headers: {
        "Authorization": auth,
        "Content-Type": "application/json",
        "Accept-Language": language
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const result = await response.json();
    console.log("result:", result);

  } catch (err) {
    console.error("Request failed:", err);
  }
})();
