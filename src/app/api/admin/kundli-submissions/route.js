import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const search = searchParams.get('search') || '';
    const filter = searchParams.get('filter') || 'all'; // all, withPlan, withoutPlan

    const skip = (page - 1) * limit;

    // Build where clause
    let whereClause = {};
    
    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { birthCity: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Get users with their plan information
    const users = await prisma.user.findMany({
      where: whereClause,
      include: {
        userPlans: {
          include: {
            plan: true
          }
        }
      },
      orderBy: {
        id: 'desc'
      },
      skip,
      take: limit
    });

    // Filter based on plan status if needed
    let filteredUsers = users;
    if (filter === 'withPlan') {
      filteredUsers = users.filter(user => user.userPlans.length > 0);
    } else if (filter === 'withoutPlan') {
      filteredUsers = users.filter(user => user.userPlans.length === 0);
    }

    // Get total count for pagination
    const totalUsers = await prisma.user.count({ where: whereClause });

    // Transform data for better display
    const transformedUsers = filteredUsers.map(user => ({
      id: user.id,
      name: user.name,
      gender: user.gender,
      birthDate: user.birthDate,
      birthTime: user.birthTime,
      birthCity: user.birthCity,
      birthCountry: user.birthCountry,
      email: user.email,
      hasPlan: user.userPlans.length > 0,
      currentPlan: user.userPlans.length > 0 ? user.userPlans[0].plan : null,
      planStartDate: user.userPlans.length > 0 ? user.userPlans[0].startDate : null,
      planEndDate: user.userPlans.length > 0 ? user.userPlans[0].endDate : null,
      createdAt: user.birthDate // Using birthDate as creation date for now
    }));

    return new Response(JSON.stringify({
      users: transformedUsers,
      pagination: {
        page,
        limit,
        total: totalUsers,
        totalPages: Math.ceil(totalUsers / limit)
      }
    }), { status: 200 });

  } catch (error) {
    console.error('Error fetching kundli submissions:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
} 