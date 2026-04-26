export const isKafkaTopicId = (topicId) => typeof topicId === 'string' && topicId.startsWith('kafka-');
export const isDockerTopicId = (topicId) => typeof topicId === 'string' && topicId.startsWith('docker-');

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
  if (isKafkaTopicId(topicId)) return `/kafka/${kafkaTopicIdToSlug(topicId)}`;
  if (isDockerTopicId(topicId)) return `/docker/${dockerTopicIdToSlug(topicId)}`;
  return `/tutorial/${topicId}`;
};
