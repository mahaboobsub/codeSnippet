Code Snippet Manager - A Microservices Project

![alt text](https://img.shields.io/badge/License-MIT-yellow.svg)


![alt text](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)

A simple, full-stack web application for managing and commenting on code snippets, built with a React frontend and Node.js microservices.

<!-- You can replace this with your own screenshot -->

✨ Key Features

Create & View Snippets: Add new code snippets with a title and view all existing snippets in a clean card layout.

Commenting System: Each snippet has a dedicated section for adding and viewing comments.

Microservice Architecture: Demonstrates separation of concerns with dedicated services for snippets and comments.

Real-time UI Updates: The interface automatically refreshes when new snippets or comments are added.

In-Memory Database: Both backend services use a simple in-memory object for data storage, making the project easy to run without a database setup.

![image](https://github.com/user-attachments/assets/fa3536ee-5cf0-4f0c-b784-2cb7457e611c)

🚀 Running Locally

Follow these instructions to get the project up and running. You will need to open three separate terminal windows.

Prerequisites

Node.js (v16 or higher)

npm (included with Node.js)

1. Clone the Repository
Generated bash
git clone https://github.com/mahaboobsub/codeSnippet.git
cd codeSnippet

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

# Start the development server (opens automatically)
npm run dev
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
Quick Reference
Service	Purpose	URL
Client	React Frontend UI	http://localhost:5173
Snippet API	Manages Snippets	http://localhost:8000
Comments API	Manages Comments	http://localhost:8001
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

Integrate a persistent database (e.g., MongoDB, PostgreSQL).

Add user authentication and authorization (e.g., JWT).

Implement full CRUD (Update/Delete) for snippets and comments.

Add client-side routing for dedicated snippet detail pages.

Enhance UI with loading states, error modals, and form validation.

📜 License

This project is licensed under the MIT License. See the LICENSE file for details.
