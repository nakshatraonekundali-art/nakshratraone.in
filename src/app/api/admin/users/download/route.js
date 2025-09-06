import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

let prismaSingleton = null;

function getPrismaClient() {
  if (prismaSingleton) return prismaSingleton;
  prismaSingleton = new PrismaClient();
  return prismaSingleton;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const filterType = searchParams.get('filterType');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    
    const prisma = getPrismaClient();
    let whereClause = {};
    
    // Apply date filters if provided
    if (filterType && filterType !== 'all') {
      const now = new Date();
      let filterStartDate;
      
      if (filterType === 'today') {
        // Today's data
        filterStartDate = new Date(now.setHours(0, 0, 0, 0));
        whereClause.createdAt = {
          gte: filterStartDate
        };
      } else if (filterType === 'week') {
        // This week's data
        const dayOfWeek = now.getDay();
        const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust for Sunday
        filterStartDate = new Date(now.setDate(diff));
        filterStartDate.setHours(0, 0, 0, 0);
        whereClause.createdAt = {
          gte: filterStartDate
        };
      } else if (filterType === 'month') {
        // This month's data
        filterStartDate = new Date(now.getFullYear(), now.getMonth(), 1);
        whereClause.createdAt = {
          gte: filterStartDate
        };
      } else if (filterType === 'quarter') {
        // This quarter's data
        const quarter = Math.floor(now.getMonth() / 3);
        filterStartDate = new Date(now.getFullYear(), quarter * 3, 1);
        whereClause.createdAt = {
          gte: filterStartDate
        };
      } else if (filterType === 'custom' && startDate && endDate) {
        // Custom date range
        const startDateTime = new Date(startDate);
        startDateTime.setHours(0, 0, 0, 0);
        
        const endDateTime = new Date(endDate);
        endDateTime.setHours(23, 59, 59, 999);
        
        whereClause.createdAt = {
          gte: startDateTime,
          lte: endDateTime
        };
      }
    }
    
    const users = await prisma.user.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    });
    
    // Format data for Excel
    const formattedData = users.map(user => ({
      Name: user.name,
      Gender: user.gender,
      'Birth Date': user.birthDate ? new Date(user.birthDate).toLocaleDateString() : '',
      'Birth Time': user.birthTime || '',
      Birthplace: user.birthplace || '',
      Mobile: user.mobile || '',
      Email: user.email || '',
      Created: user.createdAt ? new Date(user.createdAt).toLocaleString() : ''
    }));
    
    // Return the formatted data for Excel download
    return NextResponse.json({ 
      success: true, 
      users: formattedData,
      filterType,
      startDate: startDate ? new Date(startDate).toLocaleDateString() : null,
      endDate: endDate ? new Date(endDate).toLocaleDateString() : null
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}