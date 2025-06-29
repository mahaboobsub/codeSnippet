Code Snippet Manager (Microservices)

![alt text](https://img.shields.io/badge/License-MIT-yellow.svg)


![alt text](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)

A full-stack web application for managing and commenting on code snippets. This project is a practical demonstration of a Microservices Architecture, where the application is decomposed into small, independent services that communicate over the network.

🏛️ Architecture

This project is composed of three distinct, independently running services:

Service	Description	Port
client	A React (Vite) frontend that provides the user interface.	5173
snippet	A Node.js/Express microservice responsible for creating and retrieving snippets.	8000
comments	A Node.js/Express microservice for managing comments on snippets.	8001
Communication Flow

The services communicate via HTTP requests. The client does not have direct access to any database; it interacts solely with the REST APIs provided by the backend microservices.

![image](https://github.com/user-attachments/assets/7bb6e160-15bb-4454-b273-36be3bdaab5a)


✨ Key Features

Decoupled Services: Snippet and comment functionalities are handled by separate, independent services.

Single Responsibility: Each microservice has a clearly defined and narrow responsibility.

Technology Freedom: (In a larger project) Each service could be written in a different programming language.

In-Memory Database: Both backend services use a simple in-memory object, making the project easy to run without a database setup.

🚀 Running Locally

Follow these instructions to get the project up and running. You must open three separate terminal windows, one for each service.

Prerequisites

Node.js (v16 or higher)

npm (included with Node.js)

1. Clone the Repository
Generated bash
git clone https://github.com/mahaboobsub/codeSnippet.git
cd codeSnippet
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
2. Setup and Run Each Service

➡️ Terminal 1: Snippet Service

Generated bash
# Navigate to the snippet service directory
cd snippet

# Install dependencies
npm install

# Start the server (runs on http://localhost:8000)
npm start
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

➡️ Terminal 2: Comments Service

Generated bash
# Navigate to the comments service directory
cd comments

# Install dependencies
npm install

# Start the server (runs on http://localhost:8001)
npm start
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

➡️ Terminal 3: React Client

Generated bash
# Navigate to the client directory
cd client

# Install dependencies
npm install

# Start the development server (opens automatically at http://localhost:5173)
npm run dev
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

Once all three services are running, you can access the application in your browser.

🔌 API Endpoints
Snippet Service (:8000)
Method	Endpoint	Description
GET	/api/v1/snippet	Retrieves all code snippets.
POST	/api/v1/snippet	Creates a new code snippet. Body: { "title", "code" }
Comments Service (:8001)
Method	Endpoint	Description
GET	/api/v1/snippet/:id/comment	Retrieves all comments for a specific snippet.
POST	/api/v1/snippet/:id/comment	Creates a new comment for a snippet. Body: { "text" }
🗺️ Future Improvements

Integrate a persistent database (e.g., MongoDB, PostgreSQL) for each service.

Add an event bus (like RabbitMQ or Kafka) for asynchronous communication between services.

Implement user authentication and authorization.

Containerize services using Docker and orchestrate with Docker Compose.

Implement full CRUD (Update/Delete) for snippets and comments.

📜 License

This project is licensed under the MIT License. See the LICENSE file for details.
