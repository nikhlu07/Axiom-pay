import { useState } from 'react';
import WalletConnect from './components/WalletConnect.jsx';
import SubscriptionForm from './components/SubscriptionForm.jsx';
import ConfirmationDisplay from './components/ConfirmationDisplay.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Zap, Shield, Clock, DollarSign, Sparkles, Network, TrendingUp } from 'lucide-react';
import './App.css';

function App() {
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [subscriptionData, setSubscriptionData] = useState(null);

  const handleWalletConnected = (accountId) => {
    setConnectedAccount(accountId);
    // Reset subscription data when wallet changes
    if (!accountId) {
      setSubscriptionData(null);
    }
  };

  const handleSubscriptionCreated = (data) => {
    setSubscriptionData(data);
  };

  const handleCreateAnother = () => {
    setSubscriptionData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 group">
              <img 
                src="/axiom.svg" 
                alt="Axiom Pay Logo" 
                className="h-12 w-auto logo-glow transition-all duration-300 group-hover:scale-105" 
              />
              <div>
                <p className="text-sm text-gray-300 font-medium">Decentralized Subscription Payments</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
              <Network className="h-4 w-4" />
              <span>Powered by Hedera</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center relative z-10">
        <div className="animate-fade-in-up">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            The Future of{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient-shift">
              Subscription
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-shift-reverse">
              Payments
            </span>
          </h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto font-light">
              Secure, low-cost, and lightning-fast recurring payments powered by Hedera's revolutionary blockchain technology.
            </p>
            <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
          </div>
          <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
            Break free from centralized payment processors. Take complete control of your subscription ecosystem.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/30 hover:scale-105 transform transition-all duration-300 group">
            <CardContent className="p-6 text-center">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-4 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold mb-2 text-white text-lg">Ultra Secure</h3>
              <p className="text-sm text-gray-300">Military-grade blockchain encryption with cryptographic proof of every transaction</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/30 hover:scale-105 transform transition-all duration-300 group">
            <CardContent className="p-6 text-center">
              <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-4 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold mb-2 text-white text-lg">Micro Fees</h3>
              <p className="text-sm text-gray-300">~$0.0001 transaction costs - we cover all fees so you don't pay anything</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/30 hover:scale-105 transform transition-all duration-300 group">
            <CardContent className="p-6 text-center">
              <div className="bg-gradient-to-br from-purple-400 to-violet-600 p-4 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold mb-2 text-white text-lg">Lightning Fast</h3>
              <p className="text-sm text-gray-300">3-second finality with Hedera's consensus mechanism - faster than credit cards</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/30 hover:scale-105 transform transition-all duration-300 group">
            <CardContent className="p-6 text-center">
              <div className="bg-gradient-to-br from-orange-400 to-pink-600 p-4 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold mb-2 text-white text-lg">Carbon Negative</h3>
              <p className="text-sm text-gray-300">Powered by the most sustainable blockchain - actually removes CO2 from atmosphere</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Application */}
      <section className="container mx-auto px-4 pb-16 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 mb-4">
              <Zap className="h-4 w-4 text-cyan-400" />
              <span className="text-sm font-medium text-white">Ready to revolutionize payments?</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Create Your{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Subscription
              </span>
            </h3>
            <p className="text-gray-300 text-lg">
              Connect your wallet and set up automated HBAR payments in seconds
            </p>
          </div>

          <div className="space-y-6">
            {!subscriptionData ? (
              <>
                <WalletConnect 
                  onWalletConnected={handleWalletConnected}
                  connectedAccount={connectedAccount}
                />
                
                <SubscriptionForm 
                  connectedAccount={connectedAccount}
                  onSubscriptionCreated={handleSubscriptionCreated}
                />
              </>
            ) : (
              <ConfirmationDisplay 
                subscriptionData={subscriptionData}
                onCreateAnother={handleCreateAnother}
              />
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-md border-t border-white/10 text-white py-12 mt-16 relative">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-8 group">
            <img 
              src="/axiom.svg" 
              alt="Axiom Pay Logo" 
              className="h-16 w-auto logo-glow transition-all duration-300 group-hover:scale-110" 
            />
          </div>
          <p className="text-gray-300 mb-6 text-lg max-w-2xl mx-auto">
            Revolutionizing subscription payments with Hedera's next-generation blockchain technology
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm">
            <div className="bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
              🚀 Built for Hedera Hackathon
            </div>
            <div className="bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
              🧪 Testnet Environment
            </div>
            <div className="bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
              🔒 No Real Funds at Risk
            </div>
          </div>
          <div className="text-sm text-gray-400">
            <p>Educational and demonstration purposes only</p>
            <p className="mt-1">© 2025 - Powered by Innovation on Hedera</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

