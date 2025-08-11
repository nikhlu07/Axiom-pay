import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { CheckCircle, ExternalLink, Copy, Calendar, DollarSign } from 'lucide-react';
import { useState } from 'react';

const ConfirmationDisplay = ({ subscriptionData, onCreateAnother }) => {
  const [copied, setCopied] = useState(false);

  if (!subscriptionData) {
    return null;
  }

  const copyScheduleId = async () => {
    try {
      await navigator.clipboard.writeText(subscriptionData.scheduleId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-md border border-green-400/30 shadow-2xl">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-4 rounded-full shadow-lg animate-pulse">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-white mb-2">
          🎉 Subscription Created!
        </CardTitle>
        <CardDescription className="text-green-200 text-lg">
          Your payment has been successfully scheduled on the Hedera blockchain
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
            <div className="flex items-center gap-2 text-sm font-medium text-white mb-2">
              <div className="bg-blue-500 p-1 rounded-md">
                <Calendar className="h-3 w-3 text-white" />
              </div>
              Schedule ID
            </div>
            <div className="flex items-center gap-2">
              <code className="text-sm font-mono bg-black/30 text-green-300 px-3 py-2 rounded-lg flex-1 break-all">
                {subscriptionData.scheduleId}
              </code>
              <Button
                size="sm"
                onClick={copyScheduleId}
                className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 rounded-lg transition-all duration-300"
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            {copied && (
              <div className="text-xs text-green-300 mt-2 flex items-center gap-1">
                ✓ Copied to clipboard!
              </div>
            )}
          </div>

          {subscriptionData.frequency && (
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
              <div className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                <div className="bg-green-500 p-1 rounded-md">
                  <DollarSign className="h-3 w-3 text-white" />
                </div>
                Payment Details
              </div>
              <div className="text-sm text-green-300">
                Frequency: <span className="font-semibold">{subscriptionData.frequency}</span>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Button
            onClick={() => window.open(subscriptionData.hashscanUrl, '_blank')}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            🔍 View on HashScan
          </Button>

          <Button
            onClick={onCreateAnother}
            className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 rounded-xl transition-all duration-300 backdrop-blur-sm"
          >
            ➕ Create Another Subscription
          </Button>
        </div>

        <div className="text-xs text-gray-300 text-center space-y-2 bg-white/5 p-4 rounded-xl border border-white/10">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-1">
              <span className="text-green-400">✓</span>
              <span>Scheduled Successfully</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-blue-400">✓</span>
              <span>Blockchain Verified</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-1">
            <span className="text-purple-400">✓</span>
            <span>Zero Fees for Users</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfirmationDisplay;

