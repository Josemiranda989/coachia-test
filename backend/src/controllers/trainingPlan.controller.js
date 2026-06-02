// src/controllers/trainingPlan.controller.js
import * as planModel from '../models/trainingPlan.model.js';

export const getAll = async (req, res) => {
  try {
    const plans = await planModel.getAllPlans();
    return res.status(200).json({ status: 'success', data: plans });
  } catch (error) {
    console.error('Error fetching training plans:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error', details: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await planModel.getPlanById(id);
    if (!plan) return res.status(404).json({ status: 'error', message: 'TrainingPlan not found' });
    return res.status(200).json({ status: 'success', data: plan });
  } catch (error) {
    console.error('Error fetching training plan:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error', details: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const payload = req.body;
    if (!payload.user_id || !payload.week_start) {
      return res.status(400).json({ status: 'error', message: 'user_id y week_start son requeridos' });
    }
    const newPlan = await planModel.createPlan(payload);
    return res.status(201).json({ status: 'success', data: newPlan });
  } catch (error) {
    console.error('Error creating training plan:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error', details: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updated = await planModel.updatePlan(id, updates);
    if (!updated) return res.status(404).json({ status: 'error', message: 'TrainingPlan not found' });
    return res.status(200).json({ status: 'success', data: updated });
  } catch (error) {
    console.error('Error updating training plan:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error', details: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await planModel.removePlan(id);
    if (!deleted) return res.status(404).json({ status: 'error', message: 'TrainingPlan not found' });
    return res.status(200).json({ status: 'success', message: 'TrainingPlan deleted', data: deleted });
  } catch (error) {
    console.error('Error deleting training plan:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error', details: error.message });
  }
};
