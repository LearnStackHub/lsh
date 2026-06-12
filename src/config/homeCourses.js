import { NAV_COURSE_ORDER } from './navCourseOrder';

export const HOME_COURSE_LABELS = {
  sdlc: 'SDLC',
  html: 'HTML',
  css: 'CSS',
  corejava: 'Core Java',
  java8: 'Java 8',
  mysql: 'MySQL',
  jdbc: 'JDBC',
  servlets: 'Servlets',
  jsp: 'JSP',
  hibernate: 'Hibernate',
  git: 'Git & GitHub',
  maven: 'Maven',
  spring: 'Spring Framework',
  springboot: 'Spring Boot',
  http: 'HTTP',
  springcloud: 'Spring Cloud',
  microservices: 'Microservices',
  springai: 'Spring AI',
  kafka: 'Kafka',
  docker: 'Docker',
};

export function getOrderedHomeCourses() {
  return NAV_COURSE_ORDER.map((key) => ({
    key,
    title: HOME_COURSE_LABELS[key] || key,
  }));
}
