# Axiom Pay - Decentralized Subscription Payments

A decentralized subscription payment platform built on the Hedera Testnet that allows users to set up recurring HBAR payments using Hedera's scheduling features. The system is secure, low-cost, and fast, leveraging Hedera's blockchain to outshine centralized payment systems.

## 🚀 Features

- **Decentralized Payments**: Uses Hedera's ScheduleCreateTransaction for automated payments
- **Low Cost**: ~$0.0001 transaction fees, platform covers costs for users
- **Fast**: 3-second finality with Hedera's consensus
- **Secure**: Blockchain-secured transactions with cryptographic proof
- **Eco-Friendly**: Carbon-negative blockchain technology
- **User-Friendly**: Clean, intuitive UI with wallet integration

## 🏗️ Architecture

### Backend (Node.js + Express)
- **Hedera SDK Integration**: Handles ScheduleCreateTransaction creation
- **RESTful API**: Endpoints for subscription creation and account management
- **Error Handling**: Comprehensive error handling and logging
- **CORS Support**: Allows frontend-backend communication

### Frontend (React + Tailwind CSS)
- **Wallet Connection**: Mock wallet integration (HashPack/MetaMask compatible)
- **Subscription Form**: User-friendly form for amount and frequency selection
- **Confirmation Display**: Shows Schedule ID and HashScan verification link
- **Responsive Design**: Works on desktop and mobile devices

## 📁 Project Structure

```
axiom-pay/
├── backend/
│   ├── src/
│   │   ├── index.js         # Main server file
│   │   └── hederaService.js # Hedera SDK interactions
│   ├── .env                 # Environment variables (Hedera credentials)
│   └── package.json         # Node.js dependencies
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main React component
│   │   └── components/      # React components
│   └── package.json         # React dependencies
├── .gitignore               # Git ignore file
└── README.md                # This file
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ and npm/pnpm
- Hedera Testnet accounts (Platform, Business, Test User)
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd axiom-pay
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file with your Hedera credentials
cp .env.example .env
# Edit .env with your actual Hedera account details
```

### 3. Frontend Setup
```bash
cd ../frontend
pnpm install
```

### 4. Environment Configuration

Create a `.env` file in the `backend` directory:

```env
# Hedera Testnet Configuration
PLATFORM_ACCOUNT_ID=0.0.YOUR_PLATFORM_ACCOUNT
PLATFORM_PRIVATE_KEY=YOUR_PLATFORM_PRIVATE_KEY
BUSINESS_ACCOUNT_ID=0.0.YOUR_BUSINESS_ACCOUNT
HEDERA_NETWORK=testnet
```

**⚠️ Important**: Replace the placeholder values with real Hedera Testnet account credentials.

## 🚀 Running the Application

### Start Backend Server
```bash
cd backend
npm start
```
Server runs on `http://localhost:3001`

### Start Frontend Development Server
```bash
cd frontend
pnpm run dev --host
```
Frontend runs on `http://localhost:5173`

## 🔧 API Endpoints

### POST `/api/subscribe`
Creates a new subscription by scheduling an HBAR transfer.

**Request Body:**
```json
{
  "userAccountId": "0.0.12345",
  "amountHbar": 50,
  "frequency": "one-time"
}
```

**Response:**
```json
{
  "status": "success",
  "scheduleId": "0.0.98765",
  "hashscanUrl": "https://hashscan.io/testnet/schedule/0.0.98765",
  "transactionId": "0.0.54321@1234567890.123456789"
}
```

### GET `/api/balance/:accountId`
Gets the HBAR balance for a specific account (testing purposes).

### GET `/health`
Health check endpoint.

## 🌐 Hedera Testnet Setup

### 1. Create Testnet Accounts
- Visit [Hedera Portal](https://portal.hedera.com) or [Hedera Faucet](https://hedera.com/faucet)
- Create 2-3 accounts: Platform, Business, and Test User accounts
- Each account gets 1000 HBAR for testing

### 2. Account Roles
- **Platform Account**: Pays transaction fees for scheduling
- **Business Account**: Receives subscription payments
- **Test User Account**: For testing subscription creation

### 3. Update Configuration
- Copy Account IDs and Private Keys to `.env` file
- Ensure accounts are funded with test HBAR

## 🔍 Testing

### Manual Testing
1. Start both backend and frontend servers
2. Open `http://localhost:5173` in browser
3. Click "Connect Wallet" (uses mock account for demo)
4. Enter amount (e.g., 50 HBAR)
5. Click "Create Subscription"
6. Verify Schedule ID and HashScan link

### API Testing
```bash
# Test health endpoint
curl http://localhost:3001/health

# Test subscription creation
curl -X POST http://localhost:3001/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"userAccountId":"0.0.12345","amountHbar":50,"frequency":"one-time"}'
```

## 📊 Verification

### HashScan Integration
- All scheduled transactions are verifiable on [HashScan](https://hashscan.io/testnet)
- Schedule IDs link directly to HashScan for transparency
- Users can verify payment schedules independently

### Transaction Flow
1. User submits subscription request
2. Backend creates TransferTransaction (user → business)
3. Backend wraps in ScheduleCreateTransaction
4. Platform account pays transaction fee
5. Schedule ID returned to user
6. Transaction visible on HashScan

## 🚀 Deployment

### Backend Deployment
The backend is ready for deployment on platforms like:
- Heroku
- Railway
- DigitalOcean App Platform
- AWS/GCP/Azure

### Frontend Deployment
The frontend can be deployed on:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

### Environment Variables
Ensure production environment has:
- Real Hedera Mainnet/Testnet credentials
- Proper CORS configuration
- Secure private key storage

## 🔒 Security Considerations

- **Private Keys**: Never commit private keys to version control
- **Environment Variables**: Use secure environment variable management
- **CORS**: Configure CORS properly for production
- **Testnet Only**: Current setup uses Testnet (no real funds at risk)

## 🎯 Hackathon Demo

### Demo Script
1. **Introduction**: Explain decentralized subscription concept
2. **Wallet Connection**: Show mock wallet integration
3. **Subscription Creation**: Create 50 HBAR subscription
4. **Verification**: Show Schedule ID and HashScan link
5. **Benefits**: Highlight low cost, speed, and security

### Key Selling Points
- **Innovation**: First decentralized subscription platform on Hedera
- **Practical**: Solves real-world payment problems
- **Scalable**: Can handle multiple users and businesses
- **Verifiable**: All transactions visible on blockchain

## 🛣️ Future Enhancements

- Real wallet integration (HashPack, MetaMask)
- Recurring payment scheduling
- Business dashboard for payment management
- Multi-token support (HTS tokens)
- Payment analytics and reporting
- Mobile app development

## 📝 License

This project is built for educational and hackathon purposes. See LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support

For questions or support:
- Create an issue in the repository
- Join [Hedera Discord](https://hedera.com/discord)
- Check [Hedera Documentation](https://docs.hedera.com)

---

**Built with ❤️ for the Hedera Hackathon**

