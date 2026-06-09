import { useEffect, useState } from 'react'
import { trainingPlansService } from '../services/trainingPlans.service'

const initialFormData = {
  week_start: '',
  status: 'active',
  hrv_input: '',
  decision: 'increase',
  rationale: ''
}

function TrainingPlanForm({ editingPlan, onCancelEdit, onPlanSaved }) {
  const [formData, setFormData] = useState(initialFormData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    if (editingPlan) {
      setFormData({
        week_start: editingPlan.week_start ? editingPlan.week_start.slice(0, 10) : '',
        status: editingPlan.status || 'active',
        hrv_input: editingPlan.hrv_input ?? '',
        decision: editingPlan.decision || 'increase',
        rationale: editingPlan.rationale || ''
      })
      setError(null)
      setSuccess(null)
      return
    }

    setFormData(initialFormData)
    setError(null)
    setSuccess(null)
  }, [editingPlan])

  useEffect(() => {
    if (!success) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setSuccess(null)
    }, 3000)

    return () => window.clearTimeout(timeoutId)
  }, [success])

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
      setSuccess(null)

      const planPayload = {
        ...formData,
        user_id: 'user-123'
      }

      if (editingPlan?.id) {
        await trainingPlansService.updateTrainingPlan(editingPlan.id, planPayload)
        setSuccess('¡Plan actualizado exitosamente!')
      } else {
        await trainingPlansService.createTrainingPlan(planPayload)
        setSuccess('¡Plan creado exitosamente!')
      }

      setFormData(initialFormData)

      if (onPlanSaved) {
        onPlanSaved()
      }
    } catch (err) {
      setError(err.message || (editingPlan?.id ? 'Error actualizando plan' : 'Error creando plan'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="panel panel__inner">
      <div className="panel__header">
        <div>
          <h3 className="panel__title">{editingPlan ? 'Editar Plan de Entrenamiento' : 'Nuevo Plan de Entrenamiento'}</h3>
          <p className="panel__subtitle">Diseñado para capturar la adaptación semanal sin fricción.</p>
        </div>
      </div>

      {error && <div className="feedback feedback--error">Error: {error}</div>}
      {success && <div className="feedback feedback--success">{success}</div>}

      <form onSubmit={handleSubmit} className="coachia-form">
        <div className="field">
          <label className="field__label">
            Inicio de Semana *
          </label>
          <input
            type="date"
            name="week_start"
            value={formData.week_start}
            onChange={handleChange}
            required
            className="field__control"
          />
        </div>

        <div className="field">
          <label className="field__label">
            Estado *
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="field__control"
          >
            <option value="active">Activo</option>
            <option value="pending">Pendiente</option>
            <option value="completed">Completado</option>
          </select>
        </div>

        <div className="field">
          <label className="field__label">
            HRV Input (número) *
          </label>
          <input
            type="number"
            name="hrv_input"
            value={formData.hrv_input}
            onChange={handleChange}
            required
            className="field__control"
          />
        </div>

        <div className="field">
          <label className="field__label">
            Decisión *
          </label>
          <select
            name="decision"
            value={formData.decision}
            onChange={handleChange}
            className="field__control"
          >
            <option value="increase">Aumentar</option>
            <option value="deload">Deload</option>
            <option value="maintain">Mantener</option>
          </select>
        </div>

        <div className="field">
          <label className="field__label">
            Justificación *
          </label>
          <textarea
            name="rationale"
            value={formData.rationale}
            onChange={handleChange}
            required
            rows="4"
            className="field__control"
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            disabled={loading}
            className="btn btn--primary"
          >
            {loading ? (editingPlan ? 'Actualizando...' : 'Creando...') : (editingPlan ? 'Actualizar Plan' : 'Crear Plan')}
          </button>

          {editingPlan && (
            <button
              type="button"
              onClick={onCancelEdit}
              disabled={loading}
              className="btn btn--secondary"
            >
              Cancelar edición
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default TrainingPlanForm
