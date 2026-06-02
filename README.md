# 🏋️ CoachIA

> Generador inteligente de planes de entrenamiento ajustados por HRV (Heart Rate Variability)

---

## 🎯 Descripción

**CoachIA** es una aplicación full-stack que genera planes de entrenamiento personalizados basados en datos de HRV (Variabilidad de la Frecuencia Cardíaca). La app analiza métricas de recuperación del usuario y automáticamente recomienda ajustes: aumentar intensidad, hacer deload o mantener volumen.

**Stack:**
- **Backend:** Node.js + Express.js (ES modules)
- **Frontend:** Vite + React 18 + Axios
- **Base de datos:** Preparada para Supabase (actualmente con datos mockeados)

---

## 🛠️ Tech Stack

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![ES Modules](https://img.shields.io/badge/ES%20Modules-F7DF1E?style=flat&logo=javascript&logoColor=black)

### Frontend
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Axios](https://img.shields.io/badge/Axios-5A28CC?style=flat&logo=axios&logoColor=white)

### Tools
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=flat&logo=postman&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)

---

## 📁 Estructura del Proyecto

```
coachia-test/
├── backend/                          # Backend API
│   ├── index.js                      # Servidor principal
│   ├── package.json                  # Dependencias
│   ├── src/
│   │   ├── app.js                    # Configuración Express
│   │   ├── controllers/
│   │   │   ├── user.controller.js
│   │   │   └── trainingPlan.controller.js
│   │   ├── models/
│   │   │   ├── user.model.js         # Mock data (Supabase ready)
│   │   │   └── trainingPlan.model.js
│   │   ├── middlewares/
│   │   │   └── notFound.middleware.js
│   │   └── routes/
│   │       ├── index.routes.js
│   │       ├── user.routes.js
│   │       └── trainingPlan.routes.js
│   └── postman/
│       ├── coachia.postman_collection.json
│       └── coachia.postman_environment.json
│
├── frontend/                         # Frontend Vite + React
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js                # Proxy a /api → localhost:3000
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── components/
│       │   ├── TrainingPlanList.jsx
│       │   ├── TrainingPlanForm.jsx
│       │   ├── UserList.jsx
│       │   └── UserForm.jsx
│       └── services/
│           ├── trainingPlans.service.js (5 CRUD methods)
│           └── user.service.js          (5 CRUD methods)
│
├── .gitignore
├── .env.example                    # Variables de ambiente (plantilla)
└── README.md
```

---

## 🚀 Cómo Correr

### Backend

```bash
cd backend

# Instalar dependencias (primera vez)
npm install

# Dev mode (con nodemon)
npm run dev

# Start (producción)
npm start
```

Backend corre en: `http://localhost:3000`

### Frontend

```bash
cd frontend

# Instalar dependencias (primera vez)
npm install

# Dev mode (Vite con proxy a backend)
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

Frontend corre en: `http://localhost:5173`  
Proxy automático: `/api` → `http://localhost:3000`

---

## 📚 Especificaciones API

### Rutas Disponibles

#### Health Check
```
GET /api/health
```

#### Usuarios
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/users` | Obtener todos los usuarios |
| GET | `/api/users/:id` | Obtener usuario por ID |
| POST | `/api/users` | Crear usuario |
| PUT | `/api/users/:id` | Actualizar usuario |
| DELETE | `/api/users/:id` | Eliminar usuario |

#### Planes de Entrenamiento
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/training-plans` | Obtener todos los planes |
| GET | `/api/training-plans/:id` | Obtener plan por ID |
| POST | `/api/training-plans` | Crear plan |
| PUT | `/api/training-plans/:id` | Actualizar plan |
| DELETE | `/api/training-plans/:id` | Eliminar plan |

### Formato de Respuestas

**Exitosa:**
```json
{
  "status": "success",
  "data": { /* contenido */ }
}
```

**Error:**
```json
{
  "status": "error",
  "message": "Descripción del error"
}
```

---

## 🎨 Frontend - Componentes

### TrainingPlanList
- Muestra todos los planes de entrenamiento
- Campos: `week_start`, `status`, `hrv_input`, `decision`, `rationale`
- **Colores de decisión:**
  - 🟢 `increase` → Verde (#4CAF50)
  - 🟠 `deload` → Naranja (#FF9800)
- Manejo de estados: loading, error

### TrainingPlanForm
- Formulario para crear nuevos planes
- Automáticamente refreshea la lista al crear
- `user_id` hardcodeado: `'user-123'`

### UserList
- Muestra todos los usuarios
- Campos: `email`, `display_name`, `telegram_chat_id`, `created_at`

### UserForm
- Formulario para crear nuevos usuarios
- Automáticamente refreshea la lista al crear

---

## 📋 Servicios

### trainingPlans.service.js
```javascript
trainingPlansService.getAllTrainingPlans()       // GET
trainingPlansService.getTrainingPlanById(id)     // GET :id
trainingPlansService.createTrainingPlan(data)    // POST
trainingPlansService.updateTrainingPlan(id, data)// PUT
trainingPlansService.deleteTrainingPlan(id)      // DELETE
```

### user.service.js
```javascript
userService.getAllUsers()          // GET
userService.getUserById(id)        // GET :id
userService.createUser(data)       // POST
userService.updateUser(id, data)   // PUT
userService.deleteUser(id)         // DELETE
```

---

## ✅ Features Actuales

- ✅ Backend API con patrón MVC
- ✅ Datos mockeados listos para Supabase
- ✅ Frontend Vite + React con proxy
- ✅ 4 componentes funcionales (CRUD básico)
- ✅ 2 servicios con 5 métodos CRUD cada uno
- ✅ Manejo de loading y errores
- ✅ CSS inline mínimo (scaffold)
- ✅ Postman collection para testing
- ✅ Migración PATCH → PUT

---

## 📝 TODO / Pendientes

### UX/UI Design 🎨
- [ ] Diseño visual profesional
- [ ] Sistema de colores y tipografía
- [ ] Responsive design (mobile-first)
- [ ] Refactorización de estructura de componentes

### Autenticación & Seguridad 🔐
- [ ] Implementar JWT o sesiones
- [ ] Validación de datos (zod o yup)
- [ ] Rate limiting
- [ ] CORS configurado por ambiente

### Base de Datos 🗄️
- [ ] Migración a Supabase
- [ ] Migrations/Seeders
- [ ] Índices optimizados
- [ ] Soft deletes

### Features Nuevas 🚀
- [ ] Integración real de HRV (webhooks, APIs externas)
- [ ] Dashboard de analytics
- [ ] Historial de planes
- [ ] Notificaciones (email, Telegram)
- [ ] Exportar planes (PDF)
- [ ] Gráficos de progreso

### Testing 🧪
- [ ] Unit tests (backend)
- [ ] Integration tests
- [ ] E2E tests (frontend)
- [ ] Test coverage > 80%

### DevOps & Deploy 🚀
- [ ] Docker setup
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Environment config (.env, variables)
- [ ] Deploy a producción

### Documentación 📖
- [ ] API docs (Swagger/OpenAPI)
- [ ] Documentación de componentes
- [ ] Developer guide
- [ ] Decision records (ADR)

---

## 🔧 Configuración Inicial (Primera Vez)

```bash
# Clonar repo
git clone https://github.com/Josemiranda989/coachia-test.git
cd coachia-test

# Setup Backend
cd backend
npm install

# Setup Frontend
cd ../frontend
npm install

# Volver a raíz
cd ..

# Configurar variables de ambiente
cp .env.example .env
```

### Variables de Ambiente

Copia `.env.example` a `.env` y ajusta según tu ambiente:

```bash
# Backend Configuration
NODE_ENV=development          # development | production
PORT=3000                     # Puerto del backend

# Frontend Configuration
VITE_API_URL=http://localhost:3000  # URL del backend

# Database (Supabase - Futuro)
# SUPABASE_URL=
# SUPABASE_ANON_KEY=

# External Services (Futuro)
# TELEGRAM_BOT_TOKEN=
# HRV_API_KEY=
```

**Nota:** El archivo `.env` está en `.gitignore`. Usa `.env.example` como referencia.

---

## 🐛 Troubleshooting

### Error: "Cannot find module 'express'"
```bash
cd backend && npm install
```

### Error: "Port 3000 already in use"
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

### Error: Proxy no funciona en frontend
- Verificar que backend corre en `localhost:3000`
- Verificar `vite.config.js` tiene proxy configurado
- Reiniciar dev server de frontend

---

## 👨‍💻 Autor

**José M.** - Desarrollador Full Stack

---

## 📄 Licencia

MIT

---

## 🤝 Contribuir

1. Crear rama: `git checkout -b feature/nueva-feature`
2. Commit: `git commit -am 'Add feature'`
3. Push: `git push origin feature/nueva-feature`
4. Pull Request

---

**Última actualización:** 2 de junio, 2026
