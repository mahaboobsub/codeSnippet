Code Snippet Manager (Microservices)

![alt text](https://img.shields.io/badge/License-MIT-yellow.svg)


![alt text](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)

A full-stack web application for managing and commenting on code snippets. This project is a practical demonstration of a Microservices Architecture, where the application is decomposed into small, independent, and containerized services.

🏛️ Architecture

This project is composed of multiple, independently running services that communicate over a network. The system is designed around a Command Query Responsibility Segregation (CQRS) and event-driven pattern.

Service	Description	Port	Docker Image
client	React (Vite) frontend for the user interface.	5173	skmahaboobsubhani62/client
snippet	Node.js service for creating snippets (Commands).	8000	skmahaboobsubhani62/snippet
comments	Node.js service for creating comments (Commands).	8001	skmahaboobsubhani62/comments
query	Node.js service that aggregates data for efficient reads (Queries).	8002	skmahaboobsubhani62/query
message_broker	A simple event bus that distributes events to all services.	8005	skmahaboobsubhani62/broker
Communication Flow

The client writes to the command services (snippet, comments). These services then publish events to the message_broker. The broker fans out these events to all other services, allowing the query service to build up a materialized view of the data. The client reads all display data from this highly-efficient query service.

🚀 Getting Started

You can run this project in two ways: locally using Node.js or using Docker.

Method 1: Running Locally with Node.js

This method is ideal for development and debugging. You will need to open five separate terminal windows.

Prerequisites:

Node.js (v16 or higher)

npm (included with Node.js)

1. Clone the Repository

Generated bash
git clone https://github.com/mahaboobsub/codeSnippet.git
cd codeSnippet


2. Install Dependencies for Each Service
Run npm install inside each of the following directories: client, snippet, comments.

3. Run All Services
Start each service in its own terminal:

Snippet Service: cd snippet && npm start (runs on port 8000)

Comments Service: cd comments && npm start (runs on port 8001)

Query Service: cd query && node index.js (runs on port 8002)

Message Broker: cd message_broker && node index.js (runs on port 8005)

Client: cd client && npm run dev (opens on port 5173)

Method 2: Running with Docker (Recommended for Production/Staging)

This method uses the pre-built container images from Docker Hub to run the entire application stack.

Prerequisites:

Docker installed and running.

1. Login to Docker

Generated bash
docker login
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

(Coming Soon) 2. Use Docker Compose
A docker-compose.yml file will be added to the project root to orchestrate all services. Once it's available, you can start the entire application with a single command:

Generated bash
docker-compose up
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
🐳 Building and Pushing Docker Images

If you make changes to a service, you'll need to rebuild and push its Docker image.

1. Navigate to the service directory:

Generated bash
cd <service_name>  # e.g., cd comments
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

2. Build the Docker image:
Replace <username> with your Docker ID and <service_name> with the name of the service.

Generated bash
docker build -t <username>/<service_name> .
# Example:
docker build -t skmahaboobsubhani62/comments .
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

3. Push the image to Docker Hub:

Generated bash
docker push <username>/<service_name>
# Example:
docker push skmahaboobsubhani62/comments
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
🔌 API Endpoints
Snippet Service (:8000)
Method	Endpoint	Description
POST	/api/v1/snippet	Creates a new code snippet. Body: { "title", "code" }
Comments Service (:8001)
Method	Endpoint	Description
POST	/api/v1/snippet/:id/comment	Creates a new comment for a snippet. Body: { "text" }
Query Service (:8002)
Method	Endpoint	Description
GET	/snippets	(Primary Read Endpoint) Retrieves all snippets with their associated comments.
🗺️ Future Improvements

Add a docker-compose.yml file for easy one-command startup.

Integrate a persistent database (e.g., MongoDB, PostgreSQL) for each service.

Replace the simple message broker with a robust solution like RabbitMQ or Kafka.

Implement user authentication and authorization (e.g., JWT).

Implement full CRUD (Update/Delete) for snippets and comments, following the event-driven pattern.

📜 License

This project is licensed under the MIT License. See the LICENSE file for details.


