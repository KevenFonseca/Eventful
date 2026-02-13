# Eventful API 🎟️

A complete event management and ticketing platform built with **Node.js + TypeScript** and **Frontend Web Interface**. Eventful allows event creators to publish their events and participants to register.

> **Author:** Keven Fonseca

---

## ✨ Features

### 🔐 Authentication and Authorization
- User registration and login with encrypted password
- JWT (JSON Web Tokens) based authentication
- Two user types: CREATOR (event creator) and PARTICIPANT (participant)
- Endpoint protection with authentication and authorization middlewares

### 📅 Event Management
- Create events (creators only)
- List all available public events
- View full event details
- List events created by an authenticated creator

### 🎫 Registration System
- Participant registration for events
- Automatic control of available tickets
- Prevention of duplicate registrations

### 👥 Participant Management
- Creators can view the list of participants for their events

### 🖥️ Frontend Features
- Fully responsive web interface for event creators and participants
- Event creation and management dashboards for creators
- Registration forms with real-time ticket availability checks
- Login/logout and role-based navigation

---

### 🖼 Screenshots

#### Eventful Home Page
![Home Page](./public/screenshots/home_page.PNG)
Main landing page showing upcoming events.

#### List of Available Events on the Home Page
![List of events](./public/screenshots/list_of_available_events.PNG)
Browse all available public events with basic info and dates.

#### Login and Signup Page
![Login&Signup page](./public/screenshots/login&signup_page.PNG)
Authenticate as a participant or creator to access personalized features.

#### Creator Dashboard
![Creator Dashboard](./public/screenshots/creator_dashboard.PNG)
View and manage your events, check registrations.

#### Event Detail Page
![Event detail page](./public/screenshots/event_details.PNG)
Detailed information about the selected event, with registration option.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm
- MongoDB (Mongoose for ORM)

### Installation

1. Clone the repository
```bash
git clone <https://github.com/KevenFonseca/Eventful.git>
cd Eventful
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
# Create a .env file based on .env.example
PORT=3000
MONGODB_URI=mongodb+srv://user:password@cluster0.abcd.mongodb.net/eventful?retryWrites=true&w=majority
SECRET_KEY=your_secret_key_here
```

4. Run the project in development mode
```bash
npm run dev
```

Or build and run in production:
```bash
npm run build
npm start
```

---

## 📚 API Endpoints

### Auth

| Method | Endpoint             | Description                |
| ------ | -------------------- | -------------------------- |
| POST   | `/api/auth/signup` | User registration          |
| POST   | `/api/auth/login`    | Login and token generation |

### Events

| Method | Endpoint                | Access  | Description              |
| ------ | ----------------------- | ------- | ------------------------ |
| POST   | `/api/events`           | CREATOR | Create event             |
| GET    | `/api/events`           | Public  | List available events    |
| GET    | `/api/events/:id`       | Public  | Event details            |
| GET    | `/api/events/my-events` | CREATOR | Creator's events         |

### Inscrições

| Method | Endpoint                       | Access      | Desciption                   |
| ------ | ------------------------------ | ----------- | ---------------------------- |
| POST   | `/api/registrations/:id/register`     | PARTICIPANT | Register for event           |
| GET    | `/api/registrations/:id/participants` | CREATOR     | CREATOR	List participants  |


## 🧱 Architecture

The project follows a well-organized modular architecture:

```
eventful/
├── src/
│  ├── app.ts                          # Express configuration
│  ├── server.ts                       # Application entry
│  ├── config/
│  │   └── db.ts                       # MongoDB connection
│  ├── modules/                        # Feature modules
│  │   ├── auth/
│  │   │   ├── auth.controller.ts
│  │   │   └── auth.routes.ts
│  │   ├── users/
│  │   │   ├── user.model.ts
│  │   │   ├── user.types.ts
│  │   │   └── dtos/
│  │   │       ├── create-user.dto.ts
│  │   │       └── login-user.dto.ts
│  │   ├── events/
│  │   │   ├── event.controller.ts
│  │   │   ├── event.model.ts
│  │   │   ├── event.service.ts
│  │   │   ├── event.routes.ts
│  │   │   └── dtos/
│  │   │       └── create-event.dto.ts
│  │   └── registrations/
│  │       ├── registration.controller.ts
│  │       ├── registration.model.ts
│  │       ├── registration.service.ts
│  │       └── registration.routes.ts
│  ├── middlewares/
│  │   ├── auth.middleware.ts          # Authentication check
│  │   ├── role.middleware.ts          # Role check
│  │   └── validateDTO.ts              # Data validation (Zod)
│  └── utils/
│      └── jwt.ts                      # JWT utilities
└── public/                            # Static files
    ├── css/         
    ├── js/          
    ├── auth.html
    ├── create-event.html
    ├── event.html
    ├── my-event.html
    └── index.html                           
```

**Patterns used:**
- **MVC**: Controllers, Services, Models
- **DTO (Data Transfer Objects)**: Input validation with Zod
- **Middlewares**: Authentication, Authorization, Validation
- **Modular**: Independent reusable modules

---

## 📦 Tech Stack

| Technology     | Version | Description                   |
|----------------|---------|-------------------------------|
| **Node.js**    | 16+     | JavaScript runtime            |
| **TypeScript** | ^5.9.3  | Static typing                 |
| **Express**    | ^5.2.1  | Web framework                 |
| **MongoDB**    | -       | NoSQL database                |
| **Mongoose**   | ^9.1.5  | ODM for MongoDB               |
| **JWT**        | ^9.0.3  | Stateless authentication      |
| **bcryptjs**   | ^3.0.3  | Password hashing              |
| **Zod**        | ^4.3.6  | Schema validation             |
| **dotenv**     | ^17.2.3 | Environment variables         |
| **cors**       | ^2.8.6  | Cross-Origin Resource Sharing |
| **HTML/CSS/JS**|    -    | Frontend stati interface      |

---

## 🗄️ Data Models

### User
```typescript
{
  _id: ObjectId
  name: string
  email: string (unique)
  password: string (hashed with bcrypt)
  role: 'CREATOR' | 'PARTICIPANT'
  createdAt: Date
}
```

### Event
```typescript
{
  _id: ObjectId
  title: string
  description: string
  category: string
  date: Date
  location: string
  price: number
  totalTickets: number
  availableTickets: number
  creator: ObjectId
  createdAt: Date
  updatedAt: Date
}
```

### Registration
```typescript
{
  _id: ObjectId
  participant: User
  event: Event
  registeredAt: Date
}
```

---

## 🔒 Authentication and Authorization

### Authentication Flow
1. User registers with email and password
2. Password is encrypted with bcrypt before saving
3. On login, a JWT token is generated with userId, userName and role
4. Token is included in the header Authorization: Bearer <token>
5. Role-based access for endpoints (CREATOR / PARTICIPANT)
6. Frontend integrates with API for login, registration, and protected routes

### Protection Middlewares
- **authMiddleware**: Checks if the token is valid
- **authorize(role)**: Checks if the user has the required role

### Example: Create Event
Only users with CREATOR role can access this endpoint.

---

## 🧪 Testing

You can test the API using:
- **Postman**: Import available endpoints
- **Insomnia**: Import available endpoints

---

### 🚨 Error Handling

The API returns structured responses with appropriate HTTP status codes:

**Common status codes:**
- `200`: Success
- `201`: Created successfully
- `400`: Bad request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not found
- `409`: Conflict (e.g., duplicate email)
- `500`: Internal server error

---

## 👨‍💻 Author

Project developed by **Keven Fonseca**.