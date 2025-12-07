import PublicCalendar from '@/components/Calendar/PublicCalendar'

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #f8f9fa, #ffffff)' }}>
      <div className="container">
        <header style={{ textAlign: 'center', marginBottom: '3rem', paddingTop: '2rem' }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 900,
            color: '#1a1a1a',
            marginBottom: '0.5rem',
            letterSpacing: '-1px'
          }}>
            Pepo Show
          </h1>
          <p style={{ color: '#666', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            El espectáculo de magia, circo y música infantil. ¡Diversión garantizada con el Show de Pepo!
          </p>
        </header>

        <PublicCalendar />

        <footer style={{ textAlign: 'center', marginTop: '4rem', color: '#999' }}>
          <p>&copy; {new Date().getFullYear()} Pepo Show. Todos los derechos reservados.</p>
          <p style={{ fontSize: '0.8rem', marginTop: '1rem' }}>
            <a href="/admin/login" style={{ color: '#ccc' }}>Acceso Admin</a>
          </p>
        </footer>
      </div>
    </main>
  )
}
