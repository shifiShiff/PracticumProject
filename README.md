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
  - Managing challenges  

- **🧠 AI Service (Python)**  
  - Analyzes uploaded images and generates feedback  
  - Provides smart reasoning and commentary based on image content and context  


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
| Storage        | Cloud-based (AWS S3) |

> All services are deployed and live on Render cloud platform.


## 🚀 Getting Started

Each component runs independently. Clone each repo and follow its `README`:

```bash
## 🌍 Live Demo

You can try the live applications here:

- **🔵 User Website (React):** https://practicumproject-reactclient.onrender.com  
- **🟠 Admin Dashboard (Angular):** https://practicumproject.onrender.com
