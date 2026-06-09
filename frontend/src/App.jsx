import { useState } from 'react'
import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import TrainingPlanForm from './components/TrainingPlanForm'
import TrainingPlanList from './components/TrainingPlanList'
import UserForm from './components/UserForm'
import UserList from './components/UserList'

function PageSection({ title, description, children }) {
  return (
    <section className="panel panel__inner page">
      <div className="page__hero">
        <span className="page__eyebrow">CoachIA</span>
        <h2 className="page__title">{title}</h2>
        <p className="page__subtitle">{description}</p>
      </div>
      {children}
    </section>
  )
}

function PlanesPage() {
  const [planRefreshTrigger, setPlanRefreshTrigger] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState(null)

  const handlePlanSaved = () => {
    setPlanRefreshTrigger((prev) => prev + 1)
    setSelectedPlan(null)
  }

  const handleEditPlan = (plan) => {
    setSelectedPlan(plan)
  }

  const handlePlanDeleted = (deletedPlanId) => {
    setPlanRefreshTrigger((prev) => prev + 1)
    setSelectedPlan((currentPlan) => (currentPlan?.id === deletedPlanId ? null : currentPlan))
  }

  return (
    <PageSection title="Planes de Entrenamiento" description="Creá y revisá los planes ajustados por HRV.">
      <TrainingPlanForm
        editingPlan={selectedPlan}
        onCancelEdit={() => setSelectedPlan(null)}
        onPlanSaved={handlePlanSaved}
      />
      <TrainingPlanList
        refreshTrigger={planRefreshTrigger}
        onEditPlan={handleEditPlan}
        onDeletePlan={handlePlanDeleted}
      />
    </PageSection>
  )
}

function UsuariosPage() {
  const [userRefreshTrigger, setUserRefreshTrigger] = useState(0)
  const [selectedUser, setSelectedUser] = useState(null)

  const handleUserSaved = () => {
    setUserRefreshTrigger((prev) => prev + 1)
    setSelectedUser(null)
  }

  const handleEditUser = (user) => {
    setSelectedUser(user)
  }

  const handleUserDeleted = (deletedUserId) => {
    setUserRefreshTrigger((prev) => prev + 1)
    setSelectedUser((currentUser) => (currentUser?.id === deletedUserId ? null : currentUser))
  }

  return (
    <PageSection title="Gestión de Usuarios" description="Administrá los usuarios que reciben los planes.">
      <UserForm
        editingUser={selectedUser}
        onCancelEdit={() => setSelectedUser(null)}
        onUserSaved={handleUserSaved}
      />
      <UserList
        refreshTrigger={userRefreshTrigger}
        onEditUser={handleEditUser}
        onDeleteUser={handleUserDeleted}
      />
    </PageSection>
  )
}

function App() {
  return (
    <div className="app-shell">
      <div className="app-shell__ambient app-shell__ambient--lime" aria-hidden="true" />
      <div className="app-shell__ambient app-shell__ambient--blue" aria-hidden="true" />

      <header className="app-header">
        <div className="app-brand">
          <div className="app-brand__mark">R</div>
          <div className="app-brand__text">
            <h1 className="app-brand__title">Rendimiento</h1>
            <p className="app-brand__subtitle">CoachIA · planes adaptativos</p>
          </div>
        </div>

        <nav className="app-nav">
          {[
            { to: '/planes', label: 'Planes' },
            { to: '/usuarios', label: 'Usuarios' },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `app-nav__link ${isActive ? 'is-active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/planes" replace />} />
          <Route path="/planes" element={<PlanesPage />} />
          <Route path="/usuarios" element={<UsuariosPage />} />
        </Routes>
      </main>

      <nav className="bottom-nav">
        <NavLink to="/planes" className={({ isActive }) => `bottom-nav__link ${isActive ? 'is-active' : ''}`}>
          Planes
        </NavLink>
        <NavLink to="/usuarios" className={({ isActive }) => `bottom-nav__link ${isActive ? 'is-active' : ''}`}>
          Usuarios
        </NavLink>
      </nav>
    </div>
  )
}

export default App
