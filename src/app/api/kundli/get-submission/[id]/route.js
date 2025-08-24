import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return new Response(JSON.stringify({ message: "Analysis ID is required" }), { status: 400 });
    }

    // Extract user ID from the analysis ID format: KUNDLI_1_1755238009995
    const userId = id.split('_')[1];
    
    if (!userId) {
      return new Response(JSON.stringify({ message: "Invalid analysis ID format" }), { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      include: {
        userPlans: {
          include: {
            plan: true
          }
        }
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    // Generate analysis data based on user's birth details
    const analysisData = {
      id: id,
      user: user,
      analysis: {
        sunSign: getSunSign(user.birthDate),
        moonSign: getMoonSign(user.birthDate),
        ascendant: getAscendant(user.birthTime),
        nakshatra: getNakshatra(user.birthDate),
        doshas: getDoshas(user.birthDate, user.gender),
        strengths: getStrengths(user.birthDate),
        weaknesses: getWeaknesses(user.birthDate),
        recommendations: getRecommendations(user.birthDate, user.gender)
      }
    };

    return new Response(JSON.stringify(analysisData), { status: 200 });
  } catch (error) {
    console.error("Error fetching kundli submission:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// Helper functions to generate analysis data
function getSunSign(birthDate) {
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  return 'Pisces';
}

function getMoonSign(birthDate) {
  const signs = ['Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini'];
  return signs[birthDate.getDate() % 12];
}

function getAscendant(birthTime) {
  const hour = parseInt(birthTime.split(':')[0]);
  const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  return signs[hour % 12];
}

function getNakshatra(birthDate) {
  const nakshatras = ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'];
  return nakshatras[birthDate.getDate() % 27];
}

function getDoshas(birthDate, gender) {
  const doshas = [];
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1;
  
  if (day === 4 || day === 8 || day === 12 || day === 16 || day === 20 || day === 24 || day === 28) {
    doshas.push('Mangal Dosha');
  }
  if (month === 7 || month === 8) {
    doshas.push('Shani Dosha');
  }
  if (gender === 'Female' && (day === 6 || day === 14 || day === 22)) {
    doshas.push('Ketu Dosha');
  }
  
  return doshas.length > 0 ? doshas : ['No major doshas detected'];
}

function getStrengths(birthDate) {
  const strengths = ['Strong Jupiter', 'Benefic Venus', 'Well-placed Sun', 'Favorable Moon'];
  return strengths.slice(0, 2 + (birthDate.getDate() % 2));
}

function getWeaknesses(birthDate) {
  const weaknesses = ['Weak Mars', 'Afflicted Mercury', 'Challenged Saturn'];
  return weaknesses.slice(0, 1 + (birthDate.getDate() % 2));
}

function getRecommendations(birthDate, gender) {
  const recommendations = [
    'Wear red coral gemstone',
    'Perform Mars remedies on Tuesdays',
    'Chant Hanuman Chalisa daily',
    'Donate red items on Tuesdays',
    'Fast on Saturdays',
    'Wear yellow clothes on Thursdays',
    'Visit Hanuman temple regularly',
    'Practice meditation daily',
    'Use copper vessel for water'
  ];
  
  const startIndex = birthDate.getDate() % recommendations.length;
  return recommendations.slice(startIndex, startIndex + 3);
} 