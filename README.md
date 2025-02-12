# Teacherscape

Teacherscape is a full-stack web application built with React and Express. It provides a platform for teachers to manage their classes, students, and grades.

## Project Description

Teacherscape aims to simplify the process of managing classrooms and student data for teachers. It offers a user-friendly interface for tracking student progress, generating reports, and sharing resources.

## Features

- User authentication and authorization
- Student management
- Grade management and calculation
- Report generation and export
- Resource sharing and organization
- Interactive dashboard with key metrics
- Profile management for teachers

## Technologies

- Frontend:
  - React: A JavaScript library for building user interfaces
  - React Router: A standard library for routing in React
  - Axios: A promise-based HTTP client for making API requests
  - Tailwind CSS: A utility-first CSS framework for styling
  - Shadcn UI: A collection of reusable UI components built with Radix UI and Tailwind CSS
  - Tanstack React Query: A data-fetching library for React
  - TypeScript: A superset of JavaScript that adds static typing

- Backend:
  - Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine
  - Express: A fast, unopinionated, minimalist web framework for Node.js
  - Cors: A node.js package for providing a Connect/Express middleware that can be used to enable CORS
  - SQLite: A self-contained, high-reliability, embedded, full-featured, public-domain, SQL database engine
  - Bcrypt: A library to help you hash passwords
  - UUID: A library for generating unique IDs

## Getting Started

To get started with Teacherscape, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/teacherscape.git
```

2. Install the dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add the following environment variable:

```
BACKEND_PORT=3003
```

4. Run the backend server:

```bash
ts-node backend/server.cjs
```

5. Run the frontend server:

```bash
npm run dev
```

## Documentation

- [Frontend Documentation](frontend.md)
- [Backend Documentation](backend.md)

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) before submitting a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
