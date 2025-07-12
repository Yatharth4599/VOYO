import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const agents = await prisma.agent.findMany({
      where: {
        visibility: 'PUBLIC',
        status: 'PUBLISHED'
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      agents: agents.map(agent => ({
        id: agent.id,
        name: agent.name,
        description: agent.description,
        tags: agent.tags,
        owner: agent.owner,
        usageStats: agent.usageStats,
        createdAt: agent.createdAt,
        updatedAt: agent.updatedAt
      }))
    });

  } catch (error) {
    console.error('Failed to fetch marketplace agents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agents' },
      { status: 500 }
    );
  }
} 