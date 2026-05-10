import { createClient } from '@supabase/supabase-js';

// ── Public anon key — safe to expose in the browser ───────────────────────
// Get these from: Supabase Dashboard → Project Settings → API
const SUPABASE_URL  = import.meta.env.VITE_SUPABASE_URL  || '';
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

// ─────────────────────────────────────────────────────────────────────────
// Certificate helpers  (thin wrappers over the backend REST API)
// The backend acts as the authoritative proxy — do NOT call Supabase directly
// for mutations; use the backend endpoints so the admin password is checked.
// ─────────────────────────────────────────────────────────────────────────

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

/**
 * Fetch all certificates (public)
 */
export async function fetchCertificates() {
  const res = await fetch(`${API_BASE}/api/certificates`);
  if (!res.ok) throw new Error('Failed to fetch certificates');
  return res.json();
}

/**
 * Fetch a single certificate by ID (public)
 */
export async function fetchCertificate(id) {
  const res = await fetch(`${API_BASE}/api/certificates/${id}`);
  if (!res.ok) throw new Error('Certificate not found');
  return res.json();
}

/**
 * Create a new certificate  (admin only)
 */
export async function createCertificate(formData, adminPassword) {
  const res = await fetch(`${API_BASE}/api/certificates`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminPassword}`,
    },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to create certificate');
  return data;
}

/**
 * Update an existing certificate  (admin only)
 */
export async function updateCertificate(id, formData, adminPassword) {
  const res = await fetch(`${API_BASE}/api/certificates/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminPassword}`,
    },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to update certificate');
  return data;
}

/**
 * Delete a certificate  (admin only)
 */
export async function deleteCertificate(id, adminPassword) {
  const res = await fetch(`${API_BASE}/api/certificates/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${adminPassword}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to delete certificate');
  return data;
}
