'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Reservation {
    date: string // ISO string
    status: string
}

interface BlockedDate {
    date: string // ISO string
}

export default function PublicCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [reservations, setReservations] = useState<Reservation[]>([])
    const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([])
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    const router = useRouter()

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    useEffect(() => {
        fetchAvailability(year, month + 1)
    }, [year, month])

    async function fetchAvailability(y: number, m: number) {
        try {
            const res = await fetch(`/api/reservations?year=${y}&month=${m}`)
            const data = await res.json()
            if (data.reservations) setReservations(data.reservations)
            if (data.blocked) setBlockedDates(data.blocked)
        } catch (error) {
            console.error('Failed to fetch availability', error)
        }
    }

    function handlePrevMonth() {
        setCurrentDate(new Date(year, month - 1, 1))
    }

    function handleNextMonth() {
        setCurrentDate(new Date(year, month + 1, 1))
    }

    function handleDateClick(date: Date, status: string | null) {
        if (status === 'busy' || status === 'pending') return

        // Check if date is in the past
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        if (date < today) return

        setSelectedDate(date)
        // Create query string manually to avoid URLSearchParams if preferred, but URLSearchParams is fine
        const dateStr = date.toISOString()
        // Open modal via state or route? Let's use a query param or state.
        // Ideally we pass this up to parent or use a simple modal here.
        // For now, let's just trigger a prop or context. 
        // Wait, the plan said "Create Booking Form Modal/Page".
        // I'll emit an event or update URL.

        // Simple approach: expose onDateSelect prop
    }

    // Generate days
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = new Date(year, month, 1).getDay() // 0 = Sunday

    // Adjust for Monday start (Spanish standard)
    const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1

    const days = []
    // Empty slots
    for (let i = 0; i < startOffset; i++) {
        days.push(<div key={`empty-${i}`} className="day-cell other-month" />)
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(year, month, d)
        const dateStr = date.toDateString() // Simple, compare dates basically

        let status: 'busy' | 'pending' | 'free' = 'free'

        // Check availability
        // Note: API returns dates as ISO strings. We need to compare properly.
        const isBusy = blockedDates.some(b => new Date(b.date).toDateString() === dateStr) ||
            reservations.some(r => new Date(r.date).toDateString() === dateStr && r.status === 'CONFIRMED')

        const isPending = reservations.some(r => new Date(r.date).toDateString() === dateStr && r.status === 'PENDING')

        if (isBusy) status = 'busy'
        else if (isPending) status = 'pending'

        let className = `day-cell ${status}`
        if (selectedDate?.toDateString() === dateStr) className += ' selected'

        // Disable past dates
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        if (date < today) className += ' disabled'

        days.push(
            <div
                key={d}
                className={className}
                onClick={() => handleDateClick(date, status)}
            >
                {d}
            </div>
        )
    }

    const monthName = new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(currentDate)

    return (
        <div className="glass-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <button onClick={handlePrevMonth} className="btn btn-secondary">&lt;</button>
                <h2 style={{ textTransform: 'capitalize' }}>{monthName}</h2>
                <button onClick={handleNextMonth} className="btn btn-secondary">&gt;</button>
            </div>

            <div className="calendar-grid">
                <div className="day-header">L</div>
                <div className="day-header">M</div>
                <div className="day-header">X</div>
                <div className="day-header">J</div>
                <div className="day-header">V</div>
                <div className="day-header">S</div>
                <div className="day-header">D</div>
                {days}
            </div>

            {selectedDate && (
                <BookingForm selectedDate={selectedDate} onClose={() => setSelectedDate(null)} />
            )}
        </div>
    )
}

function BookingForm({ selectedDate, onClose }: { selectedDate: Date, onClose: () => void }) {
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' })

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setStep(2) // Move to Mock Payment
    }

    async function handlePayment() {
        setLoading(true)
        // Simulate Bizum delay
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Submit reservation
        try {
            const res = await fetch('/api/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date: selectedDate,
                    ...formData
                })
            })
            if (res.ok) {
                alert('¡Reserva solicitada con éxito! Te hemos enviado un email.')
                onClose()
                // Refresh calendar? ideally force re-fetch
                window.location.reload()
            } else {
                alert('Error al realizar la reserva')
            }
        } catch (error) {
            console.error(error)
            alert('Error de conexión')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h3>Reservar para el {selectedDate.toLocaleDateString()}</h3>

                {step === 1 && (
                    <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
                        <input
                            type="text"
                            placeholder="Nombre completo"
                            required
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                        <input
                            type="tel"
                            placeholder="Teléfono (WhatsApp)"
                            required
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        />
                        <button className="btn btn-primary" style={{ width: '100%' }}>Continunar al pago</button>
                    </form>
                )}

                {step === 2 && (
                    <div style={{ textAlign: 'center' }}>
                        <div className="payment-mock">
                            <span className="bizum-logo">Bizum</span>
                            <p>Envía <strong>50€</strong> al:</p>
                            <h2>+34 697 292 731</h2>
                            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Concepto: PepoShow {selectedDate.toLocaleDateString()}</p>
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={handlePayment}
                            disabled={loading}
                            style={{ width: '100%' }}
                        >
                            {loading ? 'Procesando...' : 'He realizado el pago'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
