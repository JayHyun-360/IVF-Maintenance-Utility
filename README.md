# IVF Maintenance Utility

A comprehensive Integrated Visual Feedback & Maintenance Utility built with Next.js, TypeScript, and Prisma. This system streamlines maintenance operations with visual feedback, real-time notifications, and powerful analytics.

## 🚀 Features

### Core Functionality

- **User Authentication**: Secure login system with role-based access control (Admin, Student, Staff)
- **Maintenance Request Management**: Create, track, and manage maintenance requests
- **Real-time Notifications**: Instant updates for request status changes
- **File Upload**: Support for images and document attachments
- **Analytics Dashboard**: Comprehensive insights and reporting
- **Mobile Responsive**: Works seamlessly on all devices

### Technical Features

- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with secure session management
- **UI Framework**: Tailwind CSS with custom design system
- **Testing**: Jest (unit) + Playwright (E2E) testing suite
- **CI/CD**: GitHub Actions pipeline
- **Type Safety**: Full TypeScript implementation

## 🛠 Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Backend**: Next.js API Routes, Prisma
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Charts**: Recharts
- **Testing**: Jest, Playwright
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL 15+
- npm or yarn

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone <repository-url>
cd ivf-maintenance-utility
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Configure your environment variables:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/ivf_maintenance"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
JWT_SECRET="your-jwt-secret-here"
```

### 4. Set up the database

```bash
npm run db:migrate
npm run db:seed
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Available Scripts

### Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

### Code Quality

- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript type checking

### Testing

- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run test:e2e` - Run E2E tests
- `npm run test:e2e:ui` - Run E2E tests with UI

### Database

- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio
- `npm run db:reset` - Reset database

## 👥 Default Users

The system includes these demo users for testing:

### Admin User

- **Email**: admin@test.com
- **Password**: admin12345
- **Role**: Administrator
- **Access**: Full admin dashboard, user management, analytics

### General User

- **Email**: user@test.com
- **Password**: user12345
- **Role**: User
- **Access**: Submit requests, track status

## 🏗 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── admin/             # Admin dashboard
│   └── student/           # Student interface
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── __tests__/        # Component tests
├── lib/                   # Utility functions
├── types/                 # TypeScript type definitions
└── middleware.ts          # Next.js middleware

prisma/
├── schema.prisma         # Database schema
├── migrations/           # Database migrations
└── seed.ts              # Database seed script

tests/
└── e2e/                 # E2E tests
```

## 🧪 Testing

### Unit Tests

Run unit tests with Jest:

```bash
npm run test
```

### E2E Tests

Run end-to-end tests with Playwright:

```bash
npm run test:e2e
```

## 📊 Analytics

The admin dashboard provides comprehensive analytics including:

- Request status distribution
- Category-wise request breakdown
- Monthly trends
- Average resolution times
- Performance metrics

## 🔐 Security Features

- Secure authentication with NextAuth.js
- Role-based access control
- JWT token management
- Input validation and sanitization
- CSRF protection
- Secure session management

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 CI/CD

The project includes a comprehensive CI/CD pipeline:

- Automated testing on pull requests
- Code quality checks
- Type checking
- E2E testing
- Automated deployment on merge to main

## 📱 Mobile Support

The application is fully responsive and works on:

- Desktop browsers
- Tablets
- Mobile devices

## 🎨 Design System

Built with a consistent design system featuring:

- Custom color palette
- Responsive grid system
- Accessible components
- Dark mode support (coming soon)
