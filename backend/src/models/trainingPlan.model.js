// src/models/trainingPlan.model.js
import crypto from 'crypto';

// Datos mockeados - reemplazar con Supabase después
const mockPlans = [
  {
    id: crypto.randomUUID(),
    user_id: 'user-123',
    week_start: new Date('2026-05-11'),
    status: 'active',
    hrv_input: 52.3,
    decision: 'maintain',
    load_modifier: 0.0,
    rationale: 'Mantener carga esta semana por recuperación adecuada',
    workouts: [
      { day: 'mon', name: 'Strength A', exercises: [{ name: 'Squat', sets: 4, reps: 6 }] },
      { day: 'wed', name: 'Conditioning', exercises: [{ name: 'Bike', duration_min: 30 }] }
    ],
    created_at: new Date('2026-05-10T09:00:00Z')
  },
  {
    id: crypto.randomUUID(),
    user_id: 'user-123',
    week_start: new Date('2026-05-04'),
    status: 'completed',
    hrv_input: 48.7,
    decision: 'deload',
    load_modifier: -0.20,
    rationale: 'HRV baja, reducido volumen',
    workouts: [
      { day: 'tue', name: 'Deload Session', exercises: [{ name: 'Light Squat', sets: 3, reps: 6, intensity_pct: 60 }] }
    ],
    created_at: new Date('2026-05-03T09:00:00Z')
  },
  {
    id: crypto.randomUUID(),
    user_id: 'user-123',
    week_start: new Date('2026-04-27'),
    status: 'completed',
    hrv_input: 60.1,
    decision: 'increase',
    load_modifier: 0.15,
    rationale: 'HRV alta, aumentar carga',
    workouts: [
      { day: 'mon', name: 'Strength B', exercises: [{ name: 'Deadlift', sets: 5, reps: 5 }] }
    ],
    created_at: new Date('2026-04-26T09:00:00Z')
  }
];

let plans = [...mockPlans];

export const getAllPlans = async () => {
  return plans;
};

export const getPlanById = async (id) => {
  return plans.find(p => p.id === id);
};

export const createPlan = async (data) => {
  const newPlan = {
    id: crypto.randomUUID(),
    user_id: data.user_id,
    week_start: data.week_start ? new Date(data.week_start) : new Date(),
    status: data.status || 'active',
    hrv_input: typeof data.hrv_input === 'number' ? data.hrv_input : null,
    decision: data.decision || null,
    load_modifier: typeof data.load_modifier === 'number' ? data.load_modifier : 0.0,
    rationale: data.rationale || null,
    workouts: data.workouts || [],
    created_at: new Date()
  };
  plans.push(newPlan);
  return newPlan;
};

export const updatePlan = async (id, updates) => {
  const plan = plans.find(p => p.id === id);
  if (!plan) return null;
  const updated = {
    ...plan,
    ...updates,
    id: plan.id,
    created_at: plan.created_at
  };
  const idx = plans.findIndex(p => p.id === id);
  plans[idx] = updated;
  return updated;
};

export const removePlan = async (id) => {
  const plan = plans.find(p => p.id === id);
  if (!plan) return null;
  plans = plans.filter(p => p.id !== id);
  return plan;
};
