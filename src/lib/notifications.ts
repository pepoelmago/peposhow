import nodemailer from 'nodemailer'

// Configure standard SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pepomagiaymimo@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'mock-password',
    },
})

export async function sendEmail(to: string, subject: string, text: string) {
    if (process.env.NODE_ENV === 'development') {
        console.log(`[MOCK EMAIL] To: ${to}, Subject: ${subject}, Body: ${text}`)
        return
    }

    try {
        await transporter.sendMail({
            from: 'pepomagiaymimo@gmail.com',
            to,
            subject,
            text,
        })
    } catch (error) {
        console.error('Email error:', error)
    }
}

export function generateWhatsAppLink(phone: string, message: string) {
    const encodedMessage = encodeURIComponent(message)
    return `https://wa.me/${phone}?text=${encodedMessage}`
}
