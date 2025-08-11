const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const HederaService = require('./hederaService');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Hedera service
const hederaService = new HederaService();

// Middleware
app.use(cors()); // Allow all origins for frontend-backend interaction
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'Axiom Pay Backend'
  });
});

// Create subscription endpoint
app.post('/api/subscribe', async (req, res) => {
  try {
    const { userAccountId, amountHbar, frequency } = req.body;

    // Validate required fields
    if (!userAccountId || !amountHbar) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required fields: userAccountId and amountHbar'
      });
    }

    // Validate amount
    if (typeof amountHbar !== 'number' || amountHbar <= 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Amount must be a positive number'
      });
    }

    // Validate account ID format (basic check)
    if (!userAccountId.match(/^0\.0\.\d+$/)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid Hedera account ID format. Expected format: 0.0.xxxxx'
      });
    }

    console.log(`Creating subscription for user ${userAccountId}, amount: ${amountHbar} HBAR`);

    // Create subscription using Hedera service
    const result = await hederaService.createSubscription(userAccountId, amountHbar);

    res.json({
      status: 'success',
      message: 'Subscription created successfully',
      scheduleId: result.scheduleId,
      hashscanUrl: result.hashscanUrl,
      transactionId: result.transactionId,
      frequency: frequency || 'one-time'
    });

  } catch (error) {
    console.error('Error in /api/subscribe:', error);
    
    // Handle specific Hedera errors
    let errorMessage = 'Failed to create subscription';
    if (error.message.includes('INVALID_ACCOUNT_ID')) {
      errorMessage = 'Invalid user account ID';
    } else if (error.message.includes('INSUFFICIENT_ACCOUNT_BALANCE')) {
      errorMessage = 'Insufficient balance in user account';
    } else if (error.message.includes('Invalid input parameters')) {
      errorMessage = error.message;
    }

    res.status(500).json({
      status: 'error',
      message: errorMessage
    });
  }
});

// Get account balance endpoint (for testing)
app.get('/api/balance/:accountId', async (req, res) => {
  try {
    const { accountId } = req.params;
    
    if (!accountId.match(/^0\.0\.\d+$/)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid Hedera account ID format'
      });
    }

    const balance = await hederaService.getAccountBalance(accountId);
    
    res.json({
      status: 'success',
      accountId,
      balance
    });

  } catch (error) {
    console.error('Error getting balance:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get account balance'
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found'
  });
});

// Initialize Hedera service and start server
async function startServer() {
  try {
    console.log('Initializing Hedera service...');
    await hederaService.initialize();
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Axiom Pay backend server running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
      console.log(`API endpoint: http://localhost:${PORT}/api/subscribe`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

