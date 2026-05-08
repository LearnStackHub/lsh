export const isKafkaTopicId = (topicId) => typeof topicId === 'string' && topicId.startsWith('kafka-');
export const isDockerTopicId = (topicId) => typeof topicId === 'string' && topicId.startsWith('docker-');
export const isHibernateTopicId = (topicId) => typeof topicId === 'string' && topicId.startsWith('hibernate-');
export const isSpringTopicId = (topicId) => typeof topicId === 'string' && topicId.startsWith('spring-') && !topicId.startsWith('spring-boot-') && !topicId.startsWith('spring-cloud-');
export const isSpringBootTopicId = (topicId) => typeof topicId === 'string' && topicId.startsWith('spring-boot-');
export const isMySQLTopicId = (topicId) => typeof topicId === 'string' && topicId.startsWith('mysql-');

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

export const getTopicPath = (topicId) => {
  if (!topicId) return '/';
  if (/(?:^|[-/])(mcq|exam)$/.test(topicId)) return `/${topicId}`;
  if (isCoreJavaTopicId(topicId)) return `/corejava/${topicId}`;
  if (isMySQLTopicId(topicId)) return `/mysql/${topicId}`;
  if (isSpringBootTopicId(topicId)) return `/springboot/${topicId}`;
  if (isSpringTopicId(topicId)) return `/spring/${topicId}`;
  if (isHibernateTopicId(topicId)) return `/hibernate/${topicId}`;
  if (isKafkaTopicId(topicId)) return `/kafka/${kafkaTopicIdToSlug(topicId)}`;
  if (isDockerTopicId(topicId)) return `/docker/${dockerTopicIdToSlug(topicId)}`;
  return `/tutorial/${topicId}`;
};
