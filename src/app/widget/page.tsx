'use client'

import PublicCalendar from '@/components/Calendar/PublicCalendar'

export default function WidgetPage() {
    return (
        <div style={{ background: 'transparent', minHeight: '100vh', padding: '1rem' }}>
            {/* Simplified view for iframe */}
            <PublicCalendar />
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <a href="/" target="_blank" style={{ fontSize: '0.8rem', color: '#888', textDecoration: 'none' }}>
                    Powered by Pepo Show Calendar
                </a>
            </div>
        </div>
    )
}
