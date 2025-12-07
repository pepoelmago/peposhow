import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { signToken } from '@/lib/auth'
import { sendEmail } from '@/lib/notifications'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { date, name, email, phone } = body

        if (!date || !name || !email || !phone) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
        }

        const reservationDate = new Date(date)

        // Check availability
        const existing = await prisma.reservation.findFirst({
            where: {
                date: reservationDate,
                status: { not: 'CANCELLED' },
            },
        })

        const blocked = await prisma.blockedDate.findUnique({
            where: { date: reservationDate },
        })

        if (existing || blocked) {
            return NextResponse.json({ error: 'Date unavailable' }, { status: 409 })
        }

        const reservation = await prisma.reservation.create({
            data: {
                date: reservationDate,
                name,
                email,
                phone,
            },
        })

        // Send notifications
        const adminEmail = 'pepomagiaymimo@gmail.com'
        const adminPhone = '+346972927312'

        // 1. Notify Admin (Email)
        await sendEmail(
            adminEmail,
            'Nueva Reserva Pendiente - Pepo Show',
            `Nueva solicitud de reserva:\n\nNombre: ${name}\nFecha: ${reservationDate.toDateString()}\nEmail: ${email}\nTeléfono: ${phone}\n\nPor favor, revisa el panel de administración.`
        )

        // 2. Notify Client (Email)
        await sendEmail(
            email,
            'Solicitud Recibida - Pepo Show',
            `Hola ${name},\n\nHemos recibido tu solicitud de reserva para el ${reservationDate.toDateString()}. \nTu estado actual es: PENDIENTE.\n\nNos pondremos en contacto contigo pronto para confirmar la disponibilidad y el pago.\n\nGracias,\nThe Pepo Show Team`
        )

        // Mock WhatsApp log
        console.log(`[MOCK WHATSAPP] To: ${adminPhone}, Message: Nueva reserva de ${name} para el ${date}`)

        return NextResponse.json({ success: true, reservation })
    } catch (error) {
        console.error('Create reservation error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const month = searchParams.get('month')
        const year = searchParams.get('year')

        if (month && year) {
            // Return blocked dates for public calendar
            const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
            const endDate = new Date(parseInt(year), parseInt(month), 0);

            const reservations = await prisma.reservation.findMany({
                where: {
                    date: {
                        gte: startDate,
                        lte: endDate
                    },
                    status: { not: 'CANCELLED' }
                },
                select: {
                    date: true,
                    status: true
                }
            })

            const blocked = await prisma.blockedDate.findMany({
                where: {
                    date: {
                        gte: startDate,
                        lte: endDate
                    }
                },
                select: {
                    date: true
                }
            })

            return NextResponse.json({ reservations, blocked })
        }

        // Admin: list all not implemented yet in this route without auth check or diff route
        return NextResponse.json({ error: 'Filters required' }, { status: 400 })

    } catch (error) {
        console.error('Get reservations error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
