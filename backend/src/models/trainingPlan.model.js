// src/models/trainingPlan.model.js
import { supabase } from '../supabase.js';

// Helper to parse numeric IDs if applicable
const parseId = (id) => {
  const parsed = parseInt(id, 10);
  return isNaN(parsed) ? id : parsed;
};

export const getAllPlans = async () => {
  try {
    const { data, error } = await supabase
      .from('training_plans')
      .select('*');
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error in getAllPlans:', error);
    throw error;
  }
};

export const getPlanById = async (id) => {
  try {
    const parsedId = parseId(id);
    const { data, error } = await supabase
      .from('training_plans')
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
    console.error(`Error in getPlanById for id ${id}:`, error);
    throw error;
  }
};

export const createPlan = async (data) => {
  try {
    const newPlan = {
      user_id: data.user_id ? parseInt(data.user_id, 10) : null,
      week_start: data.week_start ? new Date(data.week_start) : new Date(),
      status: data.status || 'active',
      hrv_input: typeof data.hrv_input === 'number' ? data.hrv_input : null,
      decision: data.decision || null,
      load_modifier: typeof data.load_modifier === 'number' ? data.load_modifier : 0.0,
      rationale: data.rationale || null,
      workouts: data.workouts || []
    };

    const { data: createdData, error } = await supabase
      .from('training_plans')
      .insert([newPlan])
      .select()
      .single();

    if (error) throw error;
    return createdData;
  } catch (error) {
    console.error('Error in createPlan:', error);
    throw error;
  }
};

export const updatePlan = async (id, updates) => {
  try {
    const payload = { ...updates };
    
    // Do not allow updating primary key or creation date
    delete payload.id;
    delete payload.created_at;

    if (payload.user_id !== undefined) {
      payload.user_id = payload.user_id ? parseInt(payload.user_id, 10) : null;
    }

    const parsedId = parseId(id);

    const { data, error } = await supabase
      .from('training_plans')
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
    console.error(`Error in updatePlan for id ${id}:`, error);
    throw error;
  }
};

export const removePlan = async (id) => {
  try {
    const parsedId = parseId(id);

    const { data, error } = await supabase
      .from('training_plans')
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
    console.error(`Error in removePlan for id ${id}:`, error);
    throw error;
  }
};

