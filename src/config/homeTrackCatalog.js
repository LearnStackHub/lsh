import { NAV_COURSE_ORDER } from './navCourseOrder';

/** Lightweight track list for the home page — renders instantly without loading the full data bundle. */
export const HOME_TRACK_CATALOG = [
  {
    id: 'sdlc',
    title: 'SDLC',
    color: '#4A90E2',
    firstTopicId: 'sdlc-introduction',
    description: 'Software development lifecycle models, phases, and how teams ship quality software.',
  },
  {
    id: 'html',
    title: 'HTML',
    color: '#E34F26',
    firstTopicId: 'html-introduction',
    description: 'Semantic structure, forms, media, accessibility, and modern HTML5 patterns.',
  },
  {
    id: 'css',
    title: 'CSS',
    color: '#264DE4',
    firstTopicId: 'css-introduction',
    description: 'Selectors, layout with Flexbox and Grid, responsive design, and animations.',
  },
  {
    id: 'corejava',
    title: 'Core Java',
    color: '#f89820',
    firstTopicId: 'java-introduction',
    description: 'Variables through multithreading: OOP, collections, exceptions, and interview depth.',
  },
  {
    id: 'java8',
    title: 'Java 8',
    color: '#5382A1',
    firstTopicId: 'java8-introduction',
    description: 'Lambda, streams, Optional, Date Time API, and fresher job tasks with realtime examples.',
  },
  {
    id: 'mysql',
    title: 'MySQL',
    color: '#00758F',
    firstTopicId: 'mysql-introduction',
    description: 'Relational modeling, SQL, joins, indexes, transactions, and database design.',
  },
  {
    id: 'jdbc',
    title: 'JDBC',
    color: '#4479A1',
    firstTopicId: 'jdbc-introduction',
    description: 'Java database connectivity, prepared statements, and transaction control.',
  },
  {
    id: 'servlets',
    title: 'Servlets',
    color: '#E76F00',
    firstTopicId: 'servlet-introduction',
    description: 'Request lifecycle, sessions, filters, listeners, and servlet architecture.',
  },
  {
    id: 'jsp',
    title: 'JSP',
    color: '#5382A1',
    firstTopicId: 'jsp-introduction',
    description: 'Dynamic pages with JSP, EL, JSTL, and MVC-style web patterns.',
  },
  {
    id: 'hibernate',
    title: 'Hibernate',
    color: '#BCAE79',
    firstTopicId: 'hibernate-introduction',
    description: 'ORM mapping, relationships, HQL, caching, and persistence best practices.',
  },
  {
    id: 'git',
    title: 'Git',
    color: '#F05032',
    firstTopicId: 'git-introduction',
    description: 'Version control, branching, pull requests, and team workflows with GitHub.',
  },
  {
    id: 'maven',
    title: 'Maven',
    color: '#C71A36',
    firstTopicId: 'maven-introduction',
    description: 'Build lifecycle, dependencies, plugins, and multi-module Java projects.',
  },
  {
    id: 'spring',
    title: 'Spring',
    color: '#6DB33F',
    firstTopicId: 'spring-introduction',
    description: 'IoC, beans, AOP, JDBC templates, and the Spring Framework ecosystem.',
  },
  {
    id: 'springboot',
    title: 'Spring Boot',
    color: '#6DB33F',
    firstTopicId: 'spring-boot-introduction',
    description: 'Auto-configuration, starters, REST APIs, data access, and production-ready apps.',
  },
  {
    id: 'http',
    title: 'HTTP',
    color: '#0052CC',
    firstTopicId: 'http-introduction',
    description: 'Methods, status codes, headers, REST principles, and how the web really works.',
  },
  {
    id: 'springcloud',
    title: 'Spring Cloud',
    color: '#6DB33F',
    firstTopicId: 'spring-cloud-microservices-project',
    description: 'Microservices patterns, discovery, config, resilience, and distributed systems.',
  },
  {
    id: 'microservices',
    title: 'Microservices',
    color: '#0EA5E9',
    firstTopicId: 'microservices-introduction',
    description: 'Architecture, service boundaries, APIs, data ownership, resilience, and observability.',
  },
  {
    id: 'springai',
    title: 'Spring AI',
    color: '#16A34A',
    firstTopicId: 'spring-ai-introduction',
    description: 'Add AI to Spring Boot with ChatClient, prompts, RAG, tools, and production patterns.',
  },
  {
    id: 'kafka',
    title: 'Kafka',
    color: '#231F20',
    firstTopicId: 'kafka-introduction',
    description: 'Event streaming fundamentals, partitions, consumer groups, and delivery guarantees.',
  },
  {
    id: 'docker',
    title: 'Docker',
    color: '#2496ED',
    firstTopicId: 'docker-introduction',
    description: 'Containers, images, Dockerfile, Compose, networking, and production patterns.',
  },
];

export function getOrderedHomeTracks() {
  return [...HOME_TRACK_CATALOG].sort((a, b) => {
    const ai = NAV_COURSE_ORDER.indexOf(a.id);
    const bi = NAV_COURSE_ORDER.indexOf(b.id);
    if (ai === -1 && bi === -1) return a.id.localeCompare(b.id);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}

export const HOME_DEFAULT_STATS = {
  trackCount: HOME_TRACK_CATALOG.length,
  topicCount: 250,
};
