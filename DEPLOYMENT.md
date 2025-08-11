# Deployment Guide for Axiom Pay

This guide covers deploying the Axiom Pay application to production environments.

## 🚀 Quick Deployment Options

### Option 1: Deploy Both Frontend and Backend (Recommended)

#### Backend Deployment
```bash
# Deploy backend to a cloud service
cd backend
# The backend will be deployed and accessible via a public URL
```

#### Frontend Deployment
```bash
# Build and deploy frontend
cd frontend
pnpm run build
# The frontend will be deployed and accessible via a public URL
```

### Option 2: Local Development Setup

#### Start Backend
```bash
cd backend
npm start
# Backend runs on http://localhost:3001
```

#### Start Frontend
```bash
cd frontend
pnpm run dev --host
# Frontend runs on http://localhost:5173
```

## 🔧 Environment Configuration

### Backend Environment Variables
Create a `.env` file in the `backend` directory:

```env
# Hedera Testnet Configuration
PLATFORM_ACCOUNT_ID=0.0.YOUR_PLATFORM_ACCOUNT
PLATFORM_PRIVATE_KEY=YOUR_PLATFORM_PRIVATE_KEY
BUSINESS_ACCOUNT_ID=0.0.YOUR_BUSINESS_ACCOUNT
HEDERA_NETWORK=testnet
PORT=3001
```

### Frontend Configuration
If deploying to production, update the API endpoint in the frontend code:

```javascript
// In src/components/SubscriptionForm.jsx
const response = await fetch('YOUR_BACKEND_URL/api/subscribe', {
  // ... rest of the configuration
});
```

## 🌐 Hedera Testnet Account Setup

### 1. Create Accounts
Visit [Hedera Portal](https://portal.hedera.com) or [Hedera Faucet](https://hedera.com/faucet):

1. **Platform Account**: Will pay transaction fees
2. **Business Account**: Will receive subscription payments
3. **Test User Account**: For testing (optional)

### 2. Fund Accounts
- Each account gets 1000 HBAR from the portal
- Or 100 HBAR from the faucet
- Ensure Platform account has sufficient balance for fees

### 3. Get Credentials
- Copy Account IDs (format: 0.0.xxxxx)
- Copy Private Keys (64-character hex strings)
- Update `.env` file with real credentials

## 🔒 Security Checklist

- [ ] Never commit `.env` files to version control
- [ ] Use environment variables for all sensitive data
- [ ] Configure CORS properly for production
- [ ] Use HTTPS in production
- [ ] Validate all user inputs
- [ ] Monitor transaction fees and account balances

## 🧪 Testing Deployment

### 1. Health Check
```bash
curl https://your-backend-url/health
```

### 2. Test Subscription Creation
```bash
curl -X POST https://your-backend-url/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"userAccountId":"0.0.12345","amountHbar":1,"frequency":"one-time"}'
```

### 3. Verify on HashScan
- Check returned Schedule ID on [HashScan](https://hashscan.io/testnet)
- Verify transaction details and status

## 📊 Monitoring

### Backend Monitoring
- Monitor server logs for errors
- Track API response times
- Monitor Hedera account balances
- Set up alerts for failed transactions

### Frontend Monitoring
- Monitor user interactions
- Track subscription creation success rates
- Monitor wallet connection issues

## 🚨 Troubleshooting

### Common Issues

#### "INVALID_SIGNATURE" Error
- Check that private keys are correct
- Ensure account IDs match the private keys
- Verify accounts are funded

#### "Network Error" in Frontend
- Check backend URL configuration
- Verify CORS settings
- Ensure backend is running and accessible

#### "Insufficient Balance" Error
- Check Platform account HBAR balance
- Fund accounts via Hedera Portal/Faucet
- Monitor transaction fee costs

### Debug Steps
1. Check server logs for detailed error messages
2. Verify environment variables are loaded correctly
3. Test API endpoints individually
4. Check Hedera network status
5. Verify account credentials on HashScan

## 📈 Scaling Considerations

### Performance
- Implement request rate limiting
- Add database for transaction history
- Cache frequently accessed data
- Use CDN for frontend assets

### Security
- Implement API authentication
- Add request validation middleware
- Use secure key management services
- Regular security audits

### Features
- Add user authentication
- Implement business dashboards
- Add payment analytics
- Support multiple cryptocurrencies

## 🔄 Updates and Maintenance

### Backend Updates
```bash
cd backend
npm update
npm audit fix
```

### Frontend Updates
```bash
cd frontend
pnpm update
pnpm audit
```

### Hedera SDK Updates
- Monitor Hedera SDK releases
- Test updates in development first
- Update documentation as needed

## 📞 Support Resources

- [Hedera Documentation](https://docs.hedera.com)
- [Hedera Discord Community](https://hedera.com/discord)
- [HashScan Explorer](https://hashscan.io)
- [Hedera Portal](https://portal.hedera.com)

---

**Need help?** Create an issue in the repository or reach out to the Hedera community!

