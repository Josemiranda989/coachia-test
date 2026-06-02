import { useState, useEffect } from 'react'
import { trainingPlansService } from '../services/trainingPlans.service'

function TrainingPlanList({ refreshTrigger }) {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPlans()
  }, [refreshTrigger])

  const fetchPlans = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await trainingPlansService.getAllTrainingPlans()
      setPlans(data)
    } catch (err) {
      setError(err.message || 'Error cargando planes')
      setPlans([])
    } finally {
      setLoading(false)
    }
  }

  const getDecisionColor = (decision) => {
    switch (decision) {
      case 'increase':
        return '#4CAF50'
      case 'deload':
        return '#FF9800'
      default:
        return '#999'
    }
  }

  if (loading) return <div style={{ padding: '20px' }}>Cargando planes...</div>
  if (error) return <div style={{ padding: '20px', color: '#d32f2f' }}>Error: {error}</div>

  return (
    <div style={{ marginTop: '30px' }}>
      <h2>Planes de Entrenamiento</h2>
      {plans.length === 0 ? (
        <p style={{ color: '#666' }}>No hay planes registrados</p>
      ) : (
        <div>
          {plans.map((plan) => (
            <div
              key={plan.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '15px',
                backgroundColor: '#fafafa'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <p style={{ margin: '5px 0', fontWeight: 'bold' }}>
                    Semana: {new Date(plan.week_start).toLocaleDateString('es-AR')}
                  </p>
                  <p style={{ margin: '5px 0', color: '#666' }}>Estado: {plan.status}</p>
                  <p style={{ margin: '5px 0', color: '#666' }}>HRV Input: {plan.hrv_input}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p
                    style={{
                      margin: '5px 0',
                      padding: '8px 12px',
                      backgroundColor: getDecisionColor(plan.decision),
                      color: 'white',
                      borderRadius: '4px',
                      fontWeight: 'bold',
                      display: 'inline-block'
                    }}
                  >
                    {plan.decision}
                  </p>
                </div>
              </div>
              <p style={{ margin: '10px 0 0 0', color: '#555', fontSize: '14px' }}>
                <strong>Justificación:</strong> {plan.rationale}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TrainingPlanList
