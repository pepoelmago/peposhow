import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function GET() {
    try {
        const email = 'pepomagiaymimo@gmail.com'
        const passwordRaw = 'admin123'

        // Check if admin already exists
        const existingAdmin = await prisma.admin.findUnique({
            where: { email }
        })

        if (existingAdmin) {
            return NextResponse.json({ message: 'Admin user already exists' }, { status: 200 })
        }

        const hashedPassword = await bcrypt.hash(passwordRaw, 10)

        const admin = await prisma.admin.create({
            data: {
                email,
                password: hashedPassword,
            },
        })

        return NextResponse.json({ message: 'Admin user created successfully', email: admin.email }, { status: 201 })
    } catch (error) {
        console.error('Seed error:', error)
        return NextResponse.json({ error: 'Failed to seed admin user', details: String(error) }, { status: 500 })
    }
}
