// src/models/user.model.js
import crypto from 'crypto';

// Datos mockeados - reemplazar con Supabase después
const mockUsers = [
  {
    id: crypto.randomUUID(),
    email: 'alice@coachia.dev',
    display_name: 'Alice Dev',
    telegram_chat_id: '123456789',
    created_at: new Date('2025-01-15T10:30:00Z')
  },
  {
    id: crypto.randomUUID(),
    email: 'bob@coachia.dev',
    display_name: 'Bob Engineer',
    telegram_chat_id: null,
    created_at: new Date('2025-02-20T14:45:00Z')
  },
  {
    id: crypto.randomUUID(),
    email: 'carol@coachia.dev',
    display_name: 'Carol Designer',
    telegram_chat_id: '987654321',
    created_at: new Date('2025-03-10T08:15:00Z')
  }
];

// Simulamos una DB en memoria (será reemplazada con Supabase)
let users = [...mockUsers];

/**
 * Obtiene todos los usuarios
 */
export const getAllUsers = async () => {
  return users;
};

/**
 * Obtiene un usuario por ID
 */
export const getUserById = async (id) => {
  return users.find(u => u.id === id);
};

/**
 * Crea un nuevo usuario
 */
export const createUser = async (userData) => {
  const newUser = {
    id: crypto.randomUUID(),
    email: userData.email,
    display_name: userData.display_name,
    telegram_chat_id: userData.telegram_chat_id || null,
    created_at: new Date()
  };
  users.push(newUser);
  return newUser;
};

/**
 * Actualiza un usuario existente
 */
export const updateUser = async (id, updates) => {
  const user = users.find(u => u.id === id);
  if (!user) return null;
  
  const updated = {
    ...user,
    ...updates,
    id: user.id, // No permitir cambiar ID
    created_at: user.created_at // No permitir cambiar createdAt
  };
  
  const index = users.findIndex(u => u.id === id);
  users[index] = updated;
  return updated;
};

/**
 * Elimina un usuario
 */
export const removeUser = async (id) => {
  const user = users.find(u => u.id === id);
  if (!user) return null;
  
  users = users.filter(u => u.id !== id);
  return user;
};
