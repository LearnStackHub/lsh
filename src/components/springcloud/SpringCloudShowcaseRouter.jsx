import SpringCloudTopicRuntimeShowcase from './SpringCloudTopicRuntimeShowcase';

export const SPRING_CLOUD_SHOWCASE_TOPIC_IDS = new Set([
  'spring-cloud-microservices-project',
  'microservices-architecture-fundamentals',
  'spring-cloud-config-server',
  'spring-cloud-eureka',
  'spring-cloud-api-gateway',
  'spring-cloud-load-balancing',
  'spring-cloud-openfeign',
  'spring-cloud-resilience4j',
  'spring-cloud-distributed-tracing',
  'spring-cloud-security',
  'spring-cloud-elk',
  'spring-cloud-microservices',
  'microservices-mcq'
]);

export default function SpringCloudShowcaseRouter({ topicId }) {
  if (!SPRING_CLOUD_SHOWCASE_TOPIC_IDS.has(topicId)) return null;

  return <SpringCloudTopicRuntimeShowcase topicId={topicId} />;
}
