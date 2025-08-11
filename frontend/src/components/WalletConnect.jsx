import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Wallet, CheckCircle, AlertCircle } from 'lucide-react';
import { HashConnect } from 'hashconnect';
import { LedgerId } from '@hashgraph/sdk';

const WalletConnect = ({ onWalletConnected, connectedAccount }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');
  const [hashconnect, setHashconnect] = useState(null);

  useEffect(() => {
    // Initialize HashConnect
    const initHashConnect = async () => {
      try {
        const appMetadata = {
          name: "Axiom Pay",
          description: "Decentralized Subscription Payment Platform",
          icons: ["https://axiompay.app/icon.png"],
          url: "https://axiompay.app"
        };

        // Get WalletConnect project ID from environment variables
        // If not set, use a demo value (may not work for production)
        const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || "demo";

        const hc = new HashConnect(
          LedgerId.TESTNET,
          projectId,
          appMetadata,
          true // debug mode
        );

        await hc.init();
        setHashconnect(hc);

        // Listen for wallet connection events
        hc.on('pairingEvent', (data) => {
          console.log('Pairing event:', data);
          if (data.accountIds && data.accountIds.length > 0) {
            onWalletConnected(data.accountIds[0]);
          }
        });

        hc.on('connectionStatusChange', (state) => {
          console.log('Connection status changed:', state);
        });

      } catch (err) {
        console.error('Failed to initialize HashConnect:', err);
        setError('Failed to initialize wallet connection');
      }
    };

    initHashConnect();
  }, [onWalletConnected]);

  const connectWallet = async () => {
    if (!hashconnect) {
      setError('Wallet connection not initialized');
      return;
    }

    setIsConnecting(true);
    setError('');

    try {
      // Check if HashPack is installed
      if (typeof window !== 'undefined' && !window.hashconnect) {
        setError('HashPack wallet not detected. Please install HashPack extension.');
        return;
      }

      // Connect to wallet
      const connectionData = await hashconnect.connectToLocalWallet();
      
      if (connectionData && connectionData.accountIds && connectionData.accountIds.length > 0) {
        onWalletConnected(connectionData.accountIds[0]);
      } else {
        setError('No accounts found. Please make sure your wallet is unlocked.');
      }
    } catch (err) {
      console.error('Wallet connection failed:', err);
      setError('Failed to connect wallet. Please make sure HashPack is installed and unlocked.');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      if (hashconnect) {
        await hashconnect.disconnect();
      }
    } catch (err) {
      console.error('Error disconnecting wallet:', err);
    }
    onWalletConnected(null);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300 shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-white text-xl">
          <div className="bg-gradient-to-br from-blue-400 to-purple-600 p-2 rounded-xl">
            <Wallet className="h-5 w-5 text-white" />
          </div>
          Wallet Connection
        </CardTitle>
        <CardDescription className="text-gray-300">
          Connect your Hedera wallet to create subscriptions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!connectedAccount ? (
          <>
            <Button 
              onClick={connectWallet} 
              disabled={isConnecting}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              size="lg"
            >
              {isConnecting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect Wallet
                </>
              )}
            </Button>
            
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-xl border border-red-500/20 backdrop-blur-sm">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
            
            <div className="text-xs text-gray-300 text-center space-y-3 bg-white/5 p-4 rounded-xl border border-white/10">
              <p className="font-semibold text-white">Requirements:</p>
              <div className="text-left space-y-2">
                <p className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                  Install <a href="https://www.hashpack.app/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline transition-colors">HashPack wallet</a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                  Create/Import Hedera Testnet account
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                  Ensure wallet is unlocked
                </p>
              </div>
              <div className="pt-2 border-t border-white/10">
                <p className="text-yellow-400 flex items-center justify-center gap-1">
                  ⚠️ This connects to Hedera Testnet
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-green-400 bg-green-400/10 p-4 rounded-xl border border-green-400/20">
              <div className="bg-green-500 p-2 rounded-full">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white">Wallet Connected</p>
                <p className="text-sm text-green-300">Ready to create subscriptions</p>
              </div>
            </div>
            
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
              <p className="text-sm font-medium text-white mb-1">Account ID:</p>
              <p className="text-sm font-mono text-gray-300 bg-black/20 p-2 rounded-lg border border-white/10">{connectedAccount}</p>
            </div>
            
            <Button 
              onClick={disconnectWallet}
              className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 hover:border-red-500/50 rounded-xl transition-all duration-300 backdrop-blur-sm"
            >
              Disconnect Wallet
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WalletConnect;

