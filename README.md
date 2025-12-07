# Pepo Show Calendar

Aplicación completa de gestión de reservas para "Pepo Show", incluyendo calendario público, panel de administración y widget embebible.

## Tecnologías
- **Frontend**: Next.js 16 (App Router), React, Vanilla CSS (Diseño Premium).
- **Backend**: Next.js API Routes.
- **Base de Datos**: SQLite (Dev) / PostgreSQL (Prod via Prisma).
- **ORM**: Prisma.
- **Auth**: JWT Custom Auth.

## Instalación

1.  Clonar el repositorio.
2.  Instalar dependencias:
    ```bash
    npm install
    ```
3.  Configurar variables de entorno:
    Renombrar `.env.example` a `.env` (o crear uno nuevo):
    ```env
    DATABASE_URL="file:./dev.db"
    JWT_SECRET="tu_secreto_seguro"
    EMAIL_PASSWORD="tu_password_de_aplicacion_gmail"
    ```
4.  Inicializar la base de datos:
    ```bash
    npx prisma db push
    npx prisma generate
    ```
5.  Sembrar datos iniciales (Usuario Admin):
    ```bash
    npx ts-node --compiler-options '{"module":"commonjs"}' prisma/seed.ts
    ```
    *Admin Default*: `pepomagiaymimo@gmail.com` / `admin123`

## Ejecución

Desarrollo:
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`.

## Características

### Público
- **Calendario**: Visualización de fechas libres y ocupadas.
- **Reserva**: Formulario modal al hacer clic en una fecha.
- **Pagos**: Simulación de flujo Bizum (solo informativo).

### Admin (`/admin/login`)
- **Dashboard**: Lista de todas las reservas.
- **Gestión**: Confirmar, Rechazar, Cancelar reservas.
- **Pagos**: Marcar reservas como pagadas manualemnte.

### Widget Embebible
Para insertar el calendario en otra web, añade este script (ajustando la URL de origen):

```html
<script src="https://tu-dominio.com/widget.js"></script>
```
O usa el iframe directamente apuntando a `/widget`.

## Despliegue
Este proyecto está listo para desplegar en Vercel. Asegúrate de configurar las variables de entorno en el panel de Vercel y usar una base de datos PostgreSQL (ej. Vercel Postgres, Supabase, Neon) cambiando el provider en `prisma/schema.prisma`.
