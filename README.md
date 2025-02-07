# Westcoast Education

A modern web application for managing and displaying educational courses. Built with TypeScript and featuring a responsive design for both desktop and mobile users.

## Features

- 📚 Course Catalog

  - View all available courses
  - Filter courses by type (classroom/distance)
  - Search functionality
  - Detailed course information

- 📝 Course Management (Admin)

  - Add new courses
  - View existing courses
  - Track course bookings
  - Manage course schedules

- 📅 Booking System
  - Book courses
  - Select preferred schedule
  - Automatic seat availability tracking
  - Booking confirmation

## Technology Stack

- **Frontend:**

  - TypeScript
  - HTML5
  - CSS3
  - ES Modules

- **Backend:**

  - JSON Server (RESTful API)

- **Development Tools:**
  - Vite
  - Vitest for testing
  - ESLint/TypeScript configuration

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository

2. Install dependencies:

```bash
npm install
```

### Development

Start the JSON server and development server:

```bash
npm run start
```

Or run them separately:

Start the JSON server:

```bash
npm run server db.json
```

Start the development server:

```bash
npm run dev
```

### Testing

Run tests:

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch
```

### Building

Build for production:

```bash
npm run build
```
