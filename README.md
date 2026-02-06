# Eventful API 🎟️

A complete event management and ticketing platform built with **Node.js + TypeScript**. Eventful allows event creators to publish their events and participants to register and purchase tickets easily and securely.

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
- Ticket quantity control

### 🎫 Registration System
- Participant registration for events
- Automatic control of available tickets
- Prevention of duplicate registrations
- Ticket validation before confirming registration

### 👥 Participant Management
- Creators can view the list of participants for their events
- Track registrations per event

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
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
MONGODB_URI=mongodb://localhost:27017/eventful
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
| POST   | `/api/auth/register` | User registration          |
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
| POST   | `/api/events/:id/register`     | PARTICIPANT | Register for event           |
| GET    | `/api/events/:id/participants` | CREATOR     | CREATOR	List participants  |


## 🧱 Architecture

The project follows a well-organized modular architecture:

```
src/
├── app.ts                          # Express configuration
├── server.ts                       # Application entry
├── config/
│   └── db.ts                       # MongoDB connection
├── modules/                        # Feature modules
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   └── auth.routes.ts
│   ├── users/
│   │   ├── user.model.ts
│   │   ├── user.types.ts
│   │   └── dtos/
│   │       ├── create-user.dto.ts
│   │       └── login-user.dto.ts
│   ├── events/
│   │   ├── event.controller.ts
│   │   ├── event.model.ts
│   │   ├── event.service.ts
│   │   ├── event.routes.ts
│   │   └── dtos/
│   │       └── create-event.dto.ts
│   └── registrations/
│       ├── registration.controller.ts
│       ├── registration.model.ts
│       ├── registration.service.ts
│       └── registration.routes.ts
├── middlewares/
│   ├── auth.middleware.ts          # Authentication check
│   ├── role.middleware.ts          # Role check
│   └── validateDTO.ts              # Data validation (Zod)
├── utils/
│   └── jwt.ts                      # JWT utilities
└── public/                         # Static files (HTML)
```

**Patterns used:**
- **MVC**: Controllers, Services, Models
- **DTO (Data Transfer Objects)**: Input validation with Zod
- **Middlewares**: Cross-cutting concerns
- **Modular**: Each feature is independent and reusable

---

## 📦 Tech Stack

| Technology     | Version | Description                 |
|----------------|---------|-----------------------------|
| **Node.js**    | 16+     | JavaScript runtime          |
| **TypeScript** | ^5.9.3  | Static typing               |
| **Express**    | ^5.2.1  | Web framework               |
| **MongoDB**    | -       | NoSQL database              |
| **Mongoose**   | ^9.1.5  | ODM for MongoDB             |
| **JWT**        | ^9.0.3  | Stateless authentication    |
| **bcryptjs**   | ^3.0.3  | Password hashing            |
| **Zod**        | ^4.3.6  | Schema validation           |

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
  updatedAt: Date
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
  event: Event
  participant: User
  registeredAt: Date
}
```

---

## 🔒 Authentication and Authorization

### Authentication Flow
1. User registers with email and password
2. Password is encrypted with bcrypt before saving
3. On login, a JWT token is generated with userId and role
4. Token is included in the header Authorization: Bearer <token>

### Protection Middlewares
- **authMiddleware**: Checks if the token is valid
- **authorize(role)**: Checks if the user has the required role

### Example: Create Event
Only users with CREATOR role can access this endpoint.

---

## 🧪 Testing

You can test the API using:
- **Postman**: Import available endpoints
- **cURL**: Execute requests via terminal
- **Thunder Client**: VS Code extension for testing

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