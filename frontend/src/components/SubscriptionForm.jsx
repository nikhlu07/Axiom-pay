import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { CreditCard, Loader2 } from 'lucide-react';

const SubscriptionForm = ({ connectedAccount, onSubscriptionCreated }) => {
  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState('one-time');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userAccountId: connectedAccount,
          amountHbar: parseFloat(amount),
          frequency: frequency
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        onSubscriptionCreated(data);
        setAmount('');
        setFrequency('one-time');
      } else {
        setError(data.message || 'Failed to create subscription');
      }
    } catch (err) {
      setError('Network error. Please check if the backend is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!connectedAccount) {
    return (
      <Card className="w-full max-w-md mx-auto opacity-50 bg-white/5 backdrop-blur-md border border-white/10">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-gray-400">
            <div className="bg-gray-600 p-2 rounded-xl opacity-50">
              <CreditCard className="h-5 w-5" />
            </div>
            Create Subscription
          </CardTitle>
          <CardDescription className="text-gray-500">
            Connect your wallet first to create a subscription
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300 shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-white text-xl">
          <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-2 rounded-xl">
            <CreditCard className="h-5 w-5 text-white" />
          </div>
          Create Subscription
        </CardTitle>
        <CardDescription className="text-gray-300">
          Set up your HBAR subscription payment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-white font-medium">Amount (HBAR)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="Enter amount in HBAR"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isSubmitting}
              className="bg-white/10 border-white/20 text-white placeholder-gray-400 rounded-xl focus:bg-white/15 focus:border-blue-400 transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="frequency" className="text-white font-medium">Frequency</Label>
            <Select value={frequency} onValueChange={setFrequency} disabled={isSubmitting}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white rounded-xl focus:bg-white/15 focus:border-blue-400 transition-all duration-300">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/20 backdrop-blur-md">
                <SelectItem value="one-time">One-time Payment</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-xl border border-red-500/20 backdrop-blur-sm">
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isSubmitting || !amount}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating Subscription...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4 mr-2" />
                Create Subscription
              </>
            )}
          </Button>

          <div className="text-xs text-gray-300 text-center space-y-2 bg-white/5 p-4 rounded-xl border border-white/10">
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-1">
                <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                <span>Free transaction fees</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                <span>Blockchain secured</span>
              </div>
            </div>
            <p className="text-yellow-400 text-center">🧪 Testnet environment (no real funds)</p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SubscriptionForm;

