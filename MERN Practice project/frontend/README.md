# Social Signup - MERN Practice Project

A complete signup system built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- ✅ User registration with validation
- ✅ Password hashing with bcrypt
- ✅ JWT authentication
- ✅ Form validation (client-side and server-side)
- ✅ Error handling and user feedback
- ✅ Responsive design
- ✅ MongoDB integration

## Prerequisites

- Node.js installed on your machine
- MongoDB installed and running locally
- Git (optional)

## Setup Instructions

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/social-signup
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

   The server should be running on `http://localhost:5000`

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend/social-signup
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend should be running on `http://localhost:5173` (or similar Vite port)

### 3. Database Setup

Make sure MongoDB is running on your machine. The application will automatically create a database named `social-signup` when the first user registers.

## Testing the Signup Process

1. Open your browser and navigate to the frontend URL (usually `http://localhost:5173`)
2. Fill out the signup form with:
   - Username (minimum 3 characters)
   - Valid email address
   - Password (minimum 6 characters)
   - Confirm password
3. Click "Sign Up"
4. You should see a success message if the registration is successful

## API Endpoints

### POST /api/signup
Registers a new user.

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response (201 Created):**
```json
{
  "message": "User created successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "username": "username",
    "email": "email"
  }
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Validation Rules

- **Username**: Required, 3-30 characters, unique
- **Email**: Required, valid email format, unique
- **Password**: Required, minimum 6 characters
- **Confirm Password**: Must match password

## Error Handling

The application includes comprehensive error handling for:
- Missing required fields
- Invalid email format
- Password mismatch
- Duplicate usernames/emails
- Server errors
- Network issues

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- bcryptjs for password hashing
- JWT for authentication
- CORS for cross-origin requests

### Frontend
- React 19
- Vite for build tooling
- Axios for HTTP requests
- CSS3 for styling

## Project Structure

```
MERN Practice project/
├── backend/
│   ├── node_modules/
│   ├── .env
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   └── social-signup/
│       ├── src/
│       │   ├── components/
│       │   │   ├── Signup.jsx
│       │   │   └── Signup.css
│       │   ├── App.jsx
│       │   ├── App.css
│       │   └── main.jsx
│       ├── public/
│       ├── package.json
│       └── package-lock.json
└── README.md
```

## Next Steps

You can extend this project by adding:
- Login functionality
- Password reset
- Email verification
- User profile management
- Social media integration
- Dashboard/UI improvements

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**: Make sure MongoDB is running on your machine
2. **CORS Error**: Ensure the backend server is running before the frontend
3. **Port Already in Use**: Change the PORT in the `.env` file or kill the process using the port
4. **Dependency Issues**: Try deleting `node_modules` and running `npm install` again

### Port Configuration

- Backend: Default port 5000 (configurable via .env)
- Frontend: Vite will choose an available port (usually 5173)

## License

This project is for educational purposes only.
