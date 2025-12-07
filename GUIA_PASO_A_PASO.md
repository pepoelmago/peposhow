# Guía Maestra de Despliegue: Pepo Show Calendar

Olvidemos Hostinger por un momento. Vamos a hacer que tu aplicación funcione en internet totalmente GRATIS y RÁPIDO.

## Paso 1: Subir tu Código a GitHub
Para que tu app viva en internet, primero debe vivir en GitHub.

1.  **Entra a GitHub**:
    *   Ve a [https://github.com/new](https://github.com/new) (Inicia sesión si no lo has hecho).
2.  **Crea el Repositorio**:
    *   En "Repository name" escribe: `pepo-show`
    *   Deja todo lo demás como está (Public).
    *   Pulsa el botón verde **"Create repository"**.
3.  **Copia la URL**:
    *   Verás una página con mucho código. Busca el recuadro que tiene una dirección HTTPS, algo como:
    *   `https://github.com/TU_USUARIO/pepo-show.git`
    *   **Cópiala.**

## Paso 2: Conectar tu Ordenador
Ahora, vuelve a la pantalla donde estás hablando conmigo (tu terminal o chat) y pega los siguientes comandos UNO POR UNO.

*(Sustituye `LA_URL_QUE_COPIASTE` por la que acabas de copiar de GitHub)*

```bash
git branch -M main
git remote add origin LA_URL_QUE_COPIASTE
git push -u origin main
```

Si te pide usuario y contraseña, usa tus credenciales de GitHub.

## Paso 3: Publicar en Vercel
Una vez el código esté en GitHub, Vercel lo cogerá y lo convertirá en una web real.

1.  Ve a [https://vercel.com/new](https://vercel.com/new).
2.  Verás tu proyecto `pepo-show` en la lista "Import Git Repository". Pulsa **Import**.
3.  En la configuración (**Environment Variables**), despliega la pestañita y añade estas claves (son necesarias para que funcione la base de datos y la seguridad):

    *   `JWT_SECRET`: Escribe una contraseña larga inventada (ej: `super-secreto-pepo-123`).
    *   `DATABASE_URL`: **IMPORTANTE**. Vercel necesita una base de datos real.

    **¿Cómo conseguir la `DATABASE_URL`?**
    *   Ve a [https://neon.tech](https://neon.tech) (es gratis).
    *   Crea un proyecto. Te darán una URL que empieza por `postgres://...`
    *   Copia esa URL y pégala en Vercel en el campo `DATABASE_URL`.

4.  Pulsa **Deploy**.

¡Y listo! En unos minutos Vercel te dará un enlace (ej: `pepo-show.vercel.app`) donde tu aplicación funcionará perfectamente.
