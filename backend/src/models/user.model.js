// src/models/user.model.js
import { supabase } from '../supabase.js';

// Helper to parse numeric IDs if applicable
const parseId = (id) => {
  const parsed = parseInt(id, 10);
  return isNaN(parsed) ? id : parsed;
};

/**
 * Obtiene todos los usuarios
 */
export const getAllUsers = async () => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*');
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    throw error;
  }
};

/**
 * Obtiene un usuario por ID
 */
export const getUserById = async (id) => {
  try {
    const parsedId = parseId(id);
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', parsedId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') { // no rows found
        return null;
      }
      throw error;
    }
    return data;
  } catch (error) {
    console.error(`Error in getUserById for id ${id}:`, error);
    throw error;
  }
};

/**
 * Crea un nuevo usuario
 */
export const createUser = async (userData) => {
  try {
    const newUser = {
      email: userData.email,
      display_name: userData.display_name,
      telegram_chat_id: userData.telegram_chat_id || null
    };

    const { data, error } = await supabase
      .from('users')
      .insert([newUser])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error in createUser:', error);
    throw error;
  }
};

/**
 * Actualiza un usuario existente
 */
export const updateUser = async (id, updates) => {
  try {
    const payload = { ...updates };
    
    // Do not allow updating primary key or creation date
    delete payload.id;
    delete payload.created_at;

    const parsedId = parseId(id);

    const { data, error } = await supabase
      .from('users')
      .update(payload)
      .eq('id', parsedId)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // no rows found
        return null;
      }
      throw error;
    }
    return data;
  } catch (error) {
    console.error(`Error in updateUser for id ${id}:`, error);
    throw error;
  }
};

/**
 * Elimina un usuario
 */
export const removeUser = async (id) => {
  try {
    const parsedId = parseId(id);

    const { data, error } = await supabase
      .from('users')
      .delete()
      .eq('id', parsedId)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // no rows found
        return null;
      }
      throw error;
    }
    return data;
  } catch (error) {
    console.error(`Error in removeUser for id ${id}:`, error);
    throw error;
  }
};

