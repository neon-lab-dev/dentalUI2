# Dental Clinic Website

A modern, feature-rich dental clinic website built with Next.js 15 and TypeScript, designed to provide a seamless experience for dental patients.

## Features

- 🦷 Modern and responsive UI design
- 📅 Online appointment scheduling system
- 📍 Multiple location support
- 📱 Mobile-friendly interface
- 📝 Dental blog integration with Sanity CMS
- 🔄 Real-time appointment management

## Project Structure

```
dentalUI2/
├── src/
│   ├── app/                    # Next.js app router pages
│   ├── assets/                 # Static assets and images
│   ├── components/             # Reusable UI components
│   ├── services/               # API and external service integrations
│   └── store/                  # Redux store configuration
├── Dental-blog/               # Sanity CMS blog setup
└── public/                    # Public assets
```

## Tech Stack

- **Frontend Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **CMS:** Sanity.io
- **UI Components:** HeadlessUI
- **Date Handling:** date-fns
- **Slider:** Swiper

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with necessary configurations

4. Run the development server:
   ```bash
   npm run dev
   ```

5. For blog setup (optional):
   ```bash
   cd Dental-blog
   npm install
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

- The project uses Next.js App Router for routing
- Components are organized by feature in the `components` directory
- Appointment scheduling system is available at `/locations/schedule-appointment`
- Blog content is managed through Sanity CMS

## Docker Setup

To run the application using Docker, follow these steps:

1. **Build the Docker images**:
   ```bash
   docker-compose build
   ```

2. **Run the application**:
   ```bash
   docker-compose up
   ```

3. **Access the application**:
   Open your browser and go to `http://localhost:3000`.

4. **Stopping the application**:
   To stop the application, press `CTRL+C` in the terminal where you ran the `docker-compose up` command.

## Deployment

The application can be deployed using Vercel or any other Next.js-compatible hosting platform:

```bash
npm run build
npm run start
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
