require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3001;

// ── Supabase client (service role — server side only) ──────────────────────
// Require the ws package (already installed) since Node < 22 lacks native WebSockets
const WebSocket = require('ws');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  {
    auth: {
      persistSession: false,
    },
    global: {
      WebSocket: WebSocket
    }
  }
);

// ── Middleware ─────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Auth helper ───────────────────────────────────────────────────────────
const requireAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const adminPassword = process.env.ADMIN_PASSWORD || 'developeby123';
  if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
    return res.status(401).json({ error: 'Unauthorized: Invalid admin password' });
  }
  next();
};

// ── Helper: map DB row (snake_case) → API object (camelCase) ──────────────
const toApi = (row) => ({
  id:            row.id,
  certificateId: row.certificate_id,
  issueDate:     row.issue_date,
  name:          row.name,
  fathersName:   row.fathers_name,
  course:        row.course,
  semester:      row.semester,
  rollNo:        row.roll_no,
  college:       row.college,
  academicYear:  row.academic_year,
  companyName:   row.company_name,
  startDate:     row.start_date,
  endDate:       row.end_date,
  grade:         row.grade,
  instructor:    row.instructor,
  description:   row.description,
  createdAt:     row.created_at,
});

// ── Helper: map API body (camelCase) → DB row (snake_case) ────────────────
const toDb = (body) => ({
  name:          body.name,
  fathers_name:  body.fathersName,
  course:        body.course,
  semester:      body.semester,
  roll_no:       body.rollNo,
  college:       body.college,
  academic_year: body.academicYear,
  company_name:  body.companyName,
  start_date:    body.startDate   || null,
  end_date:      body.endDate     || null,
  grade:         body.grade,
  instructor:    body.instructor,
  description:   body.description,
});

// ─────────────────────────────────────────────────────────────────────────
// ROUTES
// ─────────────────────────────────────────────────────────────────────────

// GET all certificates
app.get('/api/certificates', async (req, res) => {
  const { data, error } = await supabase
    .from('certificates')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data.map(toApi));
});

// GET single certificate by ID
app.get('/api/certificates/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('certificates')
    .select('*')
    .eq('id', req.params.id)
    .single();

  if (error || !data) return res.status(404).json({ error: 'Certificate not found' });
  res.json(toApi(data));
});

// POST — create new certificate  (admin only)
app.post('/api/certificates', requireAdmin, async (req, res) => {
  const year = new Date().getFullYear();
  const rand = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

  const newRecord = {
    certificate_id: `CERT-${year}-${rand}`,
    issue_date:     new Date().toISOString().split('T')[0],
    ...toDb(req.body),
  };

  const { data, error } = await supabase
    .from('certificates')
    .insert(newRecord)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json({
    message: 'Certificate created successfully',
    student: toApi(data),
  });
});

// PUT — update an existing certificate  (admin only)
app.put('/api/certificates/:id', requireAdmin, async (req, res) => {
  const { data, error } = await supabase
    .from('certificates')
    .update(toDb(req.body))
    .eq('id', req.params.id)
    .select()
    .single();

  if (error || !data) return res.status(404).json({ error: error?.message || 'Certificate not found' });

  res.json({
    message: 'Certificate updated successfully',
    student: toApi(data),
  });
});

// DELETE — remove a certificate  (admin only)
app.delete('/api/certificates/:id', requireAdmin, async (req, res) => {
  const { error } = await supabase
    .from('certificates')
    .delete()
    .eq('id', req.params.id);

  if (error) return res.status(500).json({ error: error.message });

  res.json({ message: 'Certificate deleted successfully' });
});

// ── Health check ──────────────────────────────────────────────────────────
app.get('/api/health', async (_req, res) => {
  const { error } = await supabase.from('certificates').select('id').limit(1);
  res.json({ status: error ? 'error' : 'ok', supabase: error ? error.message : 'connected' });
});

// ── Start server (local dev only) ─────────────────────────────────────────
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`🔗 Supabase URL: ${process.env.SUPABASE_URL}`);
  });
}

module.exports = app;
