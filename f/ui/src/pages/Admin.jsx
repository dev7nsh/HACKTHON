import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createCertificate, deleteCertificate, fetchCertificates } from '../lib/supabase';

// ── Form field config ─────────────────────────────────────────────────────
const formFields = [
  { label: 'Student Name',      name: 'name',         type: 'text', placeholder: 'e.g. John Doe' },
  { label: "Father's Name",     name: 'fathersName',  type: 'text', placeholder: 'e.g. Mr. Richard Doe' },
  { label: 'Course',            name: 'course',       type: 'text', placeholder: 'e.g. BCA' },
  { label: 'Semester',          name: 'semester',     type: 'text', placeholder: 'e.g. V Semester' },
  { label: 'Roll No',           name: 'rollNo',       type: 'text', placeholder: 'e.g. 2023BCA104' },
  { label: 'College / Institute',name: 'college',     type: 'text', placeholder: 'e.g. Poddar International College' },
  { label: 'Academic Year',     name: 'academicYear', type: 'text', placeholder: 'e.g. 2025-26' },
  { label: 'Company Name',      name: 'companyName',  type: 'text', placeholder: 'e.g. developeby.me' },
  { label: 'Start Date',        name: 'startDate',    type: 'date' },
  { label: 'End Date',          name: 'endDate',      type: 'date' },
  { label: 'Grade',             name: 'grade',        type: 'text', placeholder: 'e.g. A+' },
  { label: 'Instructor Name',   name: 'instructor',   type: 'text', placeholder: 'e.g. Devesh Sharma' },
];

const emptyForm = {
  name: 'John Doe',
  fathersName: 'Mr. Richard Doe',
  course: 'Bachelor of Computer Applications (BCA)',
  semester: 'V Semester',
  rollNo: '2025BCA104',
  college: 'Poddar International College',
  academicYear: '2024-25',
  companyName: 'developeby.me',
  startDate: '2024-01-01',
  endDate: '2024-06-30',
  grade: 'A+',
  instructor: 'Devesh Sharma',
  description: 'For successfully completing the comprehensive course on React and Modern Web Development.',
};

// ── Input style ───────────────────────────────────────────────────────────
const inputCls =
  'appearance-none block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a6e] focus:border-[#1e3a6e] sm:text-sm transition-colors';

// ─────────────────────────────────────────────────────────────────────────
const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword]               = useState('');
  const [passwordError, setPasswordError]     = useState('');

  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus]     = useState({ loading: false, success: false, error: null, newId: null });

  const [certificates, setCertificates] = useState([]);
  const [listLoading, setListLoading]   = useState(false);
  const [deleteStatus, setDeleteStatus] = useState({});   // { [id]: 'loading' | 'done' | 'error' }
  const [activeTab, setActiveTab]       = useState('create'); // 'create' | 'manage'

  // ── Auth ────────────────────────────────────────────────────────────────
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'developeby123') {
      setIsAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password');
    }
  };

  // ── Load certificate list ────────────────────────────────────────────────
  const loadCertificates = () => {
    setListLoading(true);
    fetchCertificates()
      .then(setCertificates)
      .catch(console.error)
      .finally(() => setListLoading(false));
  };

  useEffect(() => {
    if (isAuthenticated && activeTab === 'manage') loadCertificates();
  }, [isAuthenticated, activeTab]);

  // ── Create ───────────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null, newId: null });
    try {
      const data = await createCertificate(formData, password);
      setStatus({ loading: false, success: true, error: null, newId: data.student.id });
      setFormData((prev) => ({ ...emptyForm, companyName: prev.companyName }));
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message, newId: null });
    }
  };

  // ── Delete ───────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this certificate? This cannot be undone.')) return;
    setDeleteStatus((prev) => ({ ...prev, [id]: 'loading' }));
    try {
      await deleteCertificate(id, password);
      setDeleteStatus((prev) => ({ ...prev, [id]: 'done' }));
      setCertificates((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      setDeleteStatus((prev) => ({ ...prev, [id]: 'error' }));
      alert(`Delete failed: ${err.message}`);
    }
  };

  // ── Login screen ─────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl"
        >
          <div>
            <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">Admin Login</h2>
            <p className="mt-2 text-center text-sm text-gray-600">Enter the admin password to access the panel</p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputCls}
              placeholder="Password"
            />
            {passwordError && <p className="text-red-500 text-sm text-center font-medium">{passwordError}</p>}
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-[#1e3a6e] hover:bg-[#162d57] transition-all"
            >
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ── Admin panel ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#1e3a6e] px-8 py-6">
            <h2 className="text-2xl font-extrabold text-white">Certificate Admin Panel</h2>
            <p className="mt-1 text-blue-200 text-sm">Manage student certificates stored in Supabase</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            {['create', 'manage'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-sm font-semibold capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-b-2 border-[#1e3a6e] text-[#1e3a6e]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'create' ? '+ Create Certificate' : '📋 Manage Certificates'}
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* ── CREATE TAB ─────────────────────────────────────────── */}
            <AnimatePresence mode="wait">
              {activeTab === 'create' && (
                <motion.form
                  key="create"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {formFields.map((field) => (
                      <div key={field.name} className="flex flex-col">
                        <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                          {field.label}
                        </label>
                        <input
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          required
                          value={formData[field.name]}
                          onChange={handleChange}
                          className={inputCls}
                          placeholder={field.placeholder}
                        />
                      </div>
                    ))}

                    <div className="flex flex-col md:col-span-2">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Certificate Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        required
                        rows={3}
                        value={formData.description}
                        onChange={handleChange}
                        className={inputCls}
                        placeholder="e.g. For successfully completing the comprehensive course on React..."
                      />
                    </div>
                  </div>

                  {status.error && (
                    <div className="text-red-500 text-sm text-center font-medium bg-red-50 p-3 rounded-lg">
                      {status.error}
                    </div>
                  )}

                  {status.success && (
                    <div className="text-green-600 text-sm text-center font-medium bg-green-50 p-4 rounded-lg flex flex-col items-center gap-2">
                      <span>✅ Certificate created and saved to Supabase!</span>
                      <a
                        href={`/Certification/${status.newId}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#1a56db] hover:underline font-bold"
                      >
                        View Certificate →
                      </a>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status.loading}
                    className={`w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-xl text-white ${
                      status.loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1e3a6e] hover:bg-[#162d57]'
                    } transition-all`}
                  >
                    {status.loading ? 'Saving to Supabase…' : 'Generate Certificate'}
                  </button>
                </motion.form>
              )}

              {/* ── MANAGE TAB ──────────────────────────────────────── */}
              {activeTab === 'manage' && (
                <motion.div
                  key="manage"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-sm text-gray-500">{certificates.length} certificate{certificates.length !== 1 ? 's' : ''} in Supabase</p>
                    <button
                      onClick={loadCertificates}
                      className="text-sm text-[#1e3a6e] hover:underline font-medium"
                    >
                      ↻ Refresh
                    </button>
                  </div>

                  {listLoading && (
                    <div className="space-y-3">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
                      ))}
                    </div>
                  )}

                  {!listLoading && certificates.length === 0 && (
                    <p className="text-center text-gray-400 py-12">No certificates found in Supabase.</p>
                  )}

                  {!listLoading && certificates.length > 0 && (
                    <div className="space-y-3">
                      {certificates.map((cert) => (
                        <div
                          key={cert.id}
                          className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-5 py-4"
                        >
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{cert.name}</p>
                            <p className="text-xs text-gray-500">{cert.certificateId} · {cert.course} · {new Date(cert.issueDate).toLocaleDateString()}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <a
                              href={`/Certification/${cert.id}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-[#1e3a6e] hover:underline font-medium"
                            >
                              View
                            </a>
                            <button
                              onClick={() => handleDelete(cert.id)}
                              disabled={deleteStatus[cert.id] === 'loading'}
                              className="text-xs text-red-500 hover:text-red-700 font-medium disabled:opacity-50"
                            >
                              {deleteStatus[cert.id] === 'loading' ? 'Deleting…' : 'Delete'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;
