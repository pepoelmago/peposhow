
import { NextResponse } from 'next/server'

export async function GET() {
    const dbUrl = process.env.DATABASE_URL || 'NOT_SET'

    // Mask password for security
    const maskedUrl = dbUrl.replace(/:([^@]+)@/, ':***@')

    return NextResponse.json({
        env_db_url_masked: maskedUrl,
        node_env: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    })
}
