// src/controllers/user.controller.js
import * as userModel from '../models/user.model.js';

/**
 * GET /api/users - Obtiene todos los usuarios
 */
export const getAll = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    return res.status(200).json({
      status: 'success',
      data: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      details: error.message
    });
  }
};

/**
 * GET /api/users/:id - Obtiene un usuario por ID
 */
export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.getUserById(id);
    
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }
    
    return res.status(200).json({
      status: 'success',
      data: user
    });
  } catch (error) {
    console.error('Error fetching user:', error.message);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};

/**
 * POST /api/users - Crea un nuevo usuario
 */
export const create = async (req, res) => {
  try {
    const { email, display_name, telegram_chat_id } = req.body;
    
    // Validación básica
    if (!email || !display_name) {
      return res.status(400).json({
        status: 'error',
        message: 'email y display_name son requeridos'
      });
    }
    
    const newUser = await userModel.createUser({
      email,
      display_name,
      telegram_chat_id
    });
    
    return res.status(201).json({
      status: 'success',
      data: newUser
    });
  } catch (error) {
    console.error('Error creating user:', error.message);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};

/**
 * PATCH /api/users/:id - Actualiza un usuario
 */
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const updated = await userModel.updateUser(id, updates);
    
    if (!updated) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }
    
    return res.status(200).json({
      status: 'success',
      data: updated
    });
  } catch (error) {
    console.error('Error updating user:', error.message);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};

/**
 * DELETE /api/users/:id - Elimina un usuario
 */
export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await userModel.removeUser(id);
    
    if (!deleted) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }
    
    return res.status(200).json({
      status: 'success',
      message: 'User deleted successfully',
      data: deleted
    });
  } catch (error) {
    console.error('Error deleting user:', error.message);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};
