import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

const CNCLogo = () => (
  <div className="flex flex-col items-center">
    <div className="text-3xl font-bold tracking-tight">
      <span className="text-black">C</span>
      <span className="text-[#2171e8]">N</span>
      <span className="text-black">C</span>
    </div>
    <div className="text-sm font-semibold tracking-widest text-black">INSIGHT</div>
    <div className="text-xs text-gray-500">EST 2020</div>
  </div>
);

const CNCInterface = () => {
  const [status, setStatus] = useState('disconnected');
  const [error, setError] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);

  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'connecting':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleConnect = async () => {
    setLoading(true);
    setStatus('connecting');
    setError(null);

    try {
      // Simulate connection to Python backend
      // Replace with actual API call to your Python backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('connected');
      
      // Mock metrics data - replace with actual data from backend
      setMetrics({
        error_stats: {
          total_errors: 0,
          errors_by_type: {},
          last_error_timestamp: null
        },
        system_health: {
          status: 'operational',
          connection_active: true,
          port: '/dev/ttyUSB0',
          baud_rate: 115200
        }
      });
    } catch (err) {
      setError(err.message || 'Failed to connect');
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <CNCLogo />
      </div>
      
      <Card className="border-[#2171e8]/10">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Machine Control
            <Badge 
              variant="outline" 
              className={`${getStatusColor()} text-white`}
            >
              {status.toUpperCase()}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Connection Control */}
            <div className="flex justify-between items-center">
              <Button
                onClick={handleConnect}
                disabled={loading || status === 'connected'}
                className="w-32 bg-[#2171e8] hover:bg-[#2171e8]/90"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting
                  </>
                ) : (
                  'Connect'
                )}
              </Button>
              
              {status === 'connected' && (
                <div className="flex items-center text-green-600">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Connected successfully
                </div>
              )}
            </div>

            {/* Error Display */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* System Metrics */}
            {metrics && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">System Metrics</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <Card className="border-[#2171e8]/10">
                    <CardHeader>
                      <CardTitle className="text-sm">Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-[#2171e8]">
                        {metrics.system_health.status}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-[#2171e8]/10">
                    <CardHeader>
                      <CardTitle className="text-sm">Total Errors</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-[#2171e8]">
                        {metrics.error_stats.total_errors}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-[#2171e8]/10">
                    <CardHeader>
                      <CardTitle className="text-sm">Port</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg text-[#2171e8]">
                        {metrics.system_health.port}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-[#2171e8]/10">
                    <CardHeader>
                      <CardTitle className="text-sm">Baud Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg text-[#2171e8]">
                        {metrics.system_health.baud_rate}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CNCInterface;