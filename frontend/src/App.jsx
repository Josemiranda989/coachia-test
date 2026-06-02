import { useState } from 'react'
import TrainingPlanForm from './components/TrainingPlanForm'
import TrainingPlanList from './components/TrainingPlanList'
import UserForm from './components/UserForm'
import UserList from './components/UserList'

function App() {
  const [planRefreshTrigger, setPlanRefreshTrigger] = useState(0)
  const [userRefreshTrigger, setUserRefreshTrigger] = useState(0)

  const handlePlanCreated = () => {
    setPlanRefreshTrigger((prev) => prev + 1)
  }

  const handleUserCreated = () => {
    setUserRefreshTrigger((prev) => prev + 1)
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h1 style={{ color: '#1976d2', marginBottom: '10px' }}>CoachIA</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>Planes de entrenamiento ajustados por HRV</p>

      <div style={{ marginBottom: '50px' }}>
        <h2 style={{ borderBottom: '2px solid #1976d2', paddingBottom: '10px', marginBottom: '20px' }}>Gestión de Usuarios</h2>
        <UserForm onUserCreated={handleUserCreated} />
        <UserList refreshTrigger={userRefreshTrigger} />
      </div>

      <div>
        <h2 style={{ borderBottom: '2px solid #1976d2', paddingBottom: '10px', marginBottom: '20px' }}>Planes de Entrenamiento</h2>
        <TrainingPlanForm onPlanCreated={handlePlanCreated} />
        <TrainingPlanList refreshTrigger={planRefreshTrigger} />
      </div>
    </div>
  )
}

export default App
