import { useEffect, useState } from 'react'
import { userService } from '../services/user.service'

const initialFormData = {
  email: '',
  display_name: '',
  telegram_chat_id: ''
}

function UserForm({ editingUser, onCancelEdit, onUserSaved }) {
  const [formData, setFormData] = useState(initialFormData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    if (editingUser) {
      setFormData({
        email: editingUser.email || '',
        display_name: editingUser.display_name || '',
        telegram_chat_id: editingUser.telegram_chat_id != null ? String(editingUser.telegram_chat_id) : ''
      })
      setError(null)
      setSuccess(null)
      return
    }

    setFormData(initialFormData)
    setError(null)
    setSuccess(null)
  }, [editingUser])

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

      const userPayload = {
        email: formData.email,
        display_name: formData.display_name
      }

      // Solo agregar telegram_chat_id si no está vacío
      if (formData.telegram_chat_id) {
        userPayload.telegram_chat_id = parseInt(formData.telegram_chat_id, 10)
      }

      if (editingUser?.id) {
        await userService.updateUser(editingUser.id, userPayload)
        setSuccess('¡Usuario actualizado exitosamente!')
      } else {
        await userService.createUser(userPayload)
        setSuccess('¡Usuario creado exitosamente!')
      }

      setFormData(initialFormData)

      // Notificar al padre para refrescar lista
      if (onUserSaved) {
        onUserSaved()
      }
    } catch (err) {
      setError(err.message || (editingUser?.id ? 'Error actualizando usuario' : 'Error creando usuario'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="panel panel__inner">
      <div className="panel__header">
        <div>
          <h3 className="panel__title">{editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}</h3>
          <p className="panel__subtitle">Alta rápida para poder sincronizar planes y notificaciones.</p>
        </div>
      </div>

      {error && <div className="feedback feedback--error">Error: {error}</div>}
      {success && <div className="feedback feedback--success">{success}</div>}

      <form onSubmit={handleSubmit} className="coachia-form">
        <div className="field">
          <label className="field__label">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="field__control"
          />
        </div>

        <div className="field">
          <label className="field__label">
            Nombre Completo *
          </label>
          <input
            type="text"
            name="display_name"
            value={formData.display_name}
            onChange={handleChange}
            required
            className="field__control"
          />
        </div>

        <div className="field">
          <label className="field__label">
            Telegram Chat ID (opcional)
          </label>
          <input
            type="number"
            name="telegram_chat_id"
            value={formData.telegram_chat_id}
            onChange={handleChange}
            className="field__control"
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            disabled={loading}
            className="btn btn--primary"
          >
            {loading ? (editingUser ? 'Actualizando...' : 'Creando...') : (editingUser ? 'Actualizar Usuario' : 'Crear Usuario')}
          </button>

          {editingUser && (
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

export default UserForm
