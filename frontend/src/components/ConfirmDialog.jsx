import { useEffect } from 'react'

function ConfirmDialog({
  open,
  title = '¿Confirmás la acción?',
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  loadingLabel = 'Procesando...',
  loading = false,
  onConfirm,
  onCancel
}) {
  useEffect(() => {
    if (!open) {
      return undefined
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !loading) {
        onCancel?.()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, loading, onCancel])

  if (!open) {
    return null
  }

  const handleOverlayClick = () => {
    if (!loading) {
      onCancel?.()
    }
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="confirm-dialog-title" className="modal-card__title">{title}</h3>
        {message && <p className="modal-card__message">{message}</p>}

        <div className="modal-card__actions">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="btn btn--secondary"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="btn btn--danger"
          >
            {loading ? loadingLabel : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
