const {
  Client,
  AccountId,
  PrivateKey,
  TransferTransaction,
  ScheduleCreateTransaction,
  Hbar
} = require('@hashgraph/sdk');

class HederaService {
  constructor() {
    this.client = null;
    this.platformAccountId = null;
    this.platformPrivateKey = null;
    this.businessAccountId = null;
  }

  initialize() {
    try {
      // Initialize Hedera client for testnet
      this.client = Client.forTestnet();
      
      // Set up platform account credentials
      this.platformAccountId = AccountId.fromString(process.env.PLATFORM_ACCOUNT_ID);
      this.platformPrivateKey = PrivateKey.fromString(process.env.PLATFORM_PRIVATE_KEY);
      this.businessAccountId = AccountId.fromString(process.env.BUSINESS_ACCOUNT_ID);
      
      // Set operator (platform account pays fees)
      this.client.setOperator(this.platformAccountId, this.platformPrivateKey);
      
      console.log('Hedera service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Hedera service:', error);
      throw error;
    }
  }

  async createSubscription(userAccountId, amountHbar) {
    try {
      // Validate inputs
      if (!userAccountId || !amountHbar || amountHbar <= 0) {
        throw new Error('Invalid input parameters');
      }

      const userAccount = AccountId.fromString(userAccountId);
      const amount = new Hbar(amountHbar);

      // Create transfer transaction from user to business account
      const transferTransaction = new TransferTransaction()
        .addHbarTransfer(userAccount, amount.negated())
        .addHbarTransfer(this.businessAccountId, amount);

      // Create schedule for the transfer transaction
      const scheduleCreateTransaction = new ScheduleCreateTransaction()
        .setScheduledTransaction(transferTransaction)
        .setScheduleMemo(`Axiom Pay subscription: ${amountHbar} HBAR`)
        .freezeWith(this.client);

      // Sign and execute the schedule creation
      const signedTransaction = await scheduleCreateTransaction.sign(this.platformPrivateKey);
      const response = await signedTransaction.execute(this.client);
      
      // Get the receipt to extract schedule ID
      const receipt = await response.getReceipt(this.client);
      const scheduleId = receipt.scheduleId;

      // Generate HashScan URL for verification
      const hashscanUrl = `https://hashscan.io/testnet/schedule/${scheduleId}`;

      return {
        scheduleId: scheduleId.toString(),
        hashscanUrl,
        transactionId: response.transactionId.toString()
      };

    } catch (error) {
      console.error('Error creating subscription:', error);
      throw error;
    }
  }

  async getAccountBalance(accountId) {
    try {
      const account = AccountId.fromString(accountId);
      const balance = await this.client.getAccountBalance(account);
      return balance.hbars.toString();
    } catch (error) {
      console.error('Error getting account balance:', error);
      throw error;
    }
  }
}

module.exports = HederaService;

