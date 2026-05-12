import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCertificates } from '../lib/supabase';
import { BackgroundLines } from '../component/background-lines';

const CertificationList = () => {
  const [students, setStudents]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  useEffect(() => {
    fetchCertificates()
      .then(setStudents)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col relative w-full overflow-hidden pt-20">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <BackgroundLines />
      </div>

      {/* Header */}
      <header className="w-full bg-white/80 border-b border-gray-200/50 fixed top-0 left-0 z-50 backdrop-blur-md">
        <div className="flex h-[60px] items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="font-black text-black text-2xl tracking-tight">Developby</div>
          </Link>
          <nav className="flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-gray-600 hover:text-black transition-colors duration-200">
              Home
            </Link>
            <div className="text-sm font-bold text-black border-b-2 border-black pb-1">
              Certifications
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-12 relative z-10">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            Student Certifications
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Verify and view official credentials issued to our top performing students.
          </p>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow border border-gray-100 animate-pulse">
                <div className="h-3 bg-gray-200 rounded w-1/3 mb-3" />
                <div className="h-5 bg-gray-200 rounded w-2/3 mb-4" />
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/3 mb-6" />
                <div className="h-10 bg-gray-200 rounded-xl" />
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
            <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-700 font-semibold text-lg">Failed to load certificates</p>
            <p className="text-gray-500 text-sm max-w-sm">{error}</p>
            <button
              onClick={() => { setLoading(true); setError(null); fetchCertificates().then(setStudents).catch(e => setError(e.message)).finally(() => setLoading(false)); }}
              className="mt-2 px-5 py-2 bg-neutral-900 text-white rounded-xl text-sm hover:bg-black transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && students.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500 font-medium">No certificates found</p>
          </div>
        )}

        {/* Certificate grid */}
        {!loading && !error && students.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((student) => (
              <div
                key={student.id}
                className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full"
              >
                <div className="mb-4">
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                    ID: {student.certificateId}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {student.name}
                  </h3>
                </div>

                <div className="flex-1">
                  <p className="text-sm text-gray-600 font-medium mb-2">{student.course}</p>
                  <p className="text-xs text-gray-400">{student.college}</p>
                  <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Issued: {new Date(student.issueDate).toLocaleDateString()}
                  </div>
                </div>

                <Link
                  to={`/Certification/${student.id}`}
                  className="mt-6 w-full flex items-center justify-center gap-2 bg-neutral-900 text-white text-sm font-medium py-3 rounded-xl hover:bg-black transition-colors"
                >
                  View Certificate
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CertificationList;
