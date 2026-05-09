import React from 'react';
import { Link } from 'react-router-dom';
import studentData from '../lib/studentData.json';
import { BackgroundLines } from '../component/background-lines';

const CertificationList = () => {
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
            <div className="font-black text-black text-2xl tracking-tight">DeepFake</div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentData.map((student) => (
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
                <p className="text-sm text-gray-600 font-medium mb-2">
                  {student.course}
                </p>
                <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
      </main>
    </div>
  );
};

export default CertificationList;
