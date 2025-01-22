# MyGPT

A modern web application built with Next.js 15, TypeScript, and Tailwind CSS that leverages AI capabilities.

## Features

- 🚀 Built with Next.js 15 and React 19
- 🎨 Styled with Tailwind CSS and Radix UI components
- 🔒 Authentication with NextAuth.js
- 💾 Database integration with Prisma
- 🎭 Dark/Light theme support
- 🔄 Real-time AI interactions
- 📦 AWS S3 integration for file storage
- 📧 Email functionality with Nodemailer

## Prerequisites

- Node.js (Latest LTS version recommended)
- PostgreSQL database
- AWS account (for S3 storage)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/jongreen96/mygpt.git
   cd mygpt
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   Create a `.env` file in the root directory and add your configuration:
   ```
   DATABASE_URL="your-database-url"
   NEXTAUTH_SECRET="your-auth-secret"
   NEXTAUTH_URL="http://localhost:3000"
   
   # AWS Configuration
   AWS_ACCESS_KEY_ID="your-aws-access-key"
   AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
   AWS_REGION="your-aws-region"
   
   # OpenAI Configuration (if using)
   OPENAI_API_KEY="your-openai-api-key"
   ```

4. Initialize the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000)

## Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Database**: PostgreSQL with Prisma
- **Authentication**: NextAuth.js
- **Storage**: AWS S3
- **Email**: Nodemailer
- **State Management**: React Hooks
- **Code Quality**: ESLint, Prettier

## Project Structure

- `/src` - Application source code
- `/public` - Static assets
- `/prisma` - Database schema and migrations
- `/components` - Reusable UI components

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and not open for public use without permission.