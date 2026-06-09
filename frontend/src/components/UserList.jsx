import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import ConfirmDialog from './ConfirmDialog'
import SkeletonList from './SkeletonList'

function UserList({ refreshTrigger, onEditUser, onDeleteUser }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [actionError, setActionError] = useState(null)
  const [pendingDelete, setPendingDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)

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

  const confirmDelete = async () => {
    if (!pendingDelete) {
      return
    }

    try {
      setActionError(null)
      setDeleting(true)
      await userService.deleteUser(pendingDelete.id)
      if (onDeleteUser) {
        onDeleteUser(pendingDelete.id)
      }
      setPendingDelete(null)
    } catch (err) {
      setActionError(err.message || 'Error eliminando usuario')
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
            <h3 className="panel__title">Usuarios</h3>
            <p className="panel__subtitle">Cargando atletas sincronizados...</p>
          </div>
        </div>
        <SkeletonList rows={3} lines={2} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="state-card state-card--error">
        <h3 className="state-card__title">Usuarios</h3>
        <p className="state-card__text">Error: {error}</p>
        <div className="state-card__actions">
          <button
          type="button"
          onClick={fetchUsers}
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
          <h3 className="panel__title">Usuarios</h3>
          <p className="panel__subtitle">Base de atletas sincronizados para recibir planes adaptativos.</p>
        </div>
      </div>
      {actionError && <div className="feedback feedback--error">Error: {actionError}</div>}
      {users.length === 0 ? (
        <div className="state-card state-card--empty">
          <p className="state-card__text" style={{ fontWeight: 700, color: 'var(--text)' }}>No hay usuarios registrados.</p>
          <p className="state-card__text">Agregá uno desde el formulario para empezar a asociar planes.</p>
        </div>
      ) : (
        <div className="list-stack">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <p className="user-card__name">
                {user.display_name || 'Sin nombre'}
              </p>
              <p className="user-card__meta">Email: {user.email}</p>
              {user.telegram_chat_id && (
                <p className="user-card__meta">Telegram ID: {user.telegram_chat_id}</p>
              )}
              <p className="user-card__meta" style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
                Creado: {new Date(user.created_at).toLocaleDateString('es-AR')}
              </p>
              <div className="plan-actions">
                <button
                  type="button"
                  onClick={() => onEditUser && onEditUser(user)}
                  className="btn btn--primary"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => setPendingDelete(user)}
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
        title="Eliminar usuario"
        message={pendingDelete
          ? `¿Seguro que querés eliminar a ${pendingDelete.display_name || pendingDelete.email}? Esta acción no se puede deshacer.`
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

export default UserList
