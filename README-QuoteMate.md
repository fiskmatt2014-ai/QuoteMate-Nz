# QuoteMate NZ

A simple yet functional SaaS MVP for New Zealand tradies to create quotes and invoices.

## Features

- **Customer Management**: Add, view, search, and manage your customers
- **Quotes**: Create professional quotes with line items and automatic GST calculation
- **Invoices**: Generate invoices with payment tracking
- **NZ-Specific**: 15% GST calculation, NZD currency formatting, and NZ date formats
- **Dashboard**: Quick overview of your business metrics
- **User Authentication**: Secure signup and login system

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite (via better-sqlite3)
- **Authentication**: iron-session (encrypted cookies)
- **PDF Generation**: jspdf (ready for implementation)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/fiskmatt2014-ai/QuoteMate-Nz.git
cd QuoteMate-Nz
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Edit `.env` and set a secure session secret:
```
SESSION_SECRET=your_very_long_and_secure_random_string_at_least_32_characters
```

5. Initialize the database:
```bash
npm run init-db
```

6. Start the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Usage

1. **Sign Up**: Create an account with your business details including GST number
2. **Add Customers**: Navigate to Customers and add your client information
3. **Create Quotes**: Go to Quotes > Create Quote, select a customer, and add line items
4. **Generate Invoices**: Similar to quotes, create invoices with due dates
5. **Track Status**: Update quote/invoice status as they progress (Draft → Sent → Accepted/Paid)

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── customers/         # Customer pages
│   ├── quotes/            # Quote pages
│   ├── invoices/          # Invoice pages
│   ├── dashboard/         # Dashboard page
│   ├── login/             # Login page
│   └── signup/            # Signup page
├── components/            # Reusable components
├── lib/                   # Business logic
│   ├── auth/             # Authentication utilities
│   ├── db/               # Database access layer
│   └── utils/            # Helper functions
└── scripts/              # Utility scripts
```

## Key Features Explained

### NZ GST Calculation
All quotes and invoices automatically calculate 15% GST (Goods and Services Tax) as required in New Zealand. The breakdown is clearly shown on all documents.

### Customer Management
Store customer details including:
- Name
- Email
- Phone
- Address

### Quote & Invoice Line Items
Add multiple line items to quotes and invoices with:
- Description
- Quantity
- Unit Price
- Automatic total calculation

### Status Tracking
- **Quotes**: Draft → Sent → Accepted/Rejected
- **Invoices**: Draft → Sent → Paid/Overdue

## Future Enhancements

- PDF export functionality
- Email sending integration
- Quote to invoice conversion
- Payment gateway integration
- Multi-user support
- Invoice reminders
- Reporting and analytics

## Development

### Database Schema
The app uses SQLite with the following main tables:
- `users` - User accounts and business information
- `customers` - Customer information
- `quotes` - Quote headers
- `quote_items` - Quote line items
- `invoices` - Invoice headers
- `invoice_items` - Invoice line items

### Authentication
Uses iron-session for secure, encrypted cookie-based sessions. No JWT tokens needed for this MVP.

## License

MIT

## Support

For issues or questions, please create an issue on GitHub.
