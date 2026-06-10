export const isKafkaTopicId = (topicId) => typeof topicId === 'string' && topicId.startsWith('kafka-');
export const isDockerTopicId = (topicId) => typeof topicId === 'string' && topicId.startsWith('docker-');
export const isHibernateTopicId = (topicId) => typeof topicId === 'string' && topicId.startsWith('hibernate-');
export const isSpringTopicId = (topicId) => typeof topicId === 'string' && topicId.startsWith('spring-') && !topicId.startsWith('spring-boot-') && !topicId.startsWith('spring-cloud-') && !topicId.startsWith('spring-ai-');
export const isSpringBootTopicId = (topicId) => typeof topicId === 'string' && topicId.startsWith('spring-boot-');
export const isMySQLTopicId = (topicId) => typeof topicId === 'string' && topicId.startsWith('mysql-');
export const isJava8TopicId = (topicId) => typeof topicId === 'string' && topicId.startsWith('java8-');
export const isMicroservicesTopicId = (topicId) => typeof topicId === 'string' && topicId.startsWith('microservices-');
export const isSpringAiTopicId = (topicId) => typeof topicId === 'string' && topicId.startsWith('spring-ai-');

const CORE_JAVA_TOPIC_IDS = new Set([
  'java-introduction', 'java-features', 'java-environment-setup', 'java-syntax', 'java-variables',
  'java-data-types', 'java-keywords', 'java-operators', 'java-methods',
  'if-else', 'for-loop', 'while-loop', 'do-while-loop', 'switch-statement', 'break-continue',
  'array-introduction', 'single-dimensional-array', 'multi-dimensional-array', 'array-methods',
  'oops-introduction', 'classes-objects', 'constructors', 'encapsulation', 'inheritance',
  'polymorphism', 'abstraction', 'interfaces',
  'string-introduction', 'string-methods', 'string-builder', 'string-buffer',
  'exception-introduction', 'try-catch-finally', 'throw-throws', 'custom-exceptions', 'global-exception-handling',
  'thread-introduction', 'thread-creation', 'thread-methods', 'thread-lifecycle',
  'collection-introduction', 'list-interface', 'set-interface', 'queue-interface', 'map-interface',
  'serialization', 'synchronization'
]);

export const isCoreJavaTopicId = (topicId) => CORE_JAVA_TOPIC_IDS.has(topicId);

export const kafkaTopicIdToSlug = (topicId) => (
  isKafkaTopicId(topicId) ? topicId.replace(/^kafka-/, '') : topicId
);

export const kafkaSlugToTopicId = (topicSlug) => (
  typeof topicSlug === 'string' && topicSlug.trim() ? `kafka-${topicSlug}` : ''
);

export const dockerTopicIdToSlug = (topicId) => (
  isDockerTopicId(topicId) ? topicId.replace(/^docker-/, '') : topicId
);

export const dockerSlugToTopicId = (topicSlug) => (
  typeof topicSlug === 'string' && topicSlug.trim() ? `docker-${topicSlug}` : ''
);

export const java8TopicIdToSlug = (topicId) => (
  isJava8TopicId(topicId) ? topicId.replace(/^java8-/, '') : topicId
);

export const java8SlugToTopicId = (topicSlug) => (
  typeof topicSlug === 'string' && topicSlug.trim() ? `java8-${topicSlug}` : ''
);

export const microservicesTopicIdToSlug = (topicId) => (
  isMicroservicesTopicId(topicId) ? topicId.replace(/^microservices-/, '') : topicId
);

export const microservicesSlugToTopicId = (topicSlug) => (
  typeof topicSlug === 'string' && topicSlug.trim() ? `microservices-${topicSlug}` : ''
);

export const springAiTopicIdToSlug = (topicId) => (
  isSpringAiTopicId(topicId) ? topicId.replace(/^spring-ai-/, '') : topicId
);

export const springAiSlugToTopicId = (topicSlug) => (
  typeof topicSlug === 'string' && topicSlug.trim() ? `spring-ai-${topicSlug}` : ''
);

export const getTopicPath = (topicId) => {
  if (!topicId) return '/';
  if (/(?:^|[-/])(mcq|exam)$/.test(topicId)) return `/${topicId}`;
  if (isCoreJavaTopicId(topicId)) return `/corejava/${topicId}`;
  if (isMySQLTopicId(topicId)) return `/mysql/${topicId}`;
  if (isSpringAiTopicId(topicId)) return `/springai/${springAiTopicIdToSlug(topicId)}`;
  if (isSpringBootTopicId(topicId)) return `/springboot/${topicId}`;
  if (isSpringTopicId(topicId)) return `/spring/${topicId}`;
  if (isHibernateTopicId(topicId)) return `/hibernate/${topicId}`;
  if (isJava8TopicId(topicId)) return `/java8/${java8TopicIdToSlug(topicId)}`;
  if (isMicroservicesTopicId(topicId)) return `/microservices/${microservicesTopicIdToSlug(topicId)}`;
  if (isKafkaTopicId(topicId)) return `/kafka/${kafkaTopicIdToSlug(topicId)}`;
  if (isDockerTopicId(topicId)) return `/docker/${dockerTopicIdToSlug(topicId)}`;
  return `/tutorial/${topicId}`;
};
