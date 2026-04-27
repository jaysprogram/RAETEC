export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const services: Service[] = [
  {
    title: 'AI Chatbots',
    description:
      'Intelligent conversational agents that handle customer support, lead qualification, and internal workflows around the clock.',
    icon: '⬡',
  },
  {
    title: 'Workflow Automation',
    description:
      'End-to-end process automation that eliminates manual tasks, reduces errors, and accelerates your operations.',
    icon: '◈',
  },
  {
    title: 'Data Pipelines',
    description:
      'Robust data infrastructure that collects, transforms, and delivers insights from any source to any destination.',
    icon: '◇',
  },
  {
    title: 'Websites & Apps',
    description:
      'Custom-built digital products designed for performance, scalability, and exceptional user experience.',
    icon: '△',
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'We map your processes, identify automation opportunities, and define a clear project scope.',
  },
  {
    number: '02',
    title: 'Architecture',
    description:
      'Our team designs the technical blueprint — choosing the right stack, models, and integrations.',
  },
  {
    number: '03',
    title: 'Build & Iterate',
    description:
      'Agile development with weekly demos. You see progress and provide feedback in real time.',
  },
  {
    number: '04',
    title: 'Launch & Scale',
    description:
      'We deploy, monitor, and optimize. As your needs grow, the system scales with you.',
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      'RAETEC automated our entire intake pipeline. What took our team 12 hours a week now runs in the background.',
    name: 'Sarah Chen',
    role: 'COO, Meridian Health',
  },
  {
    quote:
      'Their AI chatbot reduced our response time from hours to seconds. Customer satisfaction is at an all-time high.',
    name: 'Marcus Rivera',
    role: 'VP of Support, Luma Finance',
  },
  {
    quote:
      'Professional, fast, and deeply technical. They understood our data challenges before we finished explaining them.',
    name: 'Anya Petrov',
    role: 'CTO, Novexa Labs',
  },
];

export const faqs: FaqItem[] = [
  {
    question: 'What industries do you work with?',
    answer:
      'We serve healthcare, finance, logistics, e-commerce, and SaaS companies. Our automation frameworks adapt to any domain.',
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'Most projects launch within 6–12 weeks. We scope carefully so there are no surprises.',
  },
  {
    question: 'Do you work with existing systems?',
    answer:
      'Absolutely. We integrate with your current CRM, ERP, databases, and third-party APIs.',
  },
  {
    question: 'What does pricing look like?',
    answer:
      'We offer fixed-scope engagements and ongoing retainers. Every project starts with a free consultation.',
  },
];
