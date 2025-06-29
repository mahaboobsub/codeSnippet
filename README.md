

# Code Snippet Manager (Microservices)

![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)

A full-stack web application for managing and commenting on code snippets. It demonstrates a **Microservices Architecture** where the application is broken down into small, independently running, and containerized services.

---

## 🏛️ Architecture

The system is built using **CQRS (Command Query Responsibility Segregation)** and an **event-driven** pattern.

| Service          | Description                                      | Port | Docker Image                   |
| ---------------- | ------------------------------------------------ | ---- | ------------------------------ |
| `client`         | React (Vite) frontend UI                         | 5173 | `skmahaboobsubhani62/client`   |
| `snippet`        | Node.js service for creating snippets (Commands) | 8000 | `skmahaboobsubhani62/snippet`  |
| `comments`       | Node.js service for creating comments (Commands) | 8001 | `skmahaboobsubhani62/comments` |
| `query`          | Node.js service that aggregates data (Queries)   | 8002 | `skmahaboobsubhani62/query`    |
| `message_broker` | Simple event bus that distributes events         | 8005 | `skmahaboobsubhani62/broker`   |

### 🔄 Communication Flow

1. The client writes data to the **command services** (`snippet`, `comments`).
2. These services publish **events** to the `message_broker`.
3. The broker distributes events to all subscribers.
4. The `query` service listens to these and builds a **materialized view** for reads.
5. The client fetches data from the `query` service.

![Architecture Diagram 1](https://github.com/user-attachments/assets/7bb6e160-15bb-4454-b273-36be3bdaab5a)
![Architecture Diagram 2](https://github.com/user-attachments/assets/54312a91-7ea8-4abb-b8ee-48e19298a8ac)

---

## 🚀 Getting Started

You can run this project in two ways: **locally using Node.js** or **using Docker**.

---

### 🧪 Method 1: Run Locally (Node.js)

> Ideal for development and debugging. Requires opening 5 terminal windows.

#### Prerequisites

* Node.js (v16+)
* npm

#### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/mahaboobsub/codeSnippet.git
   cd codeSnippet
   ```

2. **Install Dependencies**

   ```bash
   cd client && npm install
   cd ../snippet && npm install
   cd ../comments && npm install
   ```

3. **Start Services in Separate Terminals**

   ```bash
   # Terminal 1
   cd snippet && npm start

   # Terminal 2
   cd comments && npm start

   # Terminal 3
   cd query && node index.js

   # Terminal 4
   cd message_broker && node index.js

   # Terminal 5
   cd client && npm run dev
   ```

---

### 🐳 Method 2: Run with Docker (Recommended)

> Uses Docker images for all services.

#### Prerequisites

* Docker installed and running

#### Steps

1. **Login to Docker**

   ```bash
   docker login
   ```

2. **(Coming Soon)**: Run with Docker Compose
   When `docker-compose.yml` is added, use:

   ```bash
   docker-compose up
   ```

---

## 🐙 Building and Pushing Docker Images

If you make changes to a service:

1. **Navigate to the service**

   ```bash
   cd <service_name>  # e.g., cd comments
   ```

2. **Build the image**

   ```bash
   docker build -t <username>/<service_name> .
   # Example:
   docker build -t skmahaboobsubhani62/comments .
   ```

3. **Push to Docker Hub**

   ```bash
   docker push <username>/<service_name>
   # Example:
   docker push skmahaboobsubhani62/comments
   ```

---

## 🔌 API Endpoints

### Snippet Service (`:8000`)

| Method | Endpoint          | Description                            |
| ------ | ----------------- | -------------------------------------- |
| POST   | `/api/v1/snippet` | Create a new snippet (`title`, `code`) |

### Comments Service (`:8001`)

| Method | Endpoint                      | Description                       |
| ------ | ----------------------------- | --------------------------------- |
| POST   | `/api/v1/snippet/:id/comment` | Add comment to a snippet (`text`) |

### Query Service (`:8002`)

| Method | Endpoint    | Description                               |
| ------ | ----------- | ----------------------------------------- |
| GET    | `/snippets` | Retrieve all snippets with their comments |

---

## 🗺️ Future Improvements

* Add `docker-compose.yml` for easier orchestration.
* Use persistent storage (e.g., MongoDB or PostgreSQL).
* Replace the simple message broker with RabbitMQ or Kafka.
* Add authentication & authorization (JWT).
* Implement full CRUD with event sourcing.

---

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---
