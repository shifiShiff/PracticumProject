# Weekly Challenge Platform

An engaging web application for hosting weekly image-based challenges.  
Users can upload entries, vote for favorites, and follow weekly winners.  
Admins manage challenges, select winners, and interact with participants.

## 🌐 Project Overview

This platform consists of multiple coordinated apps:

- **🧑‍💻 User Frontend (React)**  
  - User registration & login  
  - Uploading challenge entries (images)  
  - Voting for submissions  
  - Viewing challenge history and winners  

- **🛠️ Admin Dashboard (Angular)**  
  - Challenge creation & publishing  
  - Reviewing entries and winner selection  
  - Sending email notifications to winners  
  - Managing users and challenges  

- **🧠 AI Service (Python)**  
  - Generates image descriptions and challenge-related texts  
  - Receives image + prompt and returns smart captions  

- **🧾 Backend API (.NET)**  
  - RESTful API for both clients  
  - Handles authentication (JWT), business logic, and database communication  
  - Stores user, challenge, and vote data  

- **🗃️ Database: MySQL**  
  - Stores all users, challenges, votes, and image metadata  

- **☁️ Cloud Storage**  
  - Images are uploaded and stored securely in the cloud

## 🔐 Authentication

- JSON Web Tokens (JWT) are used for secure, stateless authentication across all services.

## 📦 Tech Stack

| Layer           | Technology        |
|----------------|-------------------|
| Frontend (User)| React             |
| Frontend (Admin)| Angular           |
| Backend        | .NET 8 (Web API)  |
| AI Service     | Python + FastAPI  |
| Database       | MySQL             |
| Auth           | JWT               |
| Storage        | Cloud-based (e.g., Firebase, AWS S3) |

## 🚀 Getting Started

Each component runs independently. Clone each repo and follow its `README`:

```bash
# Example
git clone https://github.com/your-username/challenge-backend.git
cd challenge-backend
dotnet run
