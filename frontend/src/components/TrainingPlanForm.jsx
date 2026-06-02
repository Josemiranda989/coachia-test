import { useState } from 'react'
import { trainingPlansService } from '../services/trainingPlans.service'

function TrainingPlanForm({ onPlanCreated }) {
  const [formData, setFormData] = useState({
    week_start: '',
    status: 'active',
    hrv_input: '',
    decision: 'increase',
    rationale: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      const planPayload = {
        ...formData,
        user_id: 'user-123'
      }

      await trainingPlansService.createTrainingPlan(planPayload)
      setSuccess(true)

      // Reset form
      setFormData({
        week_start: '',
        status: 'active',
        hrv_input: '',
        decision: 'increase',
        rationale: ''
      })

      // Notificar al padre para refrescar lista
      if (onPlanCreated) {
        onPlanCreated()
      }

      // Limpiar mensaje success
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err.message || 'Error creando plan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
      <h2>Nuevo Plan de Entrenamiento</h2>

      {error && <div style={{ color: '#d32f2f', marginBottom: '10px' }}>Error: {error}</div>}
      {success && <div style={{ color: '#4CAF50', marginBottom: '10px' }}>¡Plan creado exitosamente!</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Inicio de Semana *
          </label>
          <input
            type="date"
            name="week_start"
            value={formData.week_start}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Estado *
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="active">Activo</option>
            <option value="pending">Pendiente</option>
            <option value="completed">Completado</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            HRV Input (número) *
          </label>
          <input
            type="number"
            name="hrv_input"
            value={formData.hrv_input}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Decisión *
          </label>
          <select
            name="decision"
            value={formData.decision}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="increase">Aumentar</option>
            <option value="deload">Deload</option>
            <option value="maintain">Mantener</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Justificación *
          </label>
          <textarea
            name="rationale"
            value={formData.rationale}
            onChange={handleChange}
            required
            rows="4"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc', fontFamily: 'inherit' }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: loading ? '#ccc' : '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Creando...' : 'Crear Plan'}
        </button>
      </form>
    </div>
  )
}

export default TrainingPlanForm
