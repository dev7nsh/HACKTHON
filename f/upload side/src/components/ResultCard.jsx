import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, XCircle, AlertTriangle, Copy, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';

export const ResultCard = ({ isDeepfake, confidence, sourceInfo, context }) => {
  const handleCopyResults = () => {
    const results = {
      status: isDeepfake ? 'Deepfake Detected' : 'Appears Authentic',
      confidence: `${confidence}%`,
      sourceInfo,
      context,
      timestamp: new Date().toISOString()
    };
    
    navigator.clipboard.writeText(JSON.stringify(results, null, 2));
    // You could add a toast notification here
    alert('Results copied to clipboard!');
  };

  const handleNewAnalysis = () => {
    window.location.reload();
  };

  const getStatusIcon = () => {
    if (isDeepfake) {
      return <XCircle className="w-8 h-8 text-red-500" />;
    }
    return <CheckCircle className="w-8 h-8 text-green-500" />;
  };

  const getStatusColor = () => {
    if (isDeepfake) {
      return confidence > 80 ? 'text-red-600' : 'text-orange-600';
    }
    return confidence > 80 ? 'text-green-600' : 'text-yellow-600';
  };

  const getStatusBg = () => {
    if (isDeepfake) {
      return confidence > 80 ? 'bg-red-50 border-red-200' : 'bg-orange-50 border-orange-200';
    }
    return confidence > 80 ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200';
  };

  const getConfidenceColor = () => {
    if (confidence > 80) return 'bg-green-500';
    if (confidence > 60) return 'bg-yellow-500';
    if (confidence > 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getConfidenceLabel = () => {
    if (confidence > 80) return 'Very Confident';
    if (confidence > 60) return 'Moderately Confident';
    return 'Low Confidence';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
    >
      {/* Status Header */}
      <div className={`p-6 border-b border-gray-200 ${getStatusBg()}`}>
        <div className="flex items-center gap-4">
          {getStatusIcon()}
          <div className="flex-1">
            <h3 className={`text-xl font-bold ${getStatusColor()}`}>
              {isDeepfake ? 'Deepfake Detected' : 'Appears Authentic'}
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              {isDeepfake 
                ? 'This media shows signs of AI manipulation' 
                : 'This media appears to be genuine'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Confidence Score */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Confidence Score</span>
            <div className="flex items-center gap-2">
              <span className={`text-lg font-bold ${getStatusColor()}`}>
                {confidence}%
              </span>
              <span className="text-xs text-gray-500">({getConfidenceLabel()})</span>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${confidence}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                className={`h-3 rounded-full ${getConfidenceColor()}`}
              />
            </div>
          </div>
        </div>

        {/* Source Analysis */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-blue-600" />
            Source Analysis
          </h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700 text-sm leading-relaxed">
              {sourceInfo}
            </p>
          </div>
        </div>

        {/* Context */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-900">Context & Details</h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700 text-sm leading-relaxed">
              {context}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            onClick={handleNewAnalysis}
            variant="outline"
            className="flex-1"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            New Analysis
          </Button>
          <Button
            onClick={handleCopyResults}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Results
          </Button>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Analysis completed at {new Date().toLocaleTimeString()}</span>
          <span>Powered by AI Detection</span>
        </div>
      </div>
    </motion.div>
  );
};
