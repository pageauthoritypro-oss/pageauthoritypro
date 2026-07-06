import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
	// Only allow requests from Sanity Studio
	const { searchParams } = new URL(request.url);
	const page = parseInt(searchParams.get('page') || '1', 10);
	const limit = parseInt(searchParams.get('limit') || '20', 10);
	const skip = (page - 1) * limit;

	try {
		const prisma = getPrisma();

		const [submissions, total] = await Promise.all([
			prisma.contactSubmission.findMany({
				orderBy: { createdAt: 'desc' },
				skip,
				take: limit,
			}),
			prisma.contactSubmission.count(),
		]);

		return NextResponse.json({
			submissions,
			total,
			page,
			limit,
			totalPages: Math.ceil(total / limit),
		});
	} catch (error) {
		console.error('Failed to fetch contact submissions:', error);
		return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
	}
}

export async function DELETE(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get('id');

	if (!id) {
		return NextResponse.json({ error: 'Missing id' }, { status: 400 });
	}

	try {
		const prisma = getPrisma();
		await prisma.contactSubmission.delete({ where: { id } });
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Failed to delete contact submission:', error);
		return NextResponse.json({ error: 'Failed to delete submission' }, { status: 500 });
	}
}
