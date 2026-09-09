import { Project, SkillCategory, JourneyMilestone, Certification, GithubRepoInfo, SocialLink } from '../types';

export const PERSONAL_INFO = {
  name: "NAGARJUNA REDDY",
  fullName: "Nagarjuna Reddy Mekala",
  profilePhoto: "/profile.jpg",
  headline: "Full-Stack Development & AI Engineering",
  tagline: "Full-Stack Developer • AI & ML Enthusiast • Open-Source Prototyper",
  status: "Available for Internships & Opportunities",
  location: "Hyderabad, India",
  phone: "+91 7569304566",
  email: "mmnagarjunareddy@gmail.com",
  githubUrl: "https://github.com/Nagarjuna-1322",
  githubUsername: "Nagarjuna-1322",
  linkedinUrl: "https://linkedin.com/in/m-nagarjuna-reddy-ab00b5323",
  resumePath: "/resume.pdf", // Easily replaceable resume file path
  summary: "Engineering student and full-stack developer specializing in building scalable web applications with modern tools, clean code practices, and artificial intelligence. Possesses hands-on engineering experience spanning Python (FastAPI, spaCy NLP, scikit-learn), TypeScript, React, Next.js, and Generative AI pipelines with Google Gemini.",
  bio: "Engineering student focused on full-stack development, building scalable web applications with modern tools and clean code practices.",
  languagesSpoken: [
    { name: "Telugu", level: "Native" },
    { name: "English", level: "Fluent" },
    { name: "Hindi", level: "Conversational" }
  ],
  stats: [
    { label: "B.Tech CGPA", value: "7.75 / 10" },
    { label: "Public Repos", value: "7 Repos" },
    { label: "Live Deployed", value: "3 Apps" },
    { label: "Hackathon Win", value: "1st Place" }
  ]
};

export const ABOUT_CARDS = [
  {
    title: "Full-Stack Developer",
    subtitle: "Modern Web & APIs",
    desc: "Building scalable web apps with React, Next.js, TypeScript, and clean backend APIs using FastAPI and Node.js.",
    icon: "Code2"
  },
  {
    title: "AI & ML Specialist",
    subtitle: "spaCy NLP & Predictive ML",
    desc: "Implementing TF-IDF matching models, spaCy resume parsing for 200+ skills, and predictive intelligence.",
    icon: "Brain"
  },
  {
    title: "Generative AI Pioneer",
    subtitle: "Gemini & Genkit Flows",
    desc: "Engineering AI assistants, automated essay generation, and geospatial routing intelligence with Google Gemini.",
    icon: "Sparkles"
  },
  {
    title: "Product Prototyper",
    subtitle: "Rapid Deployment & Cloud",
    desc: "Deploying end-to-end applications to Vercel and Firebase with real-time Firestore synchronization and Docker.",
    icon: "Rocket"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "programming-backend",
    name: "Programming & Backend",
    iconName: "Terminal",
    description: "Core languages and robust backend application architectures.",
    skills: [
      {
        name: "Python",
        proficiency: "Proficient",
        description: "Primary language for Machine Learning, FastAPI backends, spaCy NLP pipelines, and data processing.",
        tags: ["FastAPI", "AI/ML", "spaCy", "scikit-learn"],
        highlight: true
      },
      {
        name: "TypeScript / JavaScript",
        proficiency: "Proficient",
        description: "Type-safe modern web application logic, asynchronous flows, ES6+, and Node.js / Express microservices.",
        tags: ["TypeScript", "ES6+", "Node.js", "Express"],
        highlight: true
      },
      {
        name: "Java",
        proficiency: "Intermediate",
        description: "Solid foundational knowledge of Object-Oriented Programming (OOP), algorithmic thinking, and data structures.",
        tags: ["OOP", "Data Structures"],
        highlight: false
      }
    ]
  },
  {
    id: "web-dev",
    name: "Web & Frontend",
    iconName: "Layout",
    description: "Modern frontend frameworks delivering responsive, dynamic, and accessible user experiences.",
    skills: [
      {
        name: "React & Next.js",
        proficiency: "Proficient",
        description: "Component architecture, server and client components, custom hooks, and full-stack interactive UIs.",
        tags: ["React 19", "Next.js", "Vite", "SPA"],
        highlight: true
      },
      {
        name: "Tailwind CSS & Styling",
        proficiency: "Proficient",
        description: "Utility-first design systems, responsive layouts, CSS3 animations, and sleek dark mode interfaces.",
        tags: ["Tailwind 4", "Responsive", "UI/UX"],
        highlight: true
      },
      {
        name: "Data Viz & 3D Graphics",
        proficiency: "Proficient",
        description: "Interactive data charting with Recharts, interactive GIS maps with Leaflet, and WebGL 3D scenes with Three.js.",
        tags: ["Three.js", "Leaflet", "Recharts"],
        highlight: true
      }
    ]
  },
  {
    id: "ai-genai",
    name: "AI, ML & NLP",
    iconName: "BrainCircuit",
    description: "Applied machine learning, NLP extraction, and generative AI orchestration.",
    skills: [
      {
        name: "Generative AI & Gemini",
        proficiency: "Core Focus",
        description: "Google Gemini SDK, Genkit flows, multimodal prompting, structured JSON schema outputs, and agentic workflows.",
        tags: ["Google Gemini", "Genkit", "Agents", "Prompting"],
        highlight: true
      },
      {
        name: "NLP & spaCy",
        proficiency: "Core Focus",
        description: "Natural Language Processing, entity extraction, PDF resume skill parsing (200+ technical skills), and tokenization.",
        tags: ["spaCy", "NLP", "Text Mining"],
        highlight: true
      },
      {
        name: "scikit-learn & TF-IDF",
        proficiency: "Proficient",
        description: "Predictive modeling, TF-IDF vectorization, cosine similarity matching algorithms, and score ranking.",
        tags: ["scikit-learn", "TF-IDF", "Cosine Sim"],
        highlight: true
      }
    ]
  },
  {
    id: "cloud-devops",
    name: "Cloud, Database & DevOps",
    iconName: "Cloud",
    description: "Cloud databases, containerization, deployment platforms, and developer tooling.",
    skills: [
      {
        name: "Firebase",
        proficiency: "Proficient",
        description: "Real-time Cloud Firestore, Firebase Authentication, security rules, and Firebase Hosting.",
        tags: ["Firestore", "NoSQL", "Real-time", "Auth"],
        highlight: true
      },
      {
        name: "Git & GitHub",
        proficiency: "Proficient",
        description: "Branch management, pull requests, continuous open-source repository maintenance, and collaborative code reviews.",
        tags: ["VCS", "GitHub", "Collaboration"],
        highlight: true
      },
      {
        name: "Docker & Vercel",
        proficiency: "Intermediate",
        description: "Docker containerization for backend microservices and automated continuous production deployments on Vercel.",
        tags: ["Docker", "Vercel", "CI/CD"],
        highlight: true
      },
      {
        name: "AWS & Power BI",
        proficiency: "Intermediate",
        description: "Fundamental cloud compute/storage concepts and business intelligence data dashboarding.",
        tags: ["AWS", "Power BI", "Cloud"],
        highlight: false
      }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "terranex",
    title: "TERRANEX – Smart Logistics & Accessibility Intelligence",
    category: "AI / ML",
    featured: true,
    tagline: "AI-powered terrain accessibility intelligence & smart routing for India's North Eastern Region.",
    description: "Engineered an AI-powered smart logistics and accessibility intelligence platform (Remix TerraNex) built to solve navigation and supply chain bottlenecks in challenging terrains. Combines Google GenAI (Gemini) routing intelligence with interactive Leaflet geospatial mapping, hazard avoidance heuristics, and environmental sensor telemetry.",
    technologies: ["React 19", "TypeScript", "Google GenAI", "Leaflet Maps", "Express", "Tailwind CSS"],
    githubUrl: "https://github.com/Nagarjuna-1322/TERRANEX",
    liveDemoUrl: "https://github.com/Nagarjuna-1322/TERRANEX",
    metrics: [
      { label: "AI Engine", value: "Gemini SDK" },
      { label: "Geospatial", value: "Leaflet GIS" },
      { label: "Target Scope", value: "NER Terrain" }
    ],
    modalDetails: {
      problem: "Logistics, disaster relief, and accessibility in rugged mountainous areas (like India's North Eastern Region) face severe delays due to landslides, unpredictable weather, and lack of real-time terrain intelligence.",
      solution: "TERRANEX analyzes geographical topography, accessibility barriers, and dynamic route conditions using Gemini AI reasoning paired with high-performance Leaflet geospatial mapping to provide actionable navigation guidance.",
      keyFeatures: [
        "Interactive terrain and route mapping with custom GIS boundary overlays using Leaflet",
        "AI-assisted accessibility intelligence analyzing risk factors, elevation, and road viability",
        "Dynamic routing heuristics powered by Google GenAI models",
        "Sensor telemetry integration (camera/geolocation interfaces) for real-time reporting",
        "Responsive, high-contrast dashboard with live status indicators and telemetry cards"
      ],
      techStackDetails: [
        { category: "Frontend & UI", tools: ["React 19", "TypeScript", "Tailwind CSS", "Motion", "Lucide Icons"] },
        { category: "Geospatial & Mapping", tools: ["Leaflet", "@types/leaflet", "OpenStreetMap GIS Tile Engine"] },
        { category: "AI & Intelligence", tools: ["Google GenAI (Gemini SDK)", "Terrain Risk Heuristics"] },
        { category: "Backend / Services", tools: ["Express", "Node.js", "RESTful Routing APIs"] }
      ],
      developmentProcess: [
        "Studied terrain navigation and supply challenges unique to high-altitude and rugged environments.",
        "Constructed the geospatial map viewport utilizing Leaflet with smooth interactive controls.",
        "Integrated the Google GenAI TypeScript SDK on the server side to analyze route risks and synthesize accessibility advisories.",
        "Designed real-time metrics dashboards displaying weather impact, slope difficulty, and transit feasibility."
      ],
      architectureHighlights: [
        "Full-stack architecture with Express proxying Gemini API requests securely",
        "Lightweight Leaflet vector rendering preventing UI lag on high zoom levels",
        "Modular terrain risk scoring algorithm"
      ]
    }
  },
  {
    id: "scholar-ai",
    title: "ScholarAI – AI-Based Scholarship Finder",
    category: "AI / ML",
    featured: true,
    tagline: "AI educational assistant featuring natural language scholarship discovery and automated essay drafts.",
    description: "Developed and deployed a production web platform helping students navigate scholarship opportunities with Gemini AI and Genkit. Features natural language search, personalized eligibility matching explanations, automated draft essay synthesis, and real-time Firebase Firestore data synchronization.",
    technologies: ["Next.js", "React", "TypeScript", "Google Gemini", "Genkit", "Tailwind CSS", "Firebase", "Zod"],
    githubUrl: "https://github.com/Nagarjuna-1322/scholar-ai",
    liveDemoUrl: "https://scholar-ai-seven-lac.vercel.app",
    metrics: [
      { label: "AI Engine", value: "Gemini + Genkit" },
      { label: "Feature", value: "Essay Generator" },
      { label: "Deployment", value: "Live on Vercel" }
    ],
    modalDetails: {
      problem: "Students frequently miss out on critical government and private financial grants because scholarship opportunities are scattered across hundreds of disparate portals with complex, legalistic eligibility criteria.",
      solution: "ScholarAI consolidates scholarship opportunities into an intelligent, centralized platform. It uses Gemini AI and Genkit to parse requirements, match students with optimal funding opportunities, and even draft tailored application essays.",
      keyFeatures: [
        "Natural language scholarship queries powered by Google Gemini and Genkit",
        "Personalized eligibility advisor providing clear qualification checklists and match percentages",
        "Automated AI Scholarship Essay Generator crafting customized, high-quality application drafts",
        "Secure Firebase Firestore backend delivering instant updates on deadlines and applications",
        "Saved applications tracker to ensure students never miss an upcoming submission deadline"
      ],
      techStackDetails: [
        { category: "Frontend & Full Stack", tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Lucide React"] },
        { category: "AI & Generation", tools: ["Google Gemini API", "Genkit", "Prompt Engineering", "Zod Validation"] },
        { category: "Backend & Database", tools: ["Firebase Firestore", "Firebase Authentication", "Vercel Serverless"] }
      ],
      developmentProcess: [
        "Engineered the responsive Next.js frontend with intuitive natural language search input.",
        "Integrated Firebase Firestore with real-time listeners for instantaneous updates on deadlines.",
        "Constructed Gemini prompt chains via Genkit to extract criteria and generate structured essay drafts.",
        "Deployed to Vercel with automated CI/CD pipeline and environment secret shielding."
      ],
      architectureHighlights: [
        "Real-time database sync for instant status updates",
        "Type-safe schema validation using Zod for AI output predictability",
        "Deployed production build running on Vercel"
      ]
    }
  },
  {
    id: "career-path-predictor",
    title: "AI-Driven Career Path Predictor",
    category: "AI / ML",
    featured: true,
    tagline: "ML platform with spaCy resume parsing, TF-IDF skill matching, and personalized 6-12 month roadmaps.",
    description: "Full-stack intelligent career guidance platform that parses PDF resumes using spaCy NLP (extracting 200+ technical skills), matches user vectors against 15+ career paths via TF-IDF vectorization and cosine similarity, and synthesizes 6-12 month personalized learning roadmaps with Recharts data visualizers.",
    technologies: ["Python", "FastAPI", "spaCy NLP", "scikit-learn", "React", "Recharts", "Firebase", "Docker"],
    githubUrl: "https://github.com/Nagarjuna-1322/carrer-path-prdictor",
    liveDemoUrl: "https://carrer-path-prdictor.vercel.app",
    metrics: [
      { label: "NLP Extraction", value: "200+ Skills (spaCy)" },
      { label: "ML Matching", value: "TF-IDF + Cosine" },
      { label: "Status", value: "Live on Vercel" }
    ],
    modalDetails: {
      problem: "Students and early professionals struggle to identify which technology careers best fit their existing skills and lack structured, month-by-month roadmaps to bridge their technical gaps.",
      solution: "A machine-learning career guidance platform that extracts skills directly from uploaded resumes or manual input, compares them mathematically against industry role vectors, and generates a personalized learning plan.",
      keyFeatures: [
        "PDF Resume Parser extracting 200+ technical skills automatically using spaCy NLP entity recognition",
        "Machine Learning Career Matching using TF-IDF vectorization and cosine similarity across 15+ career paths",
        "Interactive Skill Gap Analysis detailing strengths, missing competencies, and high-value certifications",
        "Dynamic 6-12 month personalized learning roadmap with curated courses, documentation, and milestones",
        "Demo Mode with preloaded profiles (Beginner Python, Frontend Dev, Data Analyst) for immediate testing"
      ],
      techStackDetails: [
        { category: "ML & NLP Backend", tools: ["Python 3.9+", "FastAPI", "spaCy NLP", "scikit-learn (TF-IDF)", "PyPDF2"] },
        { category: "Frontend UI", tools: ["React 18", "TypeScript", "Tailwind CSS", "Recharts", "Lucide React"] },
        { category: "Database & Auth", tools: ["Firebase Firestore", "Firebase Authentication"] },
        { category: "DevOps & Infrastructure", tools: ["Docker", "Vercel", "Uvicorn"] }
      ],
      developmentProcess: [
        "Trained and configured spaCy pattern matching to identify over 200 software and AI skill keywords.",
        "Constructed TF-IDF vectorizers and cosine distance scoring algorithms for 15+ canonical career paths.",
        "Built FastAPI backend endpoints with Pydantic schemas and CORS configuration.",
        "Created an interactive React dashboard with Recharts skill radar and step-by-step roadmap milestones."
      ],
      architectureHighlights: [
        "Sub-second NLP resume skill extraction and vector similarity scoring",
        "Clean separation between FastAPI ML service and responsive React frontend",
        "Real-time Firestore user profile synchronization and saved roadmap history"
      ]
    }
  },
  {
    id: "protfolio-3d",
    title: "Interactive 3D Engineering Portfolio",
    category: "Web Development",
    featured: false,
    tagline: "Modern 3D portfolio featuring Three.js WebGL canvas, Lenis inertial scroll, and Firebase visitor tracking.",
    description: "Architected a high-performance 3D developer portfolio showcasing interactive WebGL experiences, ATS-optimized resume exports, real-time Firebase telemetry, and a futuristic dark cyber aesthetic.",
    technologies: ["React 19", "Three.js", "TypeScript", "Tailwind CSS", "Motion", "Lenis", "Firebase"],
    githubUrl: "https://github.com/Nagarjuna-1322/protfolio",
    liveDemoUrl: "https://protfolio-7iup.vercel.app/",
    metrics: [
      { label: "3D Visuals", value: "Three.js WebGL" },
      { label: "Scroll Feel", value: "Lenis Smooth" },
      { label: "Analytics", value: "Real-time Firebase" }
    ],
    modalDetails: {
      problem: "Traditional developer resumes and flat portfolio websites fail to visually demonstrate frontend graphics capability, performance optimization, and interactive state management.",
      solution: "Built a fully immersive, interactive portfolio integrating 3D WebGL scenes, smooth scroll physics, and comprehensive engineering project breakdowns.",
      keyFeatures: [
        "Interactive 3D Holographic Quantum Core and rotating 3D orbital skill spheres built with Three.js",
        "Lenis inertial smooth scrolling delivering high-framerate visual transitions",
        "ATS-optimized interactive Resume Modal with one-click print, copy, and PDF download",
        "Real-time Firebase Firestore visitor telemetry counter and security rules",
        "Responsive, mobile-friendly design with fluid touch controls"
      ],
      techStackDetails: [
        { category: "Frontend & 3D", tools: ["React 19", "Three.js", "TypeScript", "Motion", "Tailwind CSS"] },
        { category: "Smooth Scroll", tools: ["@studio-freight/lenis", "Custom scroll hooks"] },
        { category: "Database & Backend", tools: ["Firebase Firestore", "Vite", "Vercel"] }
      ],
      developmentProcess: [
        "Modeled mathematical particle clouds, icosahedron meshes, and ring geometries in Three.js.",
        "Integrated Lenis smooth scrolling for cinematic page navigation.",
        "Built ATS-compliant structured resume view with copy-to-clipboard functionality.",
        "Configured atomic visitor counting in Cloud Firestore."
      ],
      architectureHighlights: [
        "Optimized WebGL render loops pausing when canvas elements are offscreen",
        "Sub-second page load times with asset lazy-loading",
        "Zero layout shifts across desktop and mobile viewports"
      ]
    }
  },
  {
    id: "python-algorithms",
    title: "Python Core & Algorithmic Computing",
    category: "Full Stack",
    featured: false,
    tagline: "Curated repository of Python algorithms, data structures, and computational problem solving.",
    description: "Open-source codebase showcasing idiomatic Python programming, algorithmic computing, recursion, object-oriented design patterns, and utility scripts.",
    technologies: ["Python 3", "Data Structures", "Algorithms", "OOP", "Scripts"],
    githubUrl: "https://github.com/Nagarjuna-1322/python",
    liveDemoUrl: "https://github.com/Nagarjuna-1322/python",
    metrics: [
      { label: "Language", value: "Python 3" },
      { label: "Codebase", value: "Open Source" },
      { label: "Focus", value: "Data Structures" }
    ],
    modalDetails: {
      problem: "Mastering complex machine learning algorithms and technical coding assessments requires continuous, disciplined algorithmic problem solving in Python.",
      solution: "Created a structured repository implementing core data structures, algorithms, and computational problem-solving workflows with clean, documented code.",
      keyFeatures: [
        "Implementation of core data structures: linked lists, trees, graphs, heaps, and hash maps",
        "Sorting, searching, and dynamic programming algorithm implementations",
        "Clean, PEP 8 compliant code structure with comprehensive comments",
        "Practical helper scripts for data parsing, file transformations, and automation"
      ],
      techStackDetails: [
        { category: "Language & Runtimes", tools: ["Python 3.9+", "Standard Library"] },
        { category: "Concepts", tools: ["Data Structures", "Dynamic Programming", "Recursion", "OOP"] }
      ],
      developmentProcess: [
        "Solved and documented algorithmic problems covering multiple complexity classes.",
        "Structured modular packages for reusable data structure classes."
      ],
      architectureHighlights: [
        "Clean algorithmic complexity analysis (time and space complexity)",
        "Zero-dependency pure Python implementations"
      ]
    }
  }
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: "gnit-btech",
    period: "2024 — 2028",
    year: "Present (3rd Year)",
    title: "B.Tech in Artificial Intelligence & Machine Learning",
    organization: "Guru Nanak Institute of Technology (GNIT)",
    location: "Hyderabad, India",
    category: "Education",
    description: "Pursuing Bachelor of Technology in AI & ML with strong focus on deep learning fundamentals, algorithmic computing, web technologies, and practical AI application development.",
    achievements: [
      "Current Academic Standing: Cumulative Grade Point Average (CGPA) of 7.75 / 10.0",
      "Core Coursework: Machine Learning, Artificial Intelligence, Data Structures, Python Programming, Database Systems"
    ],
    badge: "Graduation 2028"
  },
  {
    id: "hackathon-1st",
    period: "2024",
    year: "2024",
    title: "1st Place Winner — 24-Hour Rapid Prototyping Hackathon",
    organization: "Tech Titans Club",
    location: "Hyderabad",
    category: "Award",
    description: "Secured First Prize in an intensive 24-hour sprint prototyping practical software solutions under strict time constraints, competing against top university engineering teams.",
    achievements: [
      "Designed and deployed a working MVP prototype within 24 hours",
      "Spearheaded core application architecture, frontend interactivity, and real-time database flow"
    ],
    badge: "🏆 1st Prize Winner"
  },
  {
    id: "devnovate-volunteer",
    period: "2024",
    year: "2024",
    title: "Technical Volunteer & Event Organizer",
    organization: "Devnovate 24-Hour National-Level Campus Hackathon",
    location: "GNIT Campus",
    category: "Leadership",
    description: "Contributed as an active event organizer and technical volunteer, managing logistics, technical infrastructure, and assisting participating teams throughout the national-level competition.",
    achievements: [
      "Awarded Volunteer Recognition Certificate for exceptional leadership and operational management",
      "Mentored junior participants on debugging and deployment workflows"
    ],
    badge: "National Hackathon"
  },
  {
    id: "narayana-inter",
    period: "2022 — 2024",
    year: "Passed 2024",
    title: "Intermediate (Class XII) — MPC Stream",
    organization: "Narayana Junior College",
    location: "Hyderabad, India",
    category: "Education",
    description: "Completed higher secondary education in Mathematics, Physics, and Chemistry (MPC) with stellar academic excellence.",
    achievements: [
      "Academic Standings: Cumulative Score of 95%",
      "Solid mathematical and analytical foundation for computational modeling"
    ]
  },
  {
    id: "sri-chaitanya-ssc",
    period: "2022",
    year: "Passed 2022",
    title: "Secondary School Certificate (Class X)",
    organization: "Sri Chaitanya Techno School",
    location: "Hyderabad, India",
    category: "Education",
    description: "Completed secondary school education with top-tier academic honors.",
    achievements: [
      "Academic Standings: Cumulative Grade Point Average (CGPA) of 9.8 / 10.0"
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "cert-google-genai",
    title: "Introduction to Generative AI",
    issuer: "Google",
    date: "Verified",
    description: "Comprehensive credential covering foundational concepts of Generative AI, transformer architectures, and Google's large-scale AI ecosystems.",
    skillsCovered: ["Generative AI", "Foundations", "Google Cloud AI"],
    credentialUrl: "https://github.com/Nagarjuna-1322"
  },
  {
    id: "cert-google-gemini",
    title: "Large Language Model (LLM) Prompting with Gemini",
    issuer: "Google",
    date: "Verified",
    description: "Advanced techniques in prompt engineering, context window management, few-shot prompting, and utilizing the Gemini model family for reasoning tasks.",
    skillsCovered: ["Gemini LLM", "Prompt Engineering", "Multimodal Prompts"],
    credentialUrl: "https://github.com/Nagarjuna-1322"
  },
  {
    id: "cert-ms-prompt-eng",
    title: "Introduction to Prompt Engineering",
    issuer: "Microsoft",
    date: "Verified",
    description: "Mastery of structured prompting patterns, zero-shot and few-shot calibration, hallucinations reduction, and enterprise LLM integration principles.",
    skillsCovered: ["Prompt Engineering", "LLM Optimization", "AI Safety"],
    credentialUrl: "https://github.com/Nagarjuna-1322"
  },
  {
    id: "cert-devnovate-volunteer",
    title: "Volunteer Recognition Certificate",
    issuer: "Hackathon / Organization",
    date: "2024",
    description: "Awarded for outstanding technical volunteering, logistics coordination, and team mentorship at the Devnovate 24-Hour National Hackathon.",
    skillsCovered: ["Technical Leadership", "Event Logistics", "Team Mentoring"],
    credentialUrl: "https://github.com/Nagarjuna-1322"
  }
];

export const GITHUB_REPOS: GithubRepoInfo[] = [
  {
    name: "TERRANEX",
    description: "AI-Powered Smart Logistics & Accessibility Intelligence (Remix TerraNex) with Google GenAI & Leaflet GIS.",
    stars: 1,
    forks: 0,
    language: "TypeScript / React",
    url: "https://github.com/Nagarjuna-1322/TERRANEX",
    topics: ["logistics", "ai", "gemini-api", "leaflet", "accessibility", "typescript"],
    updatedAt: "2026"
  },
  {
    name: "scholar-ai",
    description: "AI-powered scholarship discovery and application assistant with Gemini AI, Genkit, and automated essay drafts.",
    stars: 1,
    forks: 0,
    language: "TypeScript / Next.js",
    url: "https://github.com/Nagarjuna-1322/scholar-ai",
    homepage: "https://scholar-ai-seven-lac.vercel.app",
    topics: ["scholarship-finder", "gemini", "genkit", "nextjs", "firebase", "zod"],
    updatedAt: "2026"
  },
  {
    name: "carrer-path-prdictor",
    description: "AI-driven career path predictor with spaCy NLP resume parser, TF-IDF skill matching, and personalized 6-12 month roadmaps.",
    stars: 1,
    forks: 0,
    language: "Python / FastAPI",
    url: "https://github.com/Nagarjuna-1322/carrer-path-prdictor",
    homepage: "https://carrer-path-prdictor.vercel.app",
    topics: ["machine-learning", "spacy", "career-predictor", "fastapi", "react", "scikit-learn"],
    updatedAt: "2026"
  },
  {
    name: "protfolio",
    description: "Interactive 3D developer portfolio website with Three.js WebGL scenes, Lenis smooth scrolling, and Firebase Firestore.",
    stars: 1,
    forks: 0,
    language: "TypeScript / React 19",
    url: "https://github.com/Nagarjuna-1322/protfolio",
    homepage: "https://protfolio-7iup.vercel.app/",
    topics: ["threejs", "portfolio", "react", "motion", "firebase", "tailwind"],
    updatedAt: "2026"
  },
  {
    name: "python",
    description: "Core Python algorithms, data structures, clean idiomatic scripts, and computational problem-solving routines.",
    stars: 0,
    forks: 0,
    language: "Python 3",
    url: "https://github.com/Nagarjuna-1322/python",
    topics: ["python", "algorithms", "data-structures", "clean-code"],
    updatedAt: "2026"
  },
  {
    name: "practise",
    description: "Interactive front-end web development exercises, responsive components, and modern JavaScript experiments.",
    stars: 0,
    forks: 0,
    language: "JavaScript / HTML",
    url: "https://github.com/Nagarjuna-1322/practise",
    topics: ["html", "css", "javascript", "web-development"],
    updatedAt: "2026"
  },
  {
    name: "nagarjuna",
    description: "Special GitHub profile repository with developer stats, technical roadmap, and background overview.",
    stars: 0,
    forks: 0,
    language: "Markdown",
    url: "https://github.com/Nagarjuna-1322/nagarjuna",
    topics: ["profile", "nagarjuna-reddy", "developer-profile"],
    updatedAt: "2026"
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "GitHub",
    url: "https://github.com/Nagarjuna-1322",
    icon: "Github",
    username: "@Nagarjuna-1322"
  },
  {
    label: "LinkedIn",
    url: "https://linkedin.com/in/m-nagarjuna-reddy-ab00b5323",
    icon: "Linkedin",
    username: "m-nagarjuna-reddy-ab00b5323"
  },
  {
    label: "Email",
    url: "mailto:mmnagarjunareddy@gmail.com",
    icon: "Mail",
    username: "mmnagarjunareddy@gmail.com"
  }
];
