import React, { useEffect, useState } from 'react';
import { X, Download, Printer, Copy, Check, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Check if resume.pdf exists or create instant download of formatted plain text / trigger download
    const link = document.createElement('a');
    link.href = PERSONAL_INFO.resumePath;
    link.download = `${PERSONAL_INFO.fullName.replace(/\s+/g, '_')}_Resume.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyText = () => {
    const resumeText = `
${PERSONAL_INFO.fullName}
Hyderabad, India • ${PERSONAL_INFO.phone} • ${PERSONAL_INFO.email}
LinkedIn: ${PERSONAL_INFO.linkedinUrl} • GitHub: ${PERSONAL_INFO.githubUrl}

PROFESSIONAL SUMMARY:
${PERSONAL_INFO.summary}

EDUCATION:
- Guru Nanak Institute of Technology (GNIT) — B.Tech in AI & ML (3rd Year, CGPA 7.75/10.0, Grad: 2028)
- Narayana Junior College — Intermediate Class XII (95%, Passed 2024)
- Sri Chaitanya Techno School — Class X SSC (CGPA 9.8/10.0, Passed 2022)

TECHNICAL SKILLS:
- Languages: Python (Proficient), TypeScript, JavaScript, Java (Basic)
- Web & Frontend: React 19, Next.js, Tailwind CSS, Leaflet Maps, Three.js, HTML5/CSS3
- AI, ML & NLP: Google Gemini SDK, Genkit, spaCy NLP (200+ skill parsing), scikit-learn (TF-IDF vectorization), Prompt Engineering
- Backend & Cloud: FastAPI, Node.js, Express, Firebase (Firestore, Auth), Docker, Vercel, Git, GitHub

FEATURED PROJECTS:
1. TERRANEX – Smart Logistics & Accessibility Intelligence (React 19, TypeScript, Google GenAI, Leaflet Maps, Express)
2. ScholarAI – AI-Based Scholarship Finder (Next.js, React, Google Gemini, Genkit, Firebase, Vercel)
3. AI-Driven Career Path Predictor (Python, FastAPI, spaCy NLP, scikit-learn, React, Recharts, Docker)
4. Interactive 3D Engineering Portfolio (React 19, Three.js, TypeScript, Lenis, Firebase, Tailwind CSS)

AWARDS & CERTIFICATIONS:
- 1st Place Winner: Tech Titans 24-Hour Rapid Prototyping Hackathon
- Introduction to Generative AI — Google
- Large Language Model (LLM) Prompting with Gemini — Google
- Introduction to Prompt Engineering — Microsoft
- Volunteer Recognition Certificate — Devnovate 24-Hour Hackathon
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      id="resume-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-lg animate-fade-in overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div
        id="resume-modal-content"
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0a0a0a] border border-cyan-500/40 p-5 sm:p-8 shadow-2xl shadow-cyan-950/60 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 id="resume-modal-title" className="text-lg sm:text-xl font-bold text-white font-display">
                Curriculum Vitae / Resume
              </h2>
              <span className="text-xs text-gray-400 font-mono">
                ATS-Optimized • Updated 2026
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold border border-white/10 flex items-center gap-1.5 transition-all cursor-pointer"
              title="Copy resume as plain text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold border border-white/10 flex items-center gap-1.5 transition-all cursor-pointer"
              title="Print resume"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-4 py-1.5 rounded-lg bg-cyan-500 text-black font-bold hover:bg-cyan-400 text-xs shadow-[0_0_12px_rgba(6,182,212,0.3)] flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors ml-2 cursor-pointer"
              aria-label="Close resume modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ATS-Formatted Document Container */}
        <div className="mt-6 bg-white text-slate-900 rounded-2xl p-6 sm:p-10 shadow-inner font-sans selection:bg-cyan-200">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-slate-900 pb-4 mb-6">
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-slate-900">
                {PERSONAL_INFO.fullName}
              </h1>
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-3 text-xs text-slate-700 mt-2 font-medium">
                <span>{PERSONAL_INFO.location}</span>
                <span>•</span>
                <a href={`tel:${PERSONAL_INFO.phone}`} className="hover:underline text-blue-800">
                  {PERSONAL_INFO.phone}
                </a>
                <span>•</span>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:underline text-blue-800">
                  {PERSONAL_INFO.email}
                </a>
                <span>•</span>
                <a href={PERSONAL_INFO.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-800">
                  LinkedIn Profile
                </a>
                <span>•</span>
                <a href={PERSONAL_INFO.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-800">
                  GitHub @{PERSONAL_INFO.githubUsername}
                </a>
              </div>
            </div>

            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-slate-300 shadow-sm shrink-0">
              <img
                src={PERSONAL_INFO.profilePhoto}
                alt={PERSONAL_INFO.fullName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Section 1: Professional Summary */}
          <div className="mb-5">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed text-justify">
              {PERSONAL_INFO.summary}
            </p>
          </div>

          {/* Section 2: Education */}
          <div className="mb-5">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Education
            </h2>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-slate-900">
                    Guru Nanak Institute of Technology (GNIT)
                  </div>
                  <div className="text-slate-700 italic">
                    Bachelor of Technology (B.Tech) in Artificial Intelligence and Machine Learning (AI & ML) — 3rd Year
                  </div>
                  <div className="text-slate-700 font-medium">
                    • Academic Standings: Cumulative Grade Point Average (CGPA) of <strong className="text-slate-900">7.75 / 10.0</strong>
                  </div>
                </div>
                <span className="font-semibold text-slate-900 shrink-0 text-right">Graduation: 2028</span>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-slate-900">Narayana Junior College</div>
                  <div className="text-slate-700 italic">Intermediate (Class XII)</div>
                  <div className="text-slate-700 font-medium">
                    • Academic Standings: Cumulative Score of <strong className="text-slate-900">95%</strong>
                  </div>
                </div>
                <span className="font-semibold text-slate-900 shrink-0 text-right">Passed: 2024</span>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-slate-900">Sri Chaitanya Techno School</div>
                  <div className="text-slate-700 italic">Secondary School Certificate (Class X)</div>
                  <div className="text-slate-700 font-medium">
                    • Academic Standings: Cumulative Grade Point Average (CGPA) of <strong className="text-slate-900">9.8 / 10.0</strong>
                  </div>
                </div>
                <span className="font-semibold text-slate-900 shrink-0 text-right">Passed: 2022</span>
              </div>
            </div>
          </div>

          {/* Section 3: Technical Skills */}
          <div className="mb-5">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Technical Skills
            </h2>
            <div className="space-y-1 text-xs sm:text-sm text-slate-800">
              <div>
                <strong className="text-slate-900">Languages:</strong> Python (Proficient), TypeScript, JavaScript, Java (Basic)
              </div>
              <div>
                <strong className="text-slate-900">Web & Frontend:</strong> React 19, Next.js, Tailwind CSS, Leaflet Maps, Three.js, HTML5/CSS3
              </div>
              <div>
                <strong className="text-slate-900">AI, ML & NLP:</strong> Google Gemini SDK, Genkit, spaCy NLP (200+ skill extraction), scikit-learn (TF-IDF), Prompt Engineering
              </div>
              <div>
                <strong className="text-slate-900">Backend & Cloud:</strong> FastAPI, Node.js, Express, Firebase Firestore & Auth, Docker, Vercel, Git & GitHub
              </div>
            </div>
          </div>

          {/* Section 4: Projects */}
          <div className="mb-5">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Key Engineering Projects
            </h2>
            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <div className="font-bold text-slate-900 flex justify-between">
                  <span>TERRANEX – Smart Logistics & Accessibility Intelligence</span>
                  <span className="text-slate-700 font-normal italic">React 19, TypeScript, Google GenAI, Leaflet, Express</span>
                </div>
                <ul className="list-disc list-inside text-slate-800 space-y-0.5 mt-1">
                  <li>Engineered an AI-powered smart logistics platform solving supply chain and route accessibility challenges across complex terrains in North Eastern India.</li>
                  <li>Integrated interactive GIS mapping using Leaflet and automated route hazard heuristics synthesized through Google Gemini AI SDK.</li>
                </ul>
              </div>

              <div>
                <div className="font-bold text-slate-900 flex justify-between">
                  <span>ScholarAI – AI-Based Scholarship Finder</span>
                  <span className="text-slate-700 font-normal italic">Next.js, React, Google Gemini, Genkit, Firebase</span>
                </div>
                <ul className="list-disc list-inside text-slate-800 space-y-0.5 mt-1">
                  <li>Built and deployed an AI platform featuring natural language scholarship discovery and automated personalized application essay drafting.</li>
                  <li>Integrated Firebase Firestore with real-time listeners and deployed continuous CI/CD build to Vercel.</li>
                </ul>
              </div>

              <div>
                <div className="font-bold text-slate-900 flex justify-between">
                  <span>AI-Driven Career Path Predictor</span>
                  <span className="text-slate-700 font-normal italic">Python, FastAPI, spaCy NLP, scikit-learn, React</span>
                </div>
                <ul className="list-disc list-inside text-slate-800 space-y-0.5 mt-1">
                  <li>Engineered full-stack career advisor with spaCy NLP parsing 200+ skills from uploaded PDF resumes and matching them to 15+ career paths via TF-IDF vectorization and cosine similarity.</li>
                  <li>Created responsive React dashboard with Recharts skill radar and personalized 6-12 month learning roadmaps.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 5: Awards & Extra-Curricular */}
          <div className="mb-5">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Awards & Extra-Curricular Activities
            </h2>
            <ul className="list-disc list-inside text-xs sm:text-sm text-slate-800 space-y-1">
              <li>
                <strong className="text-slate-900">First Place Winner:</strong> Secured 1st Prize in the 24-hour rapid prototyping hackathon hosted by the Tech Titans Club.
              </li>
              <li>
                <strong className="text-slate-900">Technical Volunteer:</strong> Contributed as an active event organizer and volunteer for the Devnovate 24-hour national-level campus hackathon, managing logistics and assisting participant teams.
              </li>
            </ul>
          </div>

          {/* Section 6: Certifications */}
          <div className="mb-4">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Certifications
            </h2>
            <ul className="list-disc list-inside text-xs sm:text-sm text-slate-800 space-y-0.5">
              <li>Introduction to Generative AI — Google</li>
              <li>Large Language Model (LLM) Prompting with Gemini — Google</li>
              <li>Introduction to Prompt Engineering — Microsoft</li>
              <li>Volunteer Recognition Certificate — Devnovate 24-Hour Hackathon</li>
            </ul>
          </div>

          {/* Section 7: Languages Known */}
          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1">
              Languages Known
            </h2>
            <p className="text-xs sm:text-sm text-slate-800">
              Telugu (Native), English (Fluent), Hindi (Conversational)
            </p>
          </div>
        </div>

        {/* Developer Info banner */}
        <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-400 text-center">
          <span>Configurable resume source path: <code>public/resume.pdf</code> (can be customized directly in <code>portfolioData.ts</code>)</span>
        </div>
      </div>
    </div>
  );
};
