/**
 * Projects. PhotoHub is a TEAM project: keep "overview" (what the team built)
 * separate from "contribution" (what Omkar did).
 */
export const featuredProject = {
  id: 'photohub',
  name: 'PhotoHub',
  subtitle: 'Photography Services Provider System',
  badge: 'Team project',
  overview:
    'A platform that connects customers with photographers. Customers find photographers, book services and pay online; photographers manage their services and availability; admins manage the platform.',
  users: [
    { name: 'Customer', detail: 'Searches photographers, books services, pays online.' },
    { name: 'Photographer', detail: 'Manages services and availability.' },
    { name: 'Admin', detail: 'Manages the platform.' },
  ],
  features: [
    'Registration & login',
    'Photographer search',
    'Service management',
    'Booking',
    'Availability management',
    'Online payment',
    'Notifications',
    'Admin management',
    'Chatbot / recommendations',
  ],
  contribution: {
    summary:
      'My work was primarily on the payment-related .NET services and related backend functionality.',
    context: 'In the system, the .NET Payment Service handles online payments through Razorpay.',
  },
  stack: [
    { group: 'Frontend', items: ['React'] },
    { group: 'API Gateway', items: ['Node.js'] },
    { group: 'Services', items: ['Java Spring Boot', '.NET'] },
    { group: 'Database', items: ['MySQL'] },
    { group: 'Payments', items: ['.NET Payment Service', 'Razorpay'] },
    { group: 'Security', items: ['Spring Security', 'JWT', 'Role-based access control'] },
    { group: 'DevOps', items: ['Docker', 'Jenkins', 'Kubernetes', 'Cloud deployment'] },
  ],
  links: {
    github: 'https://github.com/YOUR-USERNAME/photohub', // TODO: replace
    demo: 'https://your-photohub-demo.example', // TODO: replace
  },
};

/** Empty slots, rendered as "Coming soon" cards. Replace with real projects later. */
export const upcomingProjects = [{ id: 'slot-02' }, { id: 'slot-03' }];
