const kafkaFaultToleranceReplication = {
  id: 'kafka-fault-tolerance-replication',
  title: 'Kafka Fault Tolerance and Replication',
  description: 'Simple explanation of replication factor, leader/follower, ISR, and failover in Kafka',
  content: `
# Kafka Fault Tolerance and Replication

This explains how Kafka protects data and handles failures.

In simple words:
- Kafka keeps data safe even if a server crashes

## Replication and Failover Diagram
\`\`\`
Partition: P1 (Replication Factor = 3)

Broker 1 -> Leader
Broker 2 -> Follower
Broker 3 -> Follower

Write Flow:
Producer -> Leader -> Followers (replicate)

If Leader fails:
New leader selected from ISR
\`\`\`

## Replication Factor
Replication means keeping multiple copies of partition data.

Replication is applied per partition.

### Example
Partition P1, replication factor = 3:
- Broker 1 -> Leader copy
- Broker 2 -> Replica copy
- Broker 3 -> Replica copy

Benefits:
- Data exists in multiple brokers
- Failure of one broker does not cause data loss (depending on ack settings)

Simple idea:
- More replicas = more safety (with storage and network cost)

## Leader and Follower

Each partition has one leader and multiple followers.

### Leader
- Handles all writes from producers
- Serves reads to consumers (default behavior)

### Followers
- Continuously replicate data from leader
- Stay ready to take over

Example:
- Leader -> Broker 1
- Followers -> Broker 2, Broker 3

## ISR (In-Sync Replicas)

ISR is the set of replicas that are fully caught up with the leader.

### Example
Replication factor = 3:

- Broker 1 -> Leader
- Broker 2 -> In sync
- Broker 3 -> Lagging

ISR = {Broker 1, Broker 2}

Why ISR matters:
- Only ISR replicas are eligible for leader election
- Prevents data loss from stale replicas

## Acknowledgment and Durability (Important)

Replication alone does not guarantee safety.

Producer ack settings matter:

- acks=1 -> Only leader confirms (risk if leader fails before replication)
- acks=all -> Waits for all ISR replicas (safer)

## min.insync.replicas (Important)

\`\`\`
min.insync.replicas=2
\`\`\`

Meaning:
- Minimum number of replicas that must acknowledge a write
- Works with acks=all
- Helps ensure stronger durability

## Failover Handling (Automatic Recovery)

What happens when leader fails:

1. Leader broker crashes
2. Kafka controller selects new leader from ISR
3. Clients continue using new leader

### Example

Before:
- Leader -> Broker 1
- ISR -> {Broker 1, Broker 2}

After failure:
- New leader -> Broker 2

Result:
- Minimal downtime
- Continued processing

## Unclean Leader Election (Advanced)

If no ISR is available:

- Kafka may select an out-of-sync replica
- This can cause data loss

Config:
\`\`\`
unclean.leader.election.enable=false
\`\`\`

## Full Flow (Simple)

Producer -> Leader -> Followers replicate -> ISR tracking -> Failover if needed

## Easy Analogy

Think of a team:

- Leader = Manager
- Followers = Backup team members
- ISR = Fully trained team members
- Failover = New manager takes over

## Key Points to Remember

- Replication is per partition
- Leader handles all writes
- Followers replicate data
- ISR contains up-to-date replicas
- acks and ISR together define durability
- Failover is automatic

## Final Simple Line

Kafka ensures data safety by replicating partitions across brokers and promoting in-sync replicas as leaders during failures.
`
};

export default kafkaFaultToleranceReplication;