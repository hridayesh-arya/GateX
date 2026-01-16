# GateX – Outpass Management System

GateX is a full-stack Outpass Management System that digitizes the outpass request and approval process for educational institutions, replacing manual coordination with a structured, role-based workflow.

## Features

- Outpass request creation and tracking
- Role-based approval workflow for students and administrators
- REST API–driven backend
- Facial recognition as an additional verification layer

## Tech Stack

Backend:

- Flask
- REST APIs
- MongoDB

Frontend:

- React
- Vite
- HTML, CSS, JavaScript

## Setup

Clone the repository:
git clone https://github.com/hridayesh-arya/GateX.git
cd GateX

Run frontend:
cd Client
npm install
npm run dev

Frontend runs at:
http://localhost:5173

Run backend:
cd Server
pip install -r requirements.txt
python index.py

Backend runs at:
http://localhost:5000

## Roles

Student:

- Create outpass requests
- Track request status

Administrator:

- Approve or reject requests
- Verify identity using facial recognition

## Author

Hridayesh Arya
GitHub: https://github.com/hridayesh-arya
