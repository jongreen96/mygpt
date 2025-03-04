# MyGPT

MyGPT is a sleek web application that empowers users with on-demand access to OpenAI's Chat and Image Generation models. Designed for seamless AI interactions, MyGPT enables powerful text generation, code assistance, and stunning AI-generated images — all on a pay-as-you-go basis with device synchronization.

## Highlights

- ⚡ Built with **Next.js 15** and **React 19** for modern performance
- 🎨 Beautiful, responsive design with **Tailwind CSS** and **shadcn/ui** components
- 🔐 Secure authentication via **NextAuth.js**
- 💾 Data storage powered by **PostgreSQL** and **Prisma ORM**
- ☁️ Cloud storage integration with **Cloudflare R2**
- 📧 Email functionality through **Resend**
- 🌗 Dark/Light mode support
- 🔄 Real-time AI interactions

## Tech Stack

| Category       | Technology          |
| -------------- | ------------------- |
| Framework      | Next.js 15          |
| Language       | TypeScript          |
| Styling        | Tailwind CSS        |
| UI Components  | shadcn/ui           |
| Database       | PostgreSQL + Prisma |
| Authentication | NextAuth.js         |
| Storage        | Cloudflare R2       |
| Email          | Resend              |
| Code Quality   | ESLint, Prettier    |

## Project Structure

- **/src** – Application source code
- **/public** – Static assets
- **/prisma** – Database schema and migrations
- **/components** – Reusable UI components

## Core Features

- **AI Chat**: Real-time conversation with OpenAI's language models, supporting code assistance and deep analysis.
- **Image Generation**: High-quality AI-generated images with customizable prompts.
- **File Storage**: Seamless file uploads and downloads powered by Cloudflare R2.
- **Device Sync**: Continue conversations across devices with synchronized user data.
- **Dark/Light Theme**: Automatic and manual theme toggling.

## Architecture Overview

MyGPT follows a modern architecture with a clear separation of concerns:

- **Application Layer**: Built entirely with **Next.js 15**, serving both frontend and backend functionalities through API routes and server-side logic.
- **Database**: PostgreSQL with Prisma for user data and file metadata.
- **Storage**: Cloudflare R2 for file uploads and image storage.
- **Authentication**: NextAuth.js with JWT-based sessions.

## Challenges & Solutions

- **Authentication Migration**: Transitioned from Clerk to Auth.js, ensuring seamless user data migration and secure JWT-based sessions.
- **Cloudflare R2 Integration**: Leveraged AWS S3-compatible APIs to implement file storage with minimal configuration.

## Contributing

While MyGPT is currently a private project, contributions and feedback are always welcome. Feel free to reach out if you're interested in collaborating.

## License

This project is private and not available for public use without permission.
