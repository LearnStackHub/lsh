export const isKafkaTopicId = (topicId) => typeof topicId === 'string' && topicId.startsWith('kafka-');

export const kafkaTopicIdToSlug = (topicId) => (
  isKafkaTopicId(topicId) ? topicId.replace(/^kafka-/, '') : topicId
);

export const kafkaSlugToTopicId = (topicSlug) => (
  typeof topicSlug === 'string' && topicSlug.trim() ? `kafka-${topicSlug}` : ''
);

export const getTopicPath = (topicId) => {
  if (!topicId) return '/';
  if (/(?:^|[-/])(mcq|exam)$/.test(topicId)) return `/${topicId}`;
  if (isKafkaTopicId(topicId)) return `/kafka/${kafkaTopicIdToSlug(topicId)}`;
  return `/tutorial/${topicId}`;
};
