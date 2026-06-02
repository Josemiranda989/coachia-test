import { useState } from 'react'
import { userService } from '../services/user.service'

function UserForm({ onUserCreated }) {
  const [formData, setFormData] = useState({
    email: '',
    display_name: '',
    telegram_chat_id: ''
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

      const userPayload = {
        email: formData.email,
        display_name: formData.display_name
      }

      // Solo agregar telegram_chat_id si no está vacío
      if (formData.telegram_chat_id) {
        userPayload.telegram_chat_id = parseInt(formData.telegram_chat_id, 10)
      }

      await userService.createUser(userPayload)
      setSuccess(true)

      // Reset form
      setFormData({
        email: '',
        display_name: '',
        telegram_chat_id: ''
      })

      // Notificar al padre para refrescar lista
      if (onUserCreated) {
        onUserCreated()
      }

      // Limpiar mensaje success
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err.message || 'Error creando usuario')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
      <h2>Nuevo Usuario</h2>

      {error && <div style={{ color: '#d32f2f', marginBottom: '10px' }}>Error: {error}</div>}
      {success && <div style={{ color: '#4CAF50', marginBottom: '10px' }}>¡Usuario creado exitosamente!</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Nombre Completo *
          </label>
          <input
            type="text"
            name="display_name"
            value={formData.display_name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Telegram Chat ID (opcional)
          </label>
          <input
            type="number"
            name="telegram_chat_id"
            value={formData.telegram_chat_id}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
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
          {loading ? 'Creando...' : 'Crear Usuario'}
        </button>
      </form>
    </div>
  )
}

export default UserForm
