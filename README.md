# TownBook


## Project Overview
A modern, full-stack library management system that enables efficient management of library resources, user accounts, and reservations. The system serves both library members and librarians with distinct interfaces and functionalities.

## System Architecture

### Frontend Architecture
- **Framework**: React.js with Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM v7
- **UI Components**: 
  - Radix UI for accessible components
  - Lucide React for icons
  - Tailwind CSS for styling
  - Framer Motion for animations
- **Form Handling**: React Hook Form with Zod validation
- **Date Handling**: date-fns and moment.js
- **Notifications**: React Toastify and Sonner
- **Data Visualization**: Recharts and D3.js

### Backend Architecture
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: AWS S3 integration
- **API Architecture**: RESTful

## Core Modules

### 1. Member Module
- **Components**:
  - Dashboard
  - All Libraries View
  - Library Books Browser
  - Reservation Management
  - Profile Management

### 2. Librarian Module
- **Components**:
  - Admin Dashboard
  - Book Management
  - Room Management
  - Reservation Handling
  - User Management
  - Profile Settings

### 3. Common Features
- **Authentication System**
- **Navigation System**
- **Toast Notifications**
- **Form Components**
- **Data Tables**
- **Loading States**

## API Structure

### User Management
- Authentication endpoints
- Profile management
- Role-based access control

### Book Management
- CRUD operations for books
- Search and filter functionality
- Availability tracking
- Reservation system

### Room Management
- Room booking system
- Availability calendar
- Reservation tracking

### Reservation System
- Book reservations
- Room reservations
- History tracking
- Status management

## Security Features
1. JWT-based authentication
2. Role-based access control
3. Protected API routes
4. Secure password handling
5. Input validation and sanitization

## Data Models

### User Model
- Basic information
- Role (Member/Librarian)
- Authentication details
- Reservation history

### Book Model
- Book details
- Availability status
- Reservation records
- Location information

### Room Model
- Room information
- Capacity
- Facilities
- Booking status

### Reservation Model
- Resource information
- User details
- Time period
- Status tracking

## Development Setup

### Prerequisites
- Node.js (v16+)
- MongoDB
- AWS Account (for S3)

### Environment Configuration
```env
# Frontend (.env)
VITE_API_URL=http://localhost:8080
VITE_AWS_S3_URL=your-s3-url

# Backend (.env)
PORT=8080
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
CLIENT_URL=http://localhost:5173
AWS_ACCESS_KEY=your-aws-key
AWS_SECRET_KEY=your-aws-secret
```

### Installation Steps
1. Clone repository
2. Install dependencies:
   ```bash
   # Backend
   cd Server
   npm install

   # Frontend
   cd Frontend
   npm install
   ```
3. Start development servers:
   ```bash
   # Backend
   npm run dev

   # Frontend
   npm run dev
   ```

## Performance Optimizations
1. Redux state management
2. React.lazy for code splitting
3. Optimized database queries
4. Caching strategies
5. Image optimization

## Testing Strategy
- Unit tests for components
- Integration tests for API
- End-to-end testing
- Performance testing

## Deployment
- Frontend: Netlify/Vercel
- Backend: AWS/Heroku
- Database: MongoDB Atlas
- File Storage: AWS S3

## Future Enhancements
1. Real-time notifications
2. Advanced analytics
3. Mobile application
4. Offline support
5. Multi-language support

## Contributing Guidelines
1. Fork repository
2. Create feature branch
3. Follow coding standards
4. Write tests
5. Submit pull request

## Support and Documentation
- GitHub Repository
- API Documentation
- User Guide
- Contributing Guide
