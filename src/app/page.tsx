import PublicCalendar from '@/components/Calendar/PublicCalendar'

export default function Home() {
  return (
    <main>
      <div className="container">
        <header style={{ textAlign: 'center', padding: '40px 0', color: 'white' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '10px', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            🎭 Reservas Show Pepo
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
            El espectáculo de magia, circo y música infantil. ¡Diversión garantizada!
          </p>

          <div className="booking-steps">
            <div className="step">
              <i className="fas fa-calendar-check"></i>
              <h4>Paso 1</h4>
              <p>Selecciona fecha</p>
            </div>
            <div className="step">
              <i className="fas fa-user-edit"></i>
              <h4>Paso 2</h4>
              <p>Tus datos</p>
            </div>
            <div className="step">
              <i className="fas fa-credit-card"></i>
              <h4>Pago</h4>
              <p>Bizum / Efectivo</p>
            </div>
            <div className="step">
              <i className="fas fa-check-circle"></i>
              <h4>Listo</h4>
              <p>Confirmación</p>
            </div>
          </div>
        </header>

        <div className="glass-panel">
          <h2 className="section-title">📅 Selecciona tu fecha</h2>
          <PublicCalendar />
        </div>

        <footer style={{ textAlign: 'center', marginTop: '4rem', color: 'rgba(255,255,255,0.7)' }}>
          <p>&copy; {new Date().getFullYear()} Pepo Show. Todos los derechos reservados.</p>
          <p style={{ fontSize: '0.8rem', marginTop: '1rem' }}>
            <a href="/admin/login" style={{ color: 'white', textDecoration: 'underline' }}>Acceso Admin</a>
          </p>
        </footer>
      </div>
    </main>
  )
}
