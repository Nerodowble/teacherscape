# Backend Documentation

## Overview

The backend is built using Node.js and Express and uses the following technologies:

- Express for creating the API server
- Cors for handling CORS requests
- SQLite for the database
- Bcrypt for password hashing
- UUID for generating unique IDs

## File Structure

- `backend/`: Contains the source code for the backend
  - `database.cjs`: Contains the database connection and schema
  - `server.cjs`: Contains the Express server and API routes
  - `database/`: Contains the SQLite database file
    - `database.sqlite`: The SQLite database file
  - `schemas/`: Contains the database schemas
    - `auth.schema.ts`: The authentication schema
    - `user.schema.ts`: The user schema

## Environment Variables

The backend uses the following environment variables:

- `BACKEND_PORT`: The port that the backend server is running on

## Running the Backend

To run the backend, use the following command:

```bash
ts-node backend/server.cjs
```

This will start the backend server on port 3003 (or a dynamically assigned port if 3003 is already in use).

## API Endpoints

The backend provides the following API endpoints:

- `POST /register`: Registers a new user
- `POST /login`: Logs in an existing user
- `GET /users`: Gets all users (requires authentication)
- `POST /logout`: Logs out the current user
- `GET /profile`: Gets the profile of the current user (requires authentication)
- `DELETE /profile`: Deletes the account of the current user (requires authentication)
