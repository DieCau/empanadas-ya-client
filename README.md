# Empanadas Ya! - Sistema de Gestión de Pedidos

Sistema web completo para la gestión de pedidos de un emprendimiento gastronómico local, desarrollado con tecnologías modernas de frontend y backend.

## Tecnologías utilizadas

### Frontend
- React
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast (Notificaciones)
- Headless UI (Modal Elegante)
- Context API
- useState, useEffect, useContext, useMemo

### Backend
- Node.js
- Express.js
- MySQL
- JWT para autenticación
- CORS, dotenv, express.json()

---

## Funcionalidades

### Autenticación
- Login con email y contraseña
- Autenticación basada en JWT
- Protección de rutas privadas según rol de usuario (cliente/admin)

### Panel de administración
- Visualización de todos los pedidos
- Cambiar estado de pedido (pendiente / entregado)
- Modal de confirmación elegante para acciones sensibles
- Toasts con feedback en tiempo real
- Optimización con `useMemo` para re-renderizado eficiente

### Base de datos
- Tabla `usuarios` (id, email, password, rol)
- Tabla `pedidos` (id, cliente, detalles, estado, fecha)
- Relación simple usuario-pedido

---

### Autor
- Diego Caucota - Desarrollador frontend/backend de Argentina, actualmente en proceso de reconversión profesional.
- Estudiando tecnologías modernas con pasión y dedicación para emprender y trabajar freelance en IT.

### Contacto

  - GitHub: https://github.com/DieCau

  - Email: diegocaucota@gmail.com

## Instalación

### Frontend

```bash
cd client-empanadas
npm install
npm run dev
```


### Backend

```bash
cd server-empanadas
npm install
npm run dev

