# Guía de Despliegue: Pepo Show Calendar

¡Tu código ya está en GitHub! Ahora vamos a publicarlo para que todo el mundo pueda verlo.

## Paso Único: Publicar en Vercel

1.  Entra en **[https://vercel.com/new](https://vercel.com/new)**.
    *   Si no tienes cuenta, crea una con tu mismo usuario de GitHub.
2.  En la lista "Import Git Repository", verás tu proyecto **`peposhow`**. Dale al botón **Import**.
3.  En la pantalla de configuración:
    *   **NO** toques nada de "Build and Output Settings".
    *   Despliega la pestaña **Environment Variables** y añade lo siguiente:
        *   `JWT_SECRET`: Escribe cualquier contraseña segura inventada (ej: `super-secreto-pepo`).
        *   `DATABASE_URL`: Necesitas una base de datos.
            *   Ve a [Neon.tech](https://neon.tech), crea una cuenta gratis y un proyecto.
            *   Copia la "Connection String" que te dan (empieza por `postgres://`).
            *   Pégala en Vercel.
4.  Pulsa **Deploy**.

¡Y ya está! En unos minutos tendrás tu enlace web funcionando.
