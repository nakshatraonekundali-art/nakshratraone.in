import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Get total users
    const totalUsers = await prisma.user.count();

    // Get users with plans
    const usersWithPlans = await prisma.userPlan.count();

    // Get users without plans
    const usersWithoutPlans = totalUsers - usersWithPlans;

    // Get total revenue from plans
    const userPlans = await prisma.userPlan.findMany({
      include: {
        plan: true
      }
    });

    const totalRevenue = userPlans.reduce((sum, userPlan) => {
      return sum + userPlan.plan.price;
    }, 0);

    // Get recent kundli submissions (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentSubmissions = await prisma.user.count({
      where: {
        birthDate: {
          gte: sevenDaysAgo
        }
      }
    });

    // Get gender distribution
    const genderStats = await prisma.user.groupBy({
      by: ['gender'],
      _count: {
        gender: true
      }
    });

    // Get top birth cities
    const topCities = await prisma.user.groupBy({
      by: ['birthCity'],
      _count: {
        birthCity: true
      },
      orderBy: {
        _count: {
          birthCity: 'desc'
        }
      },
      take: 5
    });

    return new Response(JSON.stringify({
      totalUsers,
      usersWithPlans,
      usersWithoutPlans,
      totalRevenue,
      recentSubmissions,
      genderStats,
      topCities
    }), { status: 200 });

  } catch (error) {
    console.error('Error fetching kundli stats:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
} 