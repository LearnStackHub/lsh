/** Top nav / home course card order (after Spring Boot: HTTP → Spring Cloud → Microservices → Spring AI). */
export const NAV_COURSE_ORDER = [
  'sdlc',
  'html',
  'css',
  'corejava',
  'java8',
  'mysql',
  'jdbc',
  'servlets',
  'jsp',
  'hibernate',
  'git',
  'maven',
  'spring',
  'springboot',
  'http',
  'springcloud',
  'microservices',
  'springai',
  'kafka',
  'docker',
];

export function sortCourseEntries(courseStructure) {
  if (!courseStructure) return [];
  return Object.entries(courseStructure).sort(([a], [b]) => {
    const ai = NAV_COURSE_ORDER.indexOf(a);
    const bi = NAV_COURSE_ORDER.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}
