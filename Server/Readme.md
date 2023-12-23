
# ProxiMap

## Description
ProxiMap is an interactive service map application designed to connect users with a wide array of services ranging from domestic help to professional consultations. Built with React, Node.js, Express.js, and MongoDB, this platform features robust user account management, real-time communication, and comprehensive service management. The application incorporates JWT and OAuth for secure authentication, ensuring a reliable and user-friendly experience.

## Features

- **User Account Management:** Secure registration and login, profile customization, and user management by admins.
- **Communication and Interaction:** In-app chat, a report and complaint system, and service quality oversight by admins.
- **Service Management:** Posting/viewing offers, advanced search functionality, list view with filters, and partner-specific features.
- **Category and Content Management:** CRUD operations for service categories, customizable content for admins.
- **Regional and Language Features:** Services filtered by regions, multi-language support.
- **Ratings and Feedback:** User rating system, achievement system for active and quality participation.
- **Security and Compliance:** Banning system, data protection, and security measures.
- **Financial Transactions:** Secure payment system integration.
- **Technical and Operational:** Performance optimization, efficient database management, Jest for testing, CI/CD using Docker.

## Installation

1. **Clone the Repository**
   ```
   git clone [https://github.com/mineboxarabic/ProxiMap]
   ```
2. **Install Dependencies**
   - For Backend (Node.js)
     ```
     cd backend
     npm install
     ```
   - For Frontend (React)
     ```
     cd frontend
     npm install
     ```

## Configuration

- Set up your MongoDB database and obtain your connection string.
- Configure your OAuth credentials for authentication.
- Update the `.env` files in both frontend and backend directories with your specific credentials.
- To change the configuration of the application authrisation routes you should go to ./config/AuthConfig.js and change the configuration of the routes.
## Running the Application

1. **Start the Backend Server**
   ```
   cd backend
   npm start
   ```
2. **Run the Frontend Application**
   ```
   cd frontend
   npm start
   ```

## Testing

- Run the Jest tests for React components:
  ```
  cd frontend
  npm test
  ```

## Deployment

- The project is configured for deployment using Docker. Follow the Docker documentation for deploying your application.

## Documentation

- Further documentation detailing each module and functionality is available in the `docs` folder.

## Contributing

Contributions to ProxiMap are welcome. Please read our contributing guidelines located in the `CONTRIBUTING.md` file.

## Contact

For any queries or contributions, please contact mineboxarabic@gmail.com.
