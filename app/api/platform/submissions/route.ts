import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

let tableInitialized = false

async function ensureSubmissionTable() {
  if (tableInitialized) return true
  try {
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "PlatformSubmission" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "type" TEXT NOT NULL,
        "slug" TEXT NOT NULL,
        "category" TEXT NOT NULL,
        "region" TEXT,
        "authorName" TEXT NOT NULL,
        "authorRole" TEXT,
        "email" TEXT,
        "website" TEXT,
        "title" TEXT NOT NULL,
        "body" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `)
    await db.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "PlatformSubmission_type_idx" ON "PlatformSubmission"("type");
    `)
    tableInitialized = true
    return true
  } catch (err) {
    console.warn('[api/platform/submissions] Table creation error:', err)
    return false
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type') || 'discussion'
    const ready = await ensureSubmissionTable()
    if (!ready) {
      return NextResponse.json({ ok: true, items: [] })
    }

    const rows: any[] = await db.$queryRawUnsafe(
      `SELECT "id", "type", "slug", "category", "region", "authorName", "authorRole", "title", "body", "createdAt"
       FROM "PlatformSubmission"
       WHERE "type" = $1
       ORDER BY "createdAt" DESC
       LIMIT 50`,
      type
    )

    return NextResponse.json({ ok: true, items: rows || [] })
  } catch (err) {
    console.error('[api/platform/submissions] GET error:', err)
    return NextResponse.json({ ok: true, items: [] })
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json()
    const {
      type = 'discussion',
      category = 'SEO Discussion',
      region = null,
      authorName = '',
      authorRole = '',
      email = '',
      website = '',
      title = '',
      body = '',
    } = payload || {}

    if (!authorName.trim() || !title.trim() || !body.trim()) {
      return NextResponse.json(
        { ok: false, error: 'Name, title, and details are required.' },
        { status: 400 }
      )
    }

    const ready = await ensureSubmissionTable()
    const id = `sub_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
    const slug = `${type}-${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 48)}-${Date.now().toString().slice(-4)}`

    if (ready) {
      await db.$executeRawUnsafe(
        `INSERT INTO "PlatformSubmission"
          ("id", "type", "slug", "category", "region", "authorName", "authorRole", "email", "website", "title", "body", "createdAt")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, CURRENT_TIMESTAMP)`,
        id,
        type,
        slug,
        category.trim(),
        region ? region.trim() : null,
        authorName.trim(),
        authorRole ? authorRole.trim() : null,
        email ? email.trim() : null,
        website ? website.trim() : null,
        title.trim(),
        body.trim()
      )
    }

    return NextResponse.json({
      ok: true,
      item: {
        id,
        type,
        slug,
        category: category.trim(),
        region: region ? region.trim() : null,
        authorName: authorName.trim(),
        authorRole: authorRole ? authorRole.trim() : 'Community Member',
        title: title.trim(),
        body: body.trim(),
        createdAt: new Date().toISOString(),
      },
    })
  } catch (err) {
    console.error('[api/platform/submissions] POST error:', err)
    return NextResponse.json(
      { ok: false, error: 'Failed to save submission.' },
      { status: 500 }
    )
  }
}
