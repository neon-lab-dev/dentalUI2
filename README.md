# Dental UI 2.0

A modern, user-friendly dental appointment booking system built with Next.js and TypeScript.

## Features

### 🦷 Core Features
- User authentication and registration
- Clinic location search and selection
- Interactive appointment scheduling
- Service selection and booking
- Provider availability management
- Real-time appointment confirmation

### 🎨 UI/UX
- Modern, responsive design
- Intuitive booking flow
- Interactive service cards
- Progress indicators
- Loading states and error handling
- Mobile-friendly interface

### 🔧 Technical Improvements
- Redux state management for better data flow
- TypeScript for type safety
- API error handling and validation
- Proper date and time formatting
- Comprehensive logging for debugging
- Code organization and reusability

## Recent Updates

### Service Selection & Booking Flow
- Fixed service selection state management using Redux
- Improved appointment data handling and validation
- Added proper error handling for API responses
- Enhanced user feedback during booking process
- Fixed appointment creation payload formatting
- Added detailed logging for debugging

### Customer Management
- Improved customer creation and lookup
- Added validation for required customer fields
- Enhanced error handling for customer operations
- Better handling of customer data in appointment process

### Code Quality
- Created shared utility functions for common operations
- Improved TypeScript type definitions
- Enhanced code documentation
- Better error messages and logging
- Consistent API response handling

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env`
4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables
```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Contributing
1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License
MIT License
