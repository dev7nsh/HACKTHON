import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';
import * as htmlToImage from 'html-to-image';
import { fetchCertificate } from '../lib/supabase';

/* ── helpers ── */
const formatDate = (s) => {
  if (!s) return '';
  const d = new Date(s);
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
};
const shortDate = (s) => {
  if (!s) return '';
  const d = new Date(s);
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
};

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

/* ══════════════════════════════════════════════════════════ */
const StudentCertification = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const certificateRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    fetchCertificate(studentId)
      .then(setStudent)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [studentId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-8 w-8 text-[#1e3a6e]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-500 font-medium">Verifying certificate...</p>
        </div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 flex-col gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Certificate Not Found</h1>
        <p className="text-gray-500">{error || 'The requested certification record does not exist.'}</p>
        <Link to="/Certification" className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
          Return to Verifications
        </Link>
      </div>
    );
  }

  const details = [
    { label: 'STUDENT', value: student.name },
    { label: 'INSTITUTE', value: student.college },
    { label: 'START DATE', value: shortDate(student.startDate) },
    { label: 'END DATE', value: shortDate(student.endDate) },
    { label: 'ACADEMIC YEAR', value: student.academicYear },
    { label: 'ROLL NO.', value: student.rollNo },
    { label: 'ISSUED BY', value: `${student.instructor} · Director` },
    { label: 'ISSUE DATE', value: shortDate(student.issueDate) },
  ];

  const handleDownload = async () => {
    if (!certificateRef.current || isDownloading) return;
    
    try {
      setIsDownloading(true);
      // Temporarily remove shadow for the capture to avoid transparent border rendering issues
      const originalBoxShadow = certificateRef.current.style.boxShadow;
      certificateRef.current.style.boxShadow = 'none';

      const dataUrl = await htmlToImage.toPng(certificateRef.current, {
        quality: 1.0,
        pixelRatio: 3, // High resolution
        backgroundColor: '#ffffff'
      });

      certificateRef.current.style.boxShadow = originalBoxShadow;

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${student.name.replace(/\s+/g, '_')}_Certificate.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error generating certificate image:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900">

      {/* ── Default Header ── */}
      <header className="w-full bg-white border-b border-gray-400/40 sticky top-0 left-0 z-50 backdrop-blur-sm">
        <div className="flex h-[60px] items-center justify-between px-6">
          {/* Logo + Name */}
          <Link to="/" className="flex items-center gap-2">
            <div className="font-black text-black text-2xl">DeepFake</div>
          </Link>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/#overview" className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200">
              Overview
            </Link>
            <Link to="/#who-we-are" className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200">
              Who We Are
            </Link>
            <Link to="/#what-we-do" className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200">
              What We Do
            </Link>
            <Link to="/#developer" className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200">
              Developer
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-black">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ── Two-column layout ── */}
      <main className="flex-1 w-full max-w-[1300px] mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-14 items-start">

          {/* ════ LEFT PANEL ════ */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="w-full lg:w-[36%] flex-shrink-0"
          >
            {/* Page title */}
            <motion.h1 variants={fadeUp} className="text-3xl md:text-[32px] font-bold text-gray-900 tracking-tight mb-8">
              {student.course} – Intern
            </motion.h1>

            {/* Completion card */}
            <motion.div
              variants={fadeUp}
              className="border border-gray-200 rounded-xl p-5 mb-6 bg-white"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>

                <div className="flex flex-col gap-1 flex-1">
                  {/* Completed row */}
                  <div className="flex items-center gap-1.5">
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="12" fill="#1a56db" />
                      <path d="M7 12.5l3.5 3.5 6.5-7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-bold text-[15px] text-gray-900">Completed by {student.name}</span>
                  </div>

                  <p className="text-[13px] text-gray-500">{shortDate(student.endDate)}</p>
                  <p className="text-[13px] text-gray-500">Virtual Internship (minimum 120 hours)</p>

                  <p className="text-[13px] text-gray-700 mt-2 leading-[1.7]">
                    <span className="font-semibold text-gray-900">{student.name}'s</span> internship certificate
                    is verified.{' '}
                    <span className="text-[#1a56db] font-medium hover:underline cursor-pointer">
                      developeby.me
                    </span>{' '}
                    certifies their successful completion of the {student.course} internship.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* developeby.me brand row */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <span className="text-[20px] font-black text-gray-900 tracking-tight">developeby.me</span>
              <div className="w-[1px] h-5 bg-gray-300" />
              <div>
                <p className="text-[13px] text-[#1a56db] font-semibold leading-tight">{student.course} – Intern</p>
                <p className="text-[11px] text-gray-400 leading-tight">developeby.me</p>
              </div>
            </motion.div>

            {/* Internship Details */}
            <motion.div variants={fadeUp}>
              <h2 className="text-[15px] font-bold text-gray-900 mb-3">Internship Details</h2>

              <div className="grid grid-cols-2 gap-x-6">
                {details.map(({ label, value }, i) => (
                  <motion.div key={i} variants={fadeUp} className="py-3 border-b border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em] mb-0.5">{label}</p>
                    <p className="text-[14px] font-semibold text-gray-900 leading-snug">{value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Certificate ID */}
              <div className="flex items-center gap-1.5 mt-5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <p className="text-[12px] text-gray-400">
                  Certificate ID:{' '}
                  <span className="font-semibold text-[#1a56db]">{student.certificateId}</span>
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ════ RIGHT PANEL — Certificate ════ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
            className="w-full lg:flex-1 flex flex-col gap-4 overflow-hidden"
          >
            {/* Certificate document wrapper for mobile scroll */}
            <div className="w-full overflow-x-auto pb-4">
              <div 
                ref={certificateRef}
                className="bg-white shadow-[0_4px_24px_rgba(0,0,0,0.10)] rounded-sm overflow-hidden w-full min-w-[800px] lg:min-w-0 flex flex-col relative aspect-[1.41/1]"
                style={{ backgroundImage: `url('/certificate-bg.png')`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
              >
              <div className="scale-80  flex-1 flex flex-col relative z-10 items-center justify-center text-center">
                {/* Logo */}
                <div className="flex flex-col items-center gap-1.5 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center mb-1 overflow-hidden rounded-xl">
                    <img src="/Frame.svg" alt="developeby.me" className="w-full h-full object-cover invert rounded-xl" />
                  </div>
                  <span className="text-[11px] text-gray-500 tracking-widest font-medium uppercase">developeby.me</span>
                </div>

                {/* Title */}
                <h2 className="text-[18px] md:text-[22px] font-bold text-[#1e3a6e] uppercase tracking-[0.18em] leading-tight mb-6">
                  Certificate of<br />Internship
                </h2>

                {/* Body */}
                <div className="w-full text-[12px] md:text-[13px] lg:text-[14px] text-gray-700 leading-[2] text-justify font-serif max-w-2xl px-2 md:px-6">
                  <p className="mb-5">
                    This is to certify that Ms./Mr.{' '}
                    <span className="font-bold text-[#1e3a6e]">{student.name}</span>{' '}
                    S/o / D/o{' '}
                    <span className="font-bold text-[#1e3a6e]">{student.fathersName}</span>,
                    a student of{' '}
                    <span className="font-bold text-[#1e3a6e] italic">{student.course} – Intern</span>{' '}
                    Course, Semester {student.semester} Roll No.{' '}
                    <span className="font-bold text-[#1e3a6e]">{student.rollNo}</span>{' '}
                    at{' '}
                    <span className="font-bold text-[#1e3a6e]">{student.college}</span>{' '}
                    has successfully completed a virtual internship during the academic year{' '}
                    <span className="font-bold text-[#1e3a6e]">{student.academicYear}</span>.
                  </p>
                  <p>
                    The internship was carried out at{' '}
                    <span className="font-bold text-[#1e3a6e]">developeby.me</span>{' '}
                    (Organization/Institute) from{' '}
                    <span className="font-bold text-[#1e3a6e]">{formatDate(student.startDate)}</span>{' '}
                    to{' '}
                    <span className="font-bold text-[#1e3a6e]">{formatDate(student.endDate)}</span>.{' '}
                    During the internship period, the student was assigned duties and responsibilities
                    relevant to the objectives of the internship and demonstrated sincerity, discipline,
                    and satisfactory performance.
                  </p>
                </div>

                {/* QR row */}
                <div className="w-full flex justify-start items-end mt-8 px-2">
                  {/* QR */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-[60px] h-[60px] border border-gray-300 p-0.5 bg-white">
                      <QRCode value={window.location.href} style={{ height: 'auto', maxWidth: '100%', width: '100%' }} />
                    </div>
                    <p className="text-[9px] font-semibold text-gray-500 text-center leading-tight">Scan QR Code<br />for verification link</p>
                  </div>
                </div>

              </div>
            </div>
            </div>

            {/* Download button */}
            <motion.button
              onClick={handleDownload}
              disabled={isDownloading}
              whileHover={!isDownloading ? { scale: 1.01 } : {}}
              whileTap={!isDownloading ? { scale: 0.98 } : {}}
              className={`w-full py-4 ${isDownloading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1e3a6e] hover:bg-[#162d57]'} text-white rounded-xl font-semibold text-[15px] flex items-center justify-center gap-2.5 transition-colors shadow-md`}
            >
              {isDownloading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download Certificate
                </>
              )}
            </motion.button>
          </motion.div>

        </div>
      </main>

      {/* Floating chat button */}
      <button className="fixed bottom-6 right-6 w-12 h-12 bg-[#1e3a6e] rounded-full flex items-center justify-center shadow-lg hover:bg-[#162d57] transition-colors z-50">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>
    </div>
  );
};

export default StudentCertification;
