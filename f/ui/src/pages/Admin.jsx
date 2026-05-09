import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'developeby123') {
      setIsAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password');
    }
  };
  const [formData, setFormData] = useState({
    name: '',
    fathersName: '',
    course: '',
    semester: '',
    rollNo: '',
    college: '',
    academicYear: '',
    companyName: 'developeby.me',
    startDate: '',
    endDate: '',
    grade: '',
    instructor: '',
    description: ''
  });

  const [status, setStatus] = useState({ loading: false, success: false, error: null, newId: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null, newId: null });
    
    try {
      const response = await fetch('http://localhost:3001/api/certificates', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Failed to generate certificate');
      
      setStatus({ loading: false, success: true, error: null, newId: data.student.id });
      // Reset form but keep companyName
      setFormData(prev => Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: key === 'companyName' ? prev[key] : '' }), {}));
      
    } catch (error) {
      setStatus({ loading: false, success: false, error: error.message, newId: null });
    }
  };

  const formFields = [
    { label: 'Student Name', name: 'name', type: 'text', placeholder: 'e.g. John Doe' },
    { label: "Father's Name", name: 'fathersName', type: 'text', placeholder: 'e.g. Mr. Richard Doe' },
    { label: 'Course', name: 'course', type: 'text', placeholder: 'e.g. BCA' },
    { label: 'Semester', name: 'semester', type: 'text', placeholder: 'e.g. V Semester' },
    { label: 'Roll No', name: 'rollNo', type: 'text', placeholder: 'e.g. 2023BCA104' },
    { label: 'College / Institute', name: 'college', type: 'text', placeholder: 'e.g. Poddar International College' },
    { label: 'Academic Year', name: 'academicYear', type: 'text', placeholder: 'e.g. 2025-26' },
    { label: 'Company Name', name: 'companyName', type: 'text', placeholder: 'e.g. developeby.me' },
    { label: 'Start Date', name: 'startDate', type: 'date' },
    { label: 'End Date', name: 'endDate', type: 'date' },
    { label: 'Grade', name: 'grade', type: 'text', placeholder: 'e.g. A+' },
    { label: 'Instructor Name', name: 'instructor', type: 'text', placeholder: 'e.g. Devansh Sharma' },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl"
        >
          <div>
            <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
              Admin Login
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter the admin password to access the panel
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-[#1e3a6e] focus:border-[#1e3a6e] focus:z-10 sm:text-sm transition-colors"
                placeholder="Password"
              />
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm text-center font-medium">{passwordError}</p>
            )}
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-[#1e3a6e] hover:bg-[#162d57] transition-all"
            >
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl"
      >
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            Certificate Admin Panel
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Generate a new certificate for a student
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-[#1e3a6e] focus:border-[#1e3a6e] focus:z-10 sm:text-sm transition-colors"
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
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-[#1e3a6e] focus:border-[#1e3a6e] focus:z-10 sm:text-sm transition-colors"
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
              <span>Student Certificate successfully generated!</span>
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

          <div>
            <button
              type="submit"
              disabled={status.loading}
              className={`group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-xl text-white ${status.loading ? 'bg-gray-400' : 'bg-[#1e3a6e] hover:bg-[#162d57]'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1e3a6e] transition-all`}
            >
              {status.loading ? 'Generating...' : 'Generate Certificate'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Admin;
