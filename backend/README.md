To configure your `server.properties` for Kafka to run in KRaft mode (without ZooKeeper), you'll need to make several changes to the file. Here’s a step-by-step guide on what to add or modify:

### Steps to Configure `server.properties` for KRaft Mode

1. **Remove ZooKeeper Configuration:**
   - Remove or comment out the ZooKeeper-related configurations, specifically:
     ```
     #zookeeper.connect=localhost:2181
     #zookeeper.connection.timeout.ms=18000
     ```

2. **Add KRaft-specific Configurations:**
   - Specify the roles for your Kafka node, the quorum voters, and other KRaft settings. Add these lines to your configuration:
     ```
     node.id=1
     process.roles=broker,controller
     controller.quorum.voters=1@localhost:9093
     listener.security.protocol.map=PLAINTEXT:PLAINTEXT,CONTROLLER:PLAINTEXT
     listeners=PLAINTEXT://:9092,CONTROLLER://localhost:9093
     inter.broker.listener.name=PLAINTEXT
     controller.listener.names=CONTROLLER
     ```

   - The `node.id` is a unique identifier for each node in the Kafka cluster.
   - `controller.quorum.voters` configures the KRaft quorum. The format is `node_id@host:port`. For a single-node setup, you just point it to itself.
   - Listeners are configured to separate internal and external traffic, with `CONTROLLER` being used for internal replication traffic.

3. **Log Directories:**
   - Ensure your log directories are properly configured to store Kafka data:
     ```
     log.dirs=/path/to/kafka-logs
     ```
   - You can specify a directory like `/tmp/kafka-logs` or another directory based on your preference and system setup.

4. **General Server Settings:**
   - Check and adjust the general settings such as `broker.id`, `num.network.threads`, `num.io.threads`, etc., to suit your system’s capabilities and your desired performance characteristics.

### Starting Kafka in KRaft Mode
After you've configured the `server.properties` file, you need to initialize your Kafka storage with a cluster ID and then start Kafka:
- **Initialize Storage:**
  ```
  .\bin\windows\kafka-storage.bat format --config .\config\server.properties --cluster-id KRaftCluster-01
  ```
  Replace `KRaftCluster-01` with your preferred unique cluster ID.

- **Start Kafka Server:**
  ```
  .\bin\windows\kafka-server-start.bat .\config\server.properties
  ```

This configuration sets up Kafka to run in a standalone mode with KRaft for managing cluster metadata, eliminating the need for ZooKeeper. This setup is simpler and can be scaled by adding more nodes and adjusting the quorum voters accordingly.

### Final Note
Ensure all paths and configurations are adjusted to your local setup. For instance, verify the paths for logs and other configurations to match your directory structure. This setup should allow you to run Kafka in KRaft mode on your Windows machine effectively.
