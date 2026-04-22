export const siteConfig = {
  name: "Valery Louis",
  email: "louisvalery2022@gmail.com",
  location: "Dover, Delaware",
  role: "AI Solutions Software Engineer Intern at Pratico Consulting",
  description:
    "Portfolio of Valery Louis, a computer science senior at Delaware State University with software engineering experience at Microsoft and Pratico Consulting.",
  socialLinks: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/valery-louis/",
    },
    {
      label: "GitHub",
      href: "https://github.com/Vlouis22",
    },
  ],
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Experience", href: "/experience" },
    { label: "Contact", href: "/contact" },
  ],
  stackCategories: {
    Languages: ["Python", "Java", "JavaScript", "SQL", "C#", "C", "C++", "Kotlin", "HTML", "CSS"],
    Frameworks: ["React", ".NET", "Flask", "Spring Boot", "Node.js", "Express.js", "Firebase", "REST APIs", "TensorFlow"],
    Tools: ["Microsoft Azure", "Git/GitHub", "Linux", "Postman", "Figma", "Visual Studio", "Android Studio"],
    Certifications: [
      "Google Cybersecurity Professional Certificate",
      "CodePath Software Engineer",
      "CodePath Advanced Web Development",
      "CRLA Level 2 Certified",
    ],
  },
  education: {
    school: "Delaware State University",
    degree: "B.S. in Computer Science",
    dates: "Expected May 2026",
    gpa: "4.0",
    coursework: [
      "Data Structures and Algorithms",
      "Software Engineering",
      "Data Science",
      "Artificial Intelligence",
      "Database Systems",
      "Web Development",
      "Operating Systems",
      "Computer Networking",
    ],
    highlights: ["Presidential Scholarship", "National President's List", "Multiple hackathon wins"],
    notes:
      "I am a senior studying computer science with a 4.0 GPA. My coursework has given me a strong foundation in software engineering, systems, AI, databases, and networking.",
  },
  resumePath: "/assets/ValeryLouisResume.pdf",
} as const;
