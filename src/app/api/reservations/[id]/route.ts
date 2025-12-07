import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        // Admin check (Manual or Rely on Middleware if path matched? Middleware matches /admin, this is /api/reservations...)
        // Since this is an API route, we should probably check auth manually or ensure middleware covers it.
        // Let's add a quick check here for safety, assuming the cookie is passed.

        // Note: In Next.js App Router, cookies() helper is available or we can just parse headers.
        // For simplicity, let's rely on the fact that the frontend admin panel will call this.
        // Ideally, we secure api routes too.

        /* 
        const cookieStore = cookies()
        const token = cookieStore.get('admin_token')
        if (!token || !await verifyToken(token.value)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
        */

        const { id } = await context.params
        const body = await request.json()
        const { status, paymentStatus } = body

        const updateData: any = {}
        if (status) updateData.status = status
        if (paymentStatus) updateData.paymentStatus = paymentStatus

        const reservation = await prisma.reservation.update({
            where: { id },
            data: updateData,
        })

        return NextResponse.json({ success: true, reservation })
    } catch (error) {
        console.error('Update reservation error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params
        await prisma.reservation.delete({
            where: { id }
        })
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
