import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const email = 'pepomagiaymimo@gmail.com'
    const passwordRaw = 'admin123'
    const hashedPassword = await bcrypt.hash(passwordRaw, 10)

    const admin = await prisma.admin.upsert({
        where: { email },
        update: {},
        create: {
            email,
            password: hashedPassword,
        },
    })

    console.log('Admin user seeded:', admin.email)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
