import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { getPrisma } from '@/lib/prisma';

interface ContactSubmissionRow {
	id: string;
	fields: { name: string; label: string; value: string }[];
	ip: string | null;
	userAgent: string | null;
	createdAt: Date;
}

function isAuthorized(request: NextRequest): boolean {
	const secret = process.env.STUDIO_API_SECRET;
	if (!secret) return false;
	return request.headers.get('x-studio-secret') === secret;
}

export async function GET(request: NextRequest) {
	// Only allow requests from Sanity Studio
	if (!isAuthorized(request)) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const { searchParams } = new URL(request.url);
	const page = parseInt(searchParams.get('page') || '1', 10);
	const limit = parseInt(searchParams.get('limit') || '20', 10);
	const from = searchParams.get('from');
	const to = searchParams.get('to');
	const search = searchParams.get('search')?.trim();
	const skip = (page - 1) * limit;

	const conditions: Prisma.Sql[] = [];
	if (from && !Number.isNaN(Date.parse(from))) {
		conditions.push(Prisma.sql`"createdAt" >= ${new Date(from)}`);
	}
	if (to && !Number.isNaN(Date.parse(to))) {
		conditions.push(Prisma.sql`"createdAt" <= ${new Date(to)}`);
	}
	if (search) {
		conditions.push(Prisma.sql`"fields"::text ILIKE ${`%${search}%`}`);
	}
	const whereClause = conditions.length > 0 ? Prisma.sql`WHERE ${Prisma.join(conditions, ' AND ')}` : Prisma.empty;

	try {
		const prisma = getPrisma();

		const [submissions, totalResult] = await Promise.all([
			prisma.$queryRaw<ContactSubmissionRow[]>(Prisma.sql`
				SELECT * FROM "ContactSubmission"
				${whereClause}
				ORDER BY "createdAt" DESC
				LIMIT ${limit} OFFSET ${skip}
			`),
			prisma.$queryRaw<{ count: bigint }[]>(Prisma.sql`
				SELECT COUNT(*)::bigint as count FROM "ContactSubmission" ${whereClause}
			`),
		]);

		const total = Number(totalResult[0]?.count ?? 0);

		return NextResponse.json({
			submissions,
			total,
			page,
			limit,
			totalPages: Math.max(1, Math.ceil(total / limit)),
		});
	} catch (error) {
		console.error('Failed to fetch contact submissions:', error);
		return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
	}
}

export async function DELETE(request: NextRequest) {
	if (!isAuthorized(request)) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

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
