# Personal Finance Dashboard

A modern, full-stack personal finance management application built with Next.js that helps users track transactions, visualize spending patterns, and manage recurring bills.

## 🚀 Features

- **User Authentication**: Secure sign-up and login with Supabase Auth
- **Dashboard**: Overview of financial metrics with interactive charts
- **Transactions**: Track and manage all financial transactions with detailed records
- **Recurring Bills**: Monitor and manage subscription and recurring payments
- **Data Visualization**: Beautiful charts powered by Recharts for spending insights
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Type Safe**: Built entirely with TypeScript for robust code quality

## 🛠️ Tech Stack

- **Framework**: Next.js 13+ (React)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication & Database**: Supabase
- **Charts & Visualization**: Recharts
- **Icons**: Lucide React
- **Database**: PostgreSQL (via Supabase)

## 📋 Prerequisites

Before you begin, ensure you have the following:
- Node.js 13.x or higher
- npm or yarn package manager
- A Supabase account (free tier available at [supabase.com](https://supabase.com))

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd personal-finance-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard page
│   ├── transactions/      # Transactions management page
│   ├── recurring-bills/   # Recurring bills page
│   └── layout.tsx         # Root layout
├── components/            # Reusable React components
├── lib/                   # Utility functions and helpers
├── public/               # Static assets
└── .env.local            # Environment variables
```

## 📖 Pages Overview

### Dashboard
Main overview page displaying key financial metrics and visualizations. Users can see spending trends, account summary, and quick insights at a glance.

### Transactions
Comprehensive transaction management interface where users can:
- View all transactions with filters
- Add new income and expense transactions

### Recurring Bills
Dedicated page for managing recurring payments:
- Track subscriptions and monthly bills
- Monitor upcoming due dates
- Calculate monthly recurring expenses

## 🎨 Design Highlights

- Clean, modern UI with a professional color palette
- Interactive Recharts visualizations for spending analysis
- Intuitive navigation with Lucide React icons
- Fully responsive layout optimized for all devices

## 🔐 Authentication

This project uses Supabase Authentication with the following features:
- Email/password and GitHub authentication
- Secure session management
- Protected routes and pages

## 📊 Database Schema

The application uses Supabase PostgreSQL with tables for:
- **users**: User accounts and authentication
- **transactions**: Individual transaction records

## 🚀 Deployment

Deploy to Vercel (recommended for Next.js):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy with one click

Or deploy to any Node.js hosting provider that supports Next.js.

---

Built with ❤️ using Next.js and Supabase
