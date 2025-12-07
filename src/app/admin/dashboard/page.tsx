'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Reservation {
    id: string
    date: string
    name: string
    email: string
    phone: string
    status: string
    paymentStatus: string
    createdAt: string
}

export default function AdminDashboard() {
    const [reservations, setReservations] = useState<Reservation[]>([])
    const router = useRouter()

    useEffect(() => {
        fetchReservations()
    }, [])

    async function fetchReservations() {
        try {
            const res = await fetch('/api/admin/reservations')
            if (res.status === 401) {
                router.push('/admin/login')
                return
            }
            const data = await res.json()
            if (data.reservations) setReservations(data.reservations)
        } catch (error) {
            console.error(error)
        }
    }

    async function updateStatus(id: string, status: string) {
        if (!confirm(`¿Cambiar estado a ${status}?`)) return

        const res = await fetch(`/api/reservations/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ status })
        })
        if (res.ok) fetchReservations()
    }

    async function updatePayment(id: string, paymentStatus: string) {
        if (!confirm(`¿Marcar pago como ${paymentStatus}?`)) return

        const res = await fetch(`/api/reservations/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ paymentStatus })
        })
        if (res.ok) fetchReservations()
    }

    async function handleDelete(id: string) {
        if (!confirm('¿Eliminar reserva permanentemente?')) return

        const res = await fetch(`/api/reservations/${id}`, {
            method: 'DELETE'
        })
        if (res.ok) fetchReservations()
    }

    async function handleLogout() {
        await fetch('/api/auth/logout', { method: 'POST' })
        router.push('/admin/login')
    }

    return (
        <div className="container" style={{ maxWidth: '1400px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Panel de Administración</h1>
                <button onClick={handleLogout} className="btn btn-secondary">Cerrar Sesión</button>
            </header>

            <div className="glass-panel">
                <h2>Reservas Recientes</h2>
                <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                                <th style={{ padding: '1rem' }}>Fecha Evento</th>
                                <th style={{ padding: '1rem' }}>Cliente</th>
                                <th style={{ padding: '1rem' }}>Contacto</th>
                                <th style={{ padding: '1rem' }}>Estado</th>
                                <th style={{ padding: '1rem' }}>Pago</th>
                                <th style={{ padding: '1rem' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map(r => (
                                <tr key={r.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '1rem' }}>{new Date(r.date).toLocaleDateString()}</td>
                                    <td style={{ padding: '1rem' }}>{r.name}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <div>{r.email}</div>
                                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{r.phone}</div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '4px',
                                            background: r.status === 'CONFIRMED' ? 'var(--success)' :
                                                r.status === 'PENDING' ? 'var(--warning)' : 'var(--error)',
                                            color: 'black',
                                            fontSize: '0.8rem',
                                            fontWeight: 'bold'
                                        }}>
                                            {r.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{ color: r.paymentStatus === 'PAID' ? 'var(--success)' : 'var(--warning)' }}>
                                            {r.paymentStatus}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                                        {/* Status Actions */}
                                        {r.status === 'PENDING' && (
                                            <>
                                                <button onClick={() => updateStatus(r.id, 'CONFIRMED')} className="btn" style={{ fontSize: '0.8rem', padding: '0.5rem', background: 'var(--success)', color: 'black' }}>Confirmar</button>
                                                <button onClick={() => updateStatus(r.id, 'REJECTED')} className="btn" style={{ fontSize: '0.8rem', padding: '0.5rem', background: 'var(--error)', color: 'white' }}>Rechazar</button>
                                            </>
                                        )}
                                        {r.status === 'CONFIRMED' && (
                                            <button onClick={() => updateStatus(r.id, 'CANCELLED')} className="btn" style={{ fontSize: '0.8rem', padding: '0.5rem', background: 'var(--surface)', border: '1px solid var(--border)' }}>Cancelar</button>
                                        )}

                                        {/* Payment Actions */}
                                        {r.paymentStatus === 'PENDING' && (
                                            <button onClick={() => updatePayment(r.id, 'PAID')} className="btn" style={{ fontSize: '0.8rem', padding: '0.5rem', background: 'var(--primary)' }}>Pagado</button>
                                        )}

                                        <button onClick={() => handleDelete(r.id)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', marginLeft: '0.5rem' }}>🗑</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
