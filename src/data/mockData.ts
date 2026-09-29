import {
  StudentProfile,
  Internship,
  SkillCourse,
  CareerRoleRequirement,
  HackathonEvent,
  InternshipApplication,
} from '../types';

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  id: 'std_01',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@tech.edu.in',
  avatar: '/src/assets/images/student_profile_avatar_1790658215897.jpg',
  college: 'National Institute of Technology, Karnataka',
  branch: 'Computer Science & Engineering',
  year: '3rd Year (Class of 2027)',
  cgpa: '8.84 / 10',
  location: 'Bangalore / Mangalore, India',
  bio: 'Passionate software engineering undergraduate eager to build scalable web applications and explore intelligent systems. Actively looking for Summer 2026 internships.',
  technicalSkills: [
    'HTML & CSS',
    'JavaScript',
    'React',
    'Python',
    'C++',
    'Data Structures',
    'Git',
    'Tailwind CSS',
    'Node.js',
    'SQL'
  ],
  softSkills: [
    'Problem Solving',
    'Team Collaboration',
    'Technical Communication',
    'Agile Methodology',
    'Time Management'
  ],
  certifications: [
    {
      id: 'cert_1',
      title: 'Meta Front-End Developer Professional Certificate',
      issuer: 'Coursera / Meta',
      date: 'Jan 2026',
      credentialUrl: 'https://coursera.org/verify/meta-frontend'
    },
    {
      id: 'cert_2',
      title: 'AWS Certified Cloud Practitioner (Foundational)',
      issuer: 'Amazon Web Services',
      date: 'Nov 2025',
      credentialUrl: 'https://aws.amazon.com/verification'
    },
    {
      id: 'cert_3',
      title: 'Algorithmic Problem Solving & Data Structures in C++',
      issuer: 'GeeksforGeeks',
      date: 'Aug 2025'
    }
  ],
  projects: [
    {
      id: 'proj_1',
      title: 'DevPulse - Collaborative Code Review Platform',
      description: 'Built a real-time web workspace for student developers to review peer code snippets with syntax highlighting and threaded discussions.',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'WebSockets'],
      githubUrl: 'https://github.com/aaravsharma/devpulse',
      liveUrl: 'https://devpulse-demo.app'
    },
    {
      id: 'proj_2',
      title: 'CampusEase - University Resource Exchange',
      description: 'Designed a micro-portal allowing 4,000+ campus students to buy/sell textbooks, borrow lab equipment, and publish workshop notes.',
      techStack: ['React', 'PostgreSQL', 'Express', 'JWT Auth'],
      githubUrl: 'https://github.com/aaravsharma/campus-ease'
    },
    {
      id: 'proj_3',
      title: 'AI Resume Keyword Matcher',
      description: 'Engineered a lightweight client-side analyzer that parses job descriptions and computes ATS keyword density for tech applicants.',
      techStack: ['Python', 'Natural Language Toolkit', 'React', 'FastAPI'],
      githubUrl: 'https://github.com/aaravsharma/ats-matcher'
    }
  ],
  experience: [
    {
      id: 'exp_1',
      company: 'TechLead University Student Club',
      role: 'Lead Web Developer & Mentor',
      duration: 'Aug 2025 - Present',
      description: 'Mentored 60+ junior peers on modern JavaScript and React fundamentals. Maintained the official annual tech festival web application.'
    }
  ],
  github: 'https://github.com/aaravsharma',
  linkedin: 'https://linkedin.com/in/aarav-sharma-tech',
  resumeFileName: 'Aarav_Sharma_Software_Resume_2026.pdf',
  targetRole: 'Web Developer'
};

export const MOCK_INTERNSHIPS: Internship[] = [
  {
    id: 'int_1',
    company: 'Razorpay',
    logo: '💳',
    title: 'Frontend Engineering Intern',
    location: 'Bangalore, India',
    workMode: 'Hybrid',
    duration: '6 Months (Jan - Jun 2026)',
    stipend: '₹45,000 / month',
    numericStipend: 45000,
    deadline: 'Oct 25, 2026',
    domain: 'Web Development',
    requiredSkills: ['React', 'JavaScript', 'HTML & CSS', 'Tailwind CSS'],
    description: 'Join the merchant dashboard experience team at Razorpay. Build responsive, accessible UI micro-frontends handling millions of payments daily.',
    perks: ['PPO Opportunity', 'Free Gourmet Meals', 'Health Insurance', 'Certificate of Excellence'],
    applicantsCount: 342,
    postedDate: '3 days ago',
    isFeatured: true
  },
  {
    id: 'int_2',
    company: 'Microsoft',
    logo: '🪟',
    title: 'Software Engineering Intern',
    location: 'Hyderabad, India',
    workMode: 'Hybrid',
    duration: '2 Months (Summer 2026)',
    stipend: '₹1,25,000 / month',
    numericStipend: 125000,
    deadline: 'Nov 15, 2026',
    domain: 'Software Engineering',
    requiredSkills: ['Data Structures', 'C++', 'Java', 'Problem Solving'],
    description: 'Work alongside industry leaders in Azure Cloud and Developer Tools. Design high-throughput microservices and scalable core algorithms.',
    perks: ['Direct PPO Consideration', 'Relocation Allowance', 'Laptop Provided', 'Executive Mentorship'],
    applicantsCount: 1240,
    postedDate: '1 day ago',
    isFeatured: true
  },
  {
    id: 'int_3',
    company: 'Swiggy',
    logo: '🛵',
    title: 'Full Stack Web Developer Intern',
    location: 'Bangalore, India',
    workMode: 'On-site',
    duration: '3 Months (May - Jul 2026)',
    stipend: '₹40,000 / month',
    numericStipend: 40000,
    deadline: 'Oct 30, 2026',
    domain: 'Web Development',
    requiredSkills: ['React', 'Node.js', 'JavaScript', 'HTML & CSS'],
    description: 'Build real-time delivery tracking views and improve web performance for the Swiggy Instamart and Food platforms.',
    perks: ['Pre-Placement Interview (PPI)', 'Swiggy Dineout Credits', 'Flexible Work Hours'],
    applicantsCount: 512,
    postedDate: '4 days ago',
    isFeatured: true
  },
  {
    id: 'int_4',
    company: 'CRED',
    logo: '💎',
    title: 'Backend Systems Intern',
    location: 'Bangalore, India',
    workMode: 'Hybrid',
    duration: '6 Months',
    stipend: '₹60,000 / month',
    numericStipend: 60000,
    deadline: 'Nov 05, 2026',
    domain: 'Software Engineering',
    requiredSkills: ['Java', 'Data Structures', 'Cloud Computing', 'SQL'],
    description: 'Contribute to mission-critical financial backend pipelines with extreme security, low latency, and distributed consistency.',
    perks: ['High-Performance MacBook Pro', 'Wellness Stipend', 'PPO Track'],
    applicantsCount: 420,
    postedDate: 'Just now',
    isFeatured: true
  },
  {
    id: 'int_5',
    company: 'Zepto',
    logo: '⚡',
    title: 'AI / Machine Learning Intern',
    location: 'Mumbai, India',
    workMode: 'Remote',
    duration: '3 Months',
    stipend: '₹35,000 / month',
    numericStipend: 35000,
    deadline: 'Oct 28, 2026',
    domain: 'AI/ML',
    requiredSkills: ['Python', 'AI/ML', 'Data Structures'],
    description: 'Optimize hyper-local demand forecasting models and dynamic catalog ranking algorithms using deep learning and gradient boosted trees.',
    perks: ['Remote Work Stipend', 'Mentorship by ex-Google researchers', 'Certificate'],
    applicantsCount: 388,
    postedDate: '2 days ago'
  },
  {
    id: 'int_6',
    company: 'Zscaler',
    logo: '🛡️',
    title: 'Cyber Security Analyst Intern',
    location: 'Pune, India',
    workMode: 'Hybrid',
    duration: '6 Months',
    stipend: '₹50,000 / month',
    numericStipend: 50000,
    deadline: 'Nov 12, 2026',
    domain: 'Cyber Security',
    requiredSkills: ['Cyber Security', 'Python', 'Cloud Computing'],
    description: 'Assist in vulnerability assessments, zero-trust network policy testing, and automated security scanning scripts.',
    perks: ['Global Security Certifications Sponsored', 'High PPO Conversion', 'Catered Lunch'],
    applicantsCount: 195,
    postedDate: '5 days ago'
  },
  {
    id: 'int_7',
    company: 'Amazon AWS',
    logo: '☁️',
    title: 'Cloud Solutions Engineering Intern',
    location: 'Bangalore, India',
    workMode: 'On-site',
    duration: '4 Months',
    stipend: '₹80,000 / month',
    numericStipend: 80000,
    deadline: 'Nov 20, 2026',
    domain: 'Cloud Computing',
    requiredSkills: ['Cloud Computing', 'Python', 'Java', 'Data Structures'],
    description: 'Help enterprise clients build scalable architectures on AWS. Write automated Infrastructure as Code (IaC) templates and migration scripts.',
    perks: ['AWS Certification Vouchers', 'Travel Allowance', 'Direct PPO Review'],
    applicantsCount: 780,
    postedDate: '6 days ago'
  },
  {
    id: 'int_8',
    company: 'Postman',
    logo: '🚀',
    title: 'Developer Experience & QA Intern',
    location: 'Bangalore, India',
    workMode: 'Remote',
    duration: '3 Months',
    stipend: '₹40,000 / month',
    numericStipend: 40000,
    deadline: 'Oct 31, 2026',
    domain: 'Software Engineering',
    requiredSkills: ['JavaScript', 'Python', 'Data Structures'],
    description: 'Help build SDK test suites, documentation snippets, and automated API regression pipelines for millions of developers worldwide.',
    perks: ['100% Remote', 'Learning Budget', 'Ergonomic Desk Reimbursement'],
    applicantsCount: 260,
    postedDate: '1 week ago'
  },
  {
    id: 'int_9',
    company: 'Groww',
    logo: '📈',
    title: 'Data Analyst Intern',
    location: 'Bangalore, India',
    workMode: 'Hybrid',
    duration: '3 Months',
    stipend: '₹35,000 / month',
    numericStipend: 35000,
    deadline: 'Nov 02, 2026',
    domain: 'Data Science',
    requiredSkills: ['Python', 'SQL', 'Data Structures'],
    description: 'Analyze user onboarding funnels, investment retention cohorts, and build automated Tableau / Metabase performance dashboards.',
    perks: ['Pre-Placement Offer Opportunity', 'Free Learning Subscriptions'],
    applicantsCount: 410,
    postedDate: '4 days ago'
  },
  {
    id: 'int_10',
    company: 'Flipkart',
    logo: '🛍️',
    title: 'Frontend React UI Intern',
    location: 'Bangalore, India',
    workMode: 'Hybrid',
    duration: '6 Months',
    stipend: '₹55,000 / month',
    numericStipend: 55000,
    deadline: 'Nov 18, 2026',
    domain: 'Web Development',
    requiredSkills: ['React', 'JavaScript', 'HTML & CSS'],
    description: 'Work on the Big Billion Days high-traffic shopping interfaces, optimize web vitals, and implement accessible checkout components.',
    perks: ['PPO Route', 'Free Transport Cab Service', 'Medical Coverage'],
    applicantsCount: 890,
    postedDate: '2 days ago'
  }
];

export const MOCK_SKILL_COURSES: SkillCourse[] = [
  {
    id: 'skill_c',
    name: 'C Programming',
    category: 'Core Systems',
    level: 'Beginner',
    iconName: 'Terminal',
    description: 'Master memory management, pointers, bitwise operations, and low-level system execution from ground up.',
    estimatedHours: '25 Hours',
    progress: 75,
    isEnrolled: true,
    resources: [
      { id: 'c_1', title: 'Pointers and Memory Architecture', type: 'video', durationOrPages: '42 mins', url: '#', completed: true },
      { id: 'c_2', title: 'Dynamic Memory Allocation (malloc, free)', type: 'practice', durationOrPages: '6 exercises', url: '#', completed: true },
      { id: 'c_3', title: 'Building a Custom Memory Allocator', type: 'project', durationOrPages: '1 mini-project', url: '#', completed: false },
      { id: 'c_4', title: 'Complete C Cheat Sheet & Pointer Arithmetic', type: 'doc', durationOrPages: '14 pages', url: '#', completed: true }
    ]
  },
  {
    id: 'skill_cpp',
    name: 'C++',
    category: 'Object Oriented & Systems',
    level: 'Intermediate',
    iconName: 'Code',
    description: 'Object-oriented programming, STL containers, smart pointers, templates, and high-performance competitive coding.',
    estimatedHours: '35 Hours',
    progress: 80,
    isEnrolled: true,
    resources: [
      { id: 'cpp_1', title: 'C++ STL Mastery: Vectors, Sets, Maps', type: 'video', durationOrPages: '1h 10m', url: '#', completed: true },
      { id: 'cpp_2', title: 'OOP Design Patterns & RAII Idioms', type: 'doc', durationOrPages: '22 pages', url: '#', completed: true },
      { id: 'cpp_3', title: 'Competitive Coding Practice Set', type: 'practice', durationOrPages: '20 problems', url: '#', completed: true },
      { id: 'cpp_4', title: 'Multithreading & C++20 Concepts', type: 'project', durationOrPages: '3 exercises', url: '#', completed: false }
    ]
  },
  {
    id: 'skill_java',
    name: 'Java',
    category: 'Enterprise & Systems',
    level: 'Intermediate',
    iconName: 'Coffee',
    description: 'Core Java, Collections framework, Multi-threading, JVM internals, and Spring Boot foundation.',
    estimatedHours: '40 Hours',
    progress: 30,
    isEnrolled: true,
    resources: [
      { id: 'java_1', title: 'Java Collections & Streams API in Action', type: 'video', durationOrPages: '55 mins', url: '#', completed: true },
      { id: 'java_2', title: 'Concurrency & Thread Pools Deep Dive', type: 'doc', durationOrPages: '18 pages', url: '#', completed: false },
      { id: 'java_3', title: 'Spring Boot Microservices Quickstart', type: 'project', durationOrPages: '1 Project', url: '#', completed: false },
      { id: 'java_4', title: 'JVM Garbage Collection Tuning Guide', type: 'practice', durationOrPages: '10 quiz items', url: '#', completed: false }
    ]
  },
  {
    id: 'skill_python',
    name: 'Python',
    category: 'Scripting & AI',
    level: 'Beginner',
    iconName: 'FileCode2',
    description: 'From Python syntax to OOP, generators, decorators, file I/O, and data processing libraries.',
    estimatedHours: '30 Hours',
    progress: 85,
    isEnrolled: true,
    resources: [
      { id: 'py_1', title: 'Pythonic Code: List Comprehensions & Lambdas', type: 'video', durationOrPages: '35 mins', url: '#', completed: true },
      { id: 'py_2', title: 'Data Wrangling with Pandas & NumPy', type: 'practice', durationOrPages: '12 challenges', url: '#', completed: true },
      { id: 'py_3', title: 'Building REST APIs with FastAPI', type: 'project', durationOrPages: 'Hands-on Lab', url: '#', completed: true },
      { id: 'py_4', title: 'AsyncIO and Concurrency in Python', type: 'doc', durationOrPages: '15 pages', url: '#', completed: false }
    ]
  },
  {
    id: 'skill_html_css',
    name: 'HTML & CSS',
    category: 'Frontend Foundation',
    level: 'Beginner',
    iconName: 'Layout',
    description: 'Semantic HTML5, CSS Flexbox, CSS Grid, responsive design, animations, and Tailwind CSS.',
    estimatedHours: '20 Hours',
    progress: 100,
    isEnrolled: true,
    resources: [
      { id: 'hc_1', title: 'Semantic Web Accessibility (A11y)', type: 'video', durationOrPages: '40 mins', url: '#', completed: true },
      { id: 'hc_2', title: 'Modern CSS Grid & Flexbox Architectures', type: 'practice', durationOrPages: '8 layouts', url: '#', completed: true },
      { id: 'hc_3', title: 'Tailwind CSS Utility-First Masterclass', type: 'doc', durationOrPages: '25 pages', url: '#', completed: true },
      { id: 'hc_4', title: 'Responsive Portfolio Page Capstone', type: 'project', durationOrPages: '1 Capstone', url: '#', completed: true }
    ]
  },
  {
    id: 'skill_javascript',
    name: 'JavaScript',
    category: 'Web & Full Stack',
    level: 'Intermediate',
    iconName: 'Braces',
    description: 'ES6+ standards, event loop, closures, asynchronous promises, DOM manipulation, and TypeScript preview.',
    estimatedHours: '35 Hours',
    progress: 90,
    isEnrolled: true,
    resources: [
      { id: 'js_1', title: 'Deep JavaScript: Closures & Scopes', type: 'video', durationOrPages: '50 mins', url: '#', completed: true },
      { id: 'js_2', title: 'Async/Await, Promises & Microtasks', type: 'practice', durationOrPages: '15 exercises', url: '#', completed: true },
      { id: 'js_3', title: 'Building a Vanilla JS Kanban Application', type: 'project', durationOrPages: '1 Project', url: '#', completed: true },
      { id: 'js_4', title: 'JavaScript Interview Top 50 Questions', type: 'doc', durationOrPages: '30 pages', url: '#', completed: true }
    ]
  },
  {
    id: 'skill_react',
    name: 'React',
    category: 'Modern Web Frontend',
    level: 'Intermediate',
    iconName: 'Atom',
    description: 'Components, state management, hooks (useMemo, useCallback), context API, routing, and performance optimization.',
    estimatedHours: '40 Hours',
    progress: 70,
    isEnrolled: true,
    resources: [
      { id: 're_1', title: 'Modern React 19 Hooks & Lifecycle', type: 'video', durationOrPages: '1h 15m', url: '#', completed: true },
      { id: 're_2', title: 'Custom Hooks for API Fetching & State', type: 'practice', durationOrPages: '5 tasks', url: '#', completed: true },
      { id: 're_3', title: 'Full-Stack E-Commerce Frontend', type: 'project', durationOrPages: '1 Full App', url: '#', completed: true },
      { id: 're_4', title: 'React Performance: Virtualization & Memoization', type: 'doc', durationOrPages: '16 pages', url: '#', completed: false }
    ]
  },
  {
    id: 'skill_dsa',
    name: 'Data Structures',
    category: 'Algorithmic Foundations',
    level: 'Advanced',
    iconName: 'Network',
    description: 'Arrays, Linked Lists, Trees, Graphs, Dynamic Programming, Greedy algorithms, and Big-O complexity analysis.',
    estimatedHours: '60 Hours',
    progress: 65,
    isEnrolled: true,
    resources: [
      { id: 'dsa_1', title: 'Binary Trees & Graph Traversals (BFS/DFS)', type: 'video', durationOrPages: '1h 30m', url: '#', completed: true },
      { id: 'dsa_2', title: 'Dynamic Programming: 1D to 2D Patterns', type: 'practice', durationOrPages: '25 problems', url: '#', completed: true },
      { id: 'dsa_3', title: 'Trie & Segment Tree Implementations', type: 'project', durationOrPages: '2 algorithms', url: '#', completed: false },
      { id: 'dsa_4', title: 'FAANG Interview Problem Cheat Sheet', type: 'doc', durationOrPages: '45 pages', url: '#', completed: false }
    ]
  },
  {
    id: 'skill_aiml',
    name: 'AI/ML',
    category: 'Artificial Intelligence',
    level: 'Intermediate',
    iconName: 'Cpu',
    description: 'Machine learning fundamentals, regression, classification, Scikit-learn, Neural Networks, and GenAI LLM APIs.',
    estimatedHours: '45 Hours',
    progress: 25,
    isEnrolled: false,
    resources: [
      { id: 'ai_1', title: 'Supervised Learning: Regressors & Classifiers', type: 'video', durationOrPages: '1h 00m', url: '#', completed: true },
      { id: 'ai_2', title: 'Hands-on Computer Vision with CNNs', type: 'practice', durationOrPages: '4 notebooks', url: '#', completed: false },
      { id: 'ai_3', title: 'Fine-Tuning & Prompt Engineering with LLMs', type: 'project', durationOrPages: '1 Mini-App', url: '#', completed: false },
      { id: 'ai_4', title: 'Mathematical Foundations of Deep Learning', type: 'doc', durationOrPages: '28 pages', url: '#', completed: false }
    ]
  },
  {
    id: 'skill_cyber',
    name: 'Cyber Security',
    category: 'Security & Infrastructure',
    level: 'Intermediate',
    iconName: 'ShieldAlert',
    description: 'Network protocols, OWASP Top 10 web vulnerabilities, cryptography, ethical hacking, and penetration testing.',
    estimatedHours: '35 Hours',
    progress: 15,
    isEnrolled: false,
    resources: [
      { id: 'cs_1', title: 'OWASP Top 10 Web Vulnerabilities Breakdown', type: 'video', durationOrPages: '48 mins', url: '#', completed: true },
      { id: 'cs_2', title: 'Hands-on SQL Injection & XSS Lab', type: 'practice', durationOrPages: '6 labs', url: '#', completed: false },
      { id: 'cs_3', title: 'Asymmetric Cryptography & SSL/TLS Handshake', type: 'doc', durationOrPages: '19 pages', url: '#', completed: false },
      { id: 'cs_4', title: 'Penetration Testing with Burp Suite', type: 'project', durationOrPages: '1 Security Audit', url: '#', completed: false }
    ]
  },
  {
    id: 'skill_cloud',
    name: 'Cloud Computing',
    category: 'Infrastructure & DevOps',
    level: 'Intermediate',
    iconName: 'Cloud',
    description: 'AWS, Google Cloud, Docker containerization, Kubernetes orchestration, CI/CD pipelines, and serverless compute.',
    estimatedHours: '35 Hours',
    progress: 40,
    isEnrolled: true,
    resources: [
      { id: 'cc_1', title: 'Docker Containers & Multi-stage Builds', type: 'video', durationOrPages: '52 mins', url: '#', completed: true },
      { id: 'cc_2', title: 'Kubernetes Pods, Services, and Deployments', type: 'practice', durationOrPages: '4 cluster labs', url: '#', completed: true },
      { id: 'cc_3', title: 'AWS Serverless Architecture (Lambda & S3)', type: 'project', durationOrPages: '1 Cloud App', url: '#', completed: false },
      { id: 'cc_4', title: 'DevOps & GitHub Actions CI/CD Pipeline', type: 'doc', durationOrPages: '22 pages', url: '#', completed: false }
    ]
  }
];

export const CAREER_ROLES_REQUIREMENTS: CareerRoleRequirement[] = [
  {
    id: 'role_web_dev',
    roleName: 'Web Developer',
    category: 'Frontend & Full Stack',
    description: 'Crafts responsive, interactive web applications, client interfaces, and robust backend integrations.',
    averageSalary: '₹6 - ₹16 LPA',
    demandLevel: 'Very High',
    requiredSkills: [
      'HTML & CSS',
      'JavaScript',
      'React',
      'Git',
      'Node.js',
      'Tailwind CSS'
    ],
    recommendedSkills: [
      'TypeScript',
      'SQL',
      'Cloud Computing',
      'Docker'
    ],
    overview: 'As a Web Developer, you need a solid grasp of UI fundamentals, modern JavaScript frameworks like React, responsive layout architecture, and version control.'
  },
  {
    id: 'role_software_dev',
    roleName: 'Software Developer',
    category: 'Core Engineering',
    description: 'Architects robust, high-performance software systems, algorithms, APIs, and scalable distributed services.',
    averageSalary: '₹8 - ₹22 LPA',
    demandLevel: 'Critical Demand',
    requiredSkills: [
      'Data Structures',
      'C++',
      'Java',
      'Python',
      'SQL',
      'Git'
    ],
    recommendedSkills: [
      'Cloud Computing',
      'System Design',
      'Docker',
      'Linux'
    ],
    overview: 'Core software engineering roles prioritize rigorous algorithmic mastery, memory management, object-oriented principles, and database query optimization.'
  },
  {
    id: 'role_data_analyst',
    roleName: 'Data Analyst',
    category: 'Analytics & Business Intelligence',
    description: 'Transforms raw business datasets into actionable insights, automated metrics dashboards, and statistical models.',
    averageSalary: '₹5 - ₹14 LPA',
    demandLevel: 'High',
    requiredSkills: [
      'Python',
      'SQL',
      'Data Structures',
      'Pandas/NumPy',
      'Tableau / PowerBI'
    ],
    recommendedSkills: [
      'AI/ML',
      'Statistical Modeling',
      'Excel Advanced',
      'R'
    ],
    overview: 'Data Analysts bridge business problems with data. They write complex SQL queries, manipulate dataframes in Python, and build intuitive visualizations.'
  },
  {
    id: 'role_aiml_eng',
    roleName: 'AI/ML Engineer',
    category: 'Machine Learning & Intelligent Systems',
    description: 'Researches, trains, and deploys predictive machine learning models, neural networks, and generative AI agents.',
    averageSalary: '₹10 - ₹26 LPA',
    demandLevel: 'Critical Demand',
    requiredSkills: [
      'Python',
      'AI/ML',
      'Data Structures',
      'Linear Algebra',
      'PyTorch / TensorFlow'
    ],
    recommendedSkills: [
      'Cloud Computing',
      'MLOps',
      'Docker',
      'Prompt Engineering'
    ],
    overview: 'AI/ML engineers combine software engineering with mathematical statistics. They build feature pipelines, train deep learning architectures, and deploy models.'
  },
  {
    id: 'role_cyber_sec',
    roleName: 'Cyber Security Analyst',
    category: 'Security & Compliance',
    description: 'Safeguards corporate infrastructure, audits codebases for security vulnerabilities, and responds to active cyber threats.',
    averageSalary: '₹7 - ₹18 LPA',
    demandLevel: 'Very High',
    requiredSkills: [
      'Cyber Security',
      'Python',
      'Networking Protocols',
      'Linux',
      'OWASP Top 10'
    ],
    recommendedSkills: [
      'Cloud Computing',
      'C',
      'Cryptography',
      'Ethical Hacking'
    ],
    overview: 'Security professionals require deep knowledge of network topologies, application vulnerabilities, penetration testing tools, and threat detection.'
  },
  {
    id: 'role_cloud_arch',
    roleName: 'Cloud Solutions Architect',
    category: 'Infrastructure & DevOps',
    description: 'Designs reliable, fault-tolerant, cost-effective cloud infrastructures and automated CI/CD deployment pipelines.',
    averageSalary: '₹9 - ₹24 LPA',
    demandLevel: 'Very High',
    requiredSkills: [
      'Cloud Computing',
      'Python',
      'Docker',
      'Kubernetes',
      'Networking'
    ],
    recommendedSkills: [
      'Linux',
      'Terraform',
      'Cyber Security',
      'Go'
    ],
    overview: 'Cloud engineers manage infrastructure at scale, automate multi-region deployments, configure load balancers, and maintain zero downtime systems.'
  }
];

export const MOCK_EVENTS: HackathonEvent[] = [
  {
    id: 'evt_1',
    title: 'HackNITK 2026: National Student Innovation Hackathon',
    type: 'Hackathon',
    organizer: 'NIT Karnataka & IEEE Student Branch',
    date: 'Oct 17 - 19, 2026',
    mode: 'Hybrid',
    location: 'Mangalore & Virtual Discord Arena',
    deadline: 'Oct 10, 2026',
    prizePool: '₹2,50,000 Cash + Cloud Credits',
    spotsLeft: 42,
    tags: ['Web3', 'AI/ML', 'HealthTech', 'Open Innovation'],
    description: 'A 36-hour adrenaline-fueled hackathon uniting 600+ top college student builders from across the nation to solve real-world industry challenges.',
    isRegistered: true
  },
  {
    id: 'evt_2',
    title: 'CodeSprint 2026: Inter-College Algorithmic Championship',
    type: 'Coding Contest',
    organizer: 'SkillBridge & CodeChef Campus Chapter',
    date: 'Oct 22, 2026 (7:00 PM - 10:00 PM)',
    mode: 'Online',
    location: 'SkillBridge Coding Arena',
    deadline: 'Oct 21, 2026',
    prizePool: '₹75,000 + Direct Interview Calls',
    spotsLeft: 310,
    tags: ['C++', 'Java', 'Python', 'Algorithms', 'Data Structures'],
    description: 'Test your algorithmic agility across 6 challenging problems rated from beginner to Grandmaster difficulty. Top 15 get direct internship interviews.',
    isRegistered: false
  },
  {
    id: 'evt_3',
    title: 'Mastering Full-Stack React 19 & Next.js Workshop',
    type: 'Workshop',
    organizer: 'Google Developer Student Clubs',
    date: 'Oct 26, 2026 (10:00 AM - 4:00 PM)',
    mode: 'Online',
    location: 'Live Interactive Stream & CodeSandbox',
    deadline: 'Oct 25, 2026',
    prizePool: 'Free Verified Digital Certificate',
    spotsLeft: 85,
    tags: ['React', 'JavaScript', 'Tailwind CSS', 'Server Components'],
    description: 'Hands-on 6-hour interactive masterclass building a production-ready SaaS dashboard from scratch with real-time API integrations.',
    isRegistered: true
  },
  {
    id: 'evt_4',
    title: 'Zero to Hero in Cyber Security: Ethical Hacking Bootcamp',
    type: 'Webinar',
    organizer: 'CyberPeace Foundation & Zscaler Mentors',
    date: 'Nov 03, 2026 (5:00 PM - 7:30 PM)',
    mode: 'Online',
    location: 'Zoom Webinar',
    deadline: 'Nov 02, 2026',
    prizePool: 'Free Security Lab Access for 1 Month',
    spotsLeft: 120,
    tags: ['Cyber Security', 'Bug Bounty', 'Network Defense'],
    description: 'Learn ethical penetration testing methodologies, live bug bounty demonstration, and steps to crack beginner security analyst roles.',
    isRegistered: false
  },
  {
    id: 'evt_5',
    title: 'AWS Student Cloud Day: Architecting on Cloud & DevOps',
    type: 'Tech Summit',
    organizer: 'Amazon Web Services User Group',
    date: 'Nov 14, 2026 (9:30 AM - 5:00 PM)',
    mode: 'In-Person',
    location: 'NIMHANS Convention Center, Bangalore',
    deadline: 'Nov 08, 2026',
    prizePool: 'Swag Bag + $100 AWS Credit Vouchers',
    spotsLeft: 60,
    tags: ['Cloud Computing', 'AWS', 'Kubernetes', 'DevOps'],
    description: 'Connect directly with AWS Solutions Architects, explore live cloud demos, network with tech recruiters, and grab exclusive developer merchandise.',
    isRegistered: false
  },
  {
    id: 'evt_6',
    title: 'AI Agents & LLM Systems: Hands-on Building Session',
    type: 'Workshop',
    organizer: 'Bangalore AI Builders Guild',
    date: 'Nov 21, 2026 (2:00 PM - 6:00 PM)',
    mode: 'Online',
    location: 'Interactive Google Meet + Colab',
    deadline: 'Nov 19, 2026',
    prizePool: 'Fast-track to AI Seed Accelerator',
    spotsLeft: 94,
    tags: ['AI/ML', 'Python', 'Prompt Engineering', 'LangChain'],
    description: 'Step-by-step deep dive into creating autonomous multi-agent systems, function calling, vector embeddings, and real-time retrieval.',
    isRegistered: false
  }
];

export const INITIAL_APPLICATIONS: InternshipApplication[] = [
  {
    id: 'app_1',
    internshipId: 'int_1',
    internshipTitle: 'Frontend Engineering Intern',
    company: 'Razorpay',
    companyLogo: '💳',
    appliedDate: 'Sep 24, 2026',
    status: 'Interview Scheduled',
    resumeUsed: 'Aarav_Sharma_Software_Resume_2026.pdf',
    workMode: 'Hybrid',
    location: 'Bangalore, India',
    stipend: '₹45,000 / month'
  },
  {
    id: 'app_2',
    internshipId: 'int_3',
    internshipTitle: 'Full Stack Web Developer Intern',
    company: 'Swiggy',
    companyLogo: '🛵',
    appliedDate: 'Sep 21, 2026',
    status: 'Under Review',
    resumeUsed: 'Aarav_Sharma_Software_Resume_2026.pdf',
    workMode: 'On-site',
    location: 'Bangalore, India',
    stipend: '₹40,000 / month'
  },
  {
    id: 'app_3',
    internshipId: 'int_10',
    internshipTitle: 'Frontend React UI Intern',
    company: 'Flipkart',
    companyLogo: '🛍️',
    appliedDate: 'Sep 18, 2026',
    status: 'Applied',
    resumeUsed: 'Aarav_Sharma_Software_Resume_2026.pdf',
    workMode: 'Hybrid',
    location: 'Bangalore, India',
    stipend: '₹55,000 / month'
  }
];
