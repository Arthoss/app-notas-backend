# App Notas - Backend API

Microservicios REST con Node.js + Express para la App de Notas Estudiantiles.

## Endpoints

| Método | Ruta                       | Descripción                        |
|--------|----------------------------|------------------------------------|
| GET    | `/api/consulta?cedula=XXX` | Consultar notas de un estudiante   |
| POST   | `/api/registro-estudiante` | Registrar nuevo estudiante         |
| POST   | `/api/registro-nota`       | Registrar notas de una materia     |
| GET    | `/api-docs`                | Documentación Swagger              |

## Variables de entorno (.env)

```
DB_HOST=db.xxxx.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=tu_password
PORT=3000
```

## Instalación local

```bash
npm install
npm run dev
```

## Despliegue en Render.com

1. Subir este código a GitHub
2. Crear nuevo Web Service en render.com
3. Conectar el repositorio
4. Agregar las variables de entorno en el panel de Render
5. Deploy automático
