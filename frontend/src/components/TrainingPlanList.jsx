import { useState, useEffect } from 'react'
import { trainingPlansService } from '../services/trainingPlans.service'
import ConfirmDialog from './ConfirmDialog'
import SkeletonList from './SkeletonList'

function TrainingPlanList({ refreshTrigger, onEditPlan, onDeletePlan }) {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [actionError, setActionError] = useState(null)
  const [pendingDelete, setPendingDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)

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

  useEffect(() => {
    fetchPlans()
  }, [refreshTrigger])

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

  const getDecisionClass = (decision) => {
    switch (decision) {
      case 'increase':
        return 'plan-chip--increase'
      case 'deload':
        return 'plan-chip--deload'
      default:
        return 'plan-chip--maintain'
    }
  }

  const confirmDelete = async () => {
    if (!pendingDelete) {
      return
    }

    try {
      setActionError(null)
      setDeleting(true)
      await trainingPlansService.deleteTrainingPlan(pendingDelete.id)
      if (onDeletePlan) {
        onDeletePlan(pendingDelete.id)
      }
      setPendingDelete(null)
    } catch (err) {
      setActionError(err.message || 'Error eliminando plan')
      setPendingDelete(null)
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="panel panel__inner" style={{ marginTop: '1rem' }}>
        <div className="panel__header">
          <div>
            <h3 className="panel__title">Planes de Entrenamiento</h3>
            <p className="panel__subtitle">Cargando planes ajustados por HRV...</p>
          </div>
        </div>
        <SkeletonList rows={3} lines={3} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="state-card state-card--error">
        <h3 className="state-card__title">Planes de Entrenamiento</h3>
        <p className="state-card__text">Error: {error}</p>
        <div className="state-card__actions">
          <button
          type="button"
          onClick={fetchPlans}
          className="btn btn--primary"
        >
          Reintentar
        </button>
        </div>
      </div>
    )
  }

  return (
    <div className="panel panel__inner" style={{ marginTop: '1rem' }}>
      <div className="panel__header">
        <div>
          <h3 className="panel__title">Planes de Entrenamiento</h3>
          <p className="panel__subtitle">Lista operativa con edición y eliminación segura.</p>
        </div>
      </div>
      {actionError && <div className="feedback feedback--error">Error: {actionError}</div>}
      {plans.length === 0 ? (
        <div className="state-card state-card--empty">
          <p className="state-card__text" style={{ fontWeight: 700, color: 'var(--text)' }}>No hay planes registrados.</p>
          <p className="state-card__text">Creá el primero desde el formulario de arriba para empezar a ver resultados.</p>
        </div>
      ) : (
        <div className="list-stack">
          {plans.map((plan) => (
            <div key={plan.id} className="plan-card">
              <div className="plan-card__header">
                <div>
                  <p className="plan-card__title">
                    Semana: {new Date(plan.week_start).toLocaleDateString('es-AR')}
                  </p>
                  <p className="plan-card__meta">Estado: {plan.status}</p>
                  <p className="plan-card__meta">HRV Input: {plan.hrv_input}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p className={`plan-chip ${getDecisionClass(plan.decision)}`} style={{ backgroundColor: getDecisionColor(plan.decision), color: '#ffffff' }}>
                    {plan.decision}
                  </p>
                </div>
              </div>
              <p className="plan-card__rationale">
                <strong>Justificación:</strong> {plan.rationale}
              </p>
              <div className="plan-actions">
                <button
                  type="button"
                  onClick={() => onEditPlan && onEditPlan(plan)}
                  className="btn btn--primary"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => setPendingDelete(plan)}
                  className="btn btn--danger"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Eliminar plan de entrenamiento"
        message={pendingDelete
          ? `¿Seguro que querés eliminar el plan de la semana ${new Date(pendingDelete.week_start).toLocaleDateString('es-AR')}? Esta acción no se puede deshacer.`
          : ''}
        confirmLabel="Eliminar"
        loadingLabel="Eliminando..."
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  )
}

export default TrainingPlanList
