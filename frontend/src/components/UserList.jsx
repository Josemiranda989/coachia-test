import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'

function UserList({ refreshTrigger }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [refreshTrigger])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await userService.getAllUsers()
      setUsers(data)
    } catch (err) {
      setError(err.message || 'Error cargando usuarios')
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div style={{ padding: '20px' }}>Cargando usuarios...</div>
  if (error) return <div style={{ padding: '20px', color: '#d32f2f' }}>Error: {error}</div>

  return (
    <div style={{ marginTop: '30px' }}>
      <h2>Usuarios</h2>
      {users.length === 0 ? (
        <p style={{ color: '#666' }}>No hay usuarios registrados</p>
      ) : (
        <div>
          {users.map((user) => (
            <div
              key={user.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '15px',
                backgroundColor: '#fafafa'
              }}
            >
              <p style={{ margin: '5px 0', fontWeight: 'bold' }}>
                {user.display_name || 'Sin nombre'}
              </p>
              <p style={{ margin: '5px 0', color: '#666' }}>Email: {user.email}</p>
              {user.telegram_chat_id && (
                <p style={{ margin: '5px 0', color: '#666' }}>Telegram ID: {user.telegram_chat_id}</p>
              )}
              <p style={{ margin: '5px 0', color: '#999', fontSize: '12px' }}>
                Creado: {new Date(user.created_at).toLocaleDateString('es-AR')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserList
