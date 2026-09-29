/**
 * Skill categories. `icon` is a key mapped to an icon in src/sections/Skills.jsx.
 * No proficiency percentages on purpose.
 */
export const skillGroups = [
  { id: 'programming', title: 'Programming', icon: 'braces', items: ['Java', 'C++', 'C#', 'JavaScript'] },
  { id: 'backend', title: 'Backend', icon: 'server', items: ['Spring Boot', '.NET', 'REST APIs', 'Microservices'] },
  { id: 'frontend', title: 'Frontend', icon: 'monitor', items: ['React', 'HTML', 'CSS', 'JavaScript'] },
  { id: 'database', title: 'Database', icon: 'database', items: ['MySQL', 'SQL'] },
  { id: 'devops', title: 'DevOps', icon: 'boxes', items: ['Docker', 'Jenkins', 'Kubernetes', 'Git'] },
  {
    id: 'concepts',
    title: 'Concepts',
    icon: 'lightbulb',
    items: ['OOP', 'DSA', 'DBMS', 'Operating Systems', 'Computer Networks', 'JWT Authentication', 'REST Architecture'],
  },
];

/** Words scrolling in the strip under the hero. */
export const marqueeWords = [
  'Java', 'Spring Boot', '.NET', 'C#', 'REST APIs', 'Microservices', 'MySQL',
  'React', 'Docker', 'Kubernetes', 'Jenkins', 'Git', 'DSA', 'JWT',
];
