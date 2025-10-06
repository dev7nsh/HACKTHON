import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sun, CheckCircle2, AlertTriangle, RefreshCw, Copy, X, Info } from 'lucide-react';
import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { analyzeWithGemini } from './api/gemini';
import { BackgroundLines } from './components/BackgroundLines';

// Utility function
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Progress Component
const Progress = React.forwardRef(({ className, value, indicatorClassName, ...props }, ref) => {
  return (
    <ProgressPrimitive.Root
      ref={ref}
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          "bg-primary h-full w-full flex-1 transition-all",
          indicatorClassName
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = "Progress";

// Badge Component
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

// Header Component
function Header({ theme, onThemeToggle }) {
  const handleNavClick = (section) => {
    // You can implement navigation logic here
    console.log(`Navigating to: ${section}`);
  };

  return (
    <header className="w-full bg-background border border-border fixed top-0 left-0 z-50 backdrop-blur-sm">
      <div className="flex h-[60px] items-center justify-between px-6">
        {/* Logo + Name */}
        <div className="flex items-center gap-2">
          <div
            className={`deepfake-logo font-extrabold text-2xl tracking-wide select-none ${
              theme === 'light'
                ? 'text-gray-900'
                : 'text-white'
            }`}
            style={{
              textShadow: theme === 'light' ? 'none' : '0 2px 8px rgba(0,0,0,0.25)'
            }}
          >
            DeepFake
          </div>
        </div>

        {/* Right - Theme Toggle & Online Status */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={onThemeToggle}
            className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-foreground" />
            ) : (
              <Moon className="w-5 h-5 text-foreground" />
            )}
          </button>

          {/* Online Status */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-600 text-sm font-medium">AI Online</span>
          </div>
        </div>
      </div>
    </header>
  );
}

// DropZone Component
function DropZone({ onFileSelect, selectedFile }) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  }, []);

  const handleFileSelection = (file) => {
    const validTypes = ['image/', 'video/', 'audio/'];
    const isValid = validTypes.some(type => file.type.startsWith(type));
    
    if (isValid && file.size <= 10 * 1024 * 1024) { // 10MB limit
      onFileSelect(file);
      
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
    } else {
      alert('Please select a valid media file under 10MB');
    }
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleClick = () => {
    if (!selectedFile) {
      document.getElementById('file-upload-input')?.click();
    }
  };

  // Clear preview URL when file changes
  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
    }
  }, [selectedFile]);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`relative flex flex-col items-center justify-center min-h-[500px] rounded-2xl transition-all ${
        selectedFile 
          ? 'border-2 border-primary/40 bg-transparent cursor-default' 
          : `border-4 border-dashed cursor-pointer ${isDragging ? 'border-primary bg-primary/5' : 'border-primary/40 bg-transparent'}`
      }`}
    >
      <input
        type="file"
        id="file-upload-input"
        className="hidden"
        accept="image/*,video/*,audio/*"
        onChange={handleFileInputChange}
      />

      {selectedFile && previewUrl ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center w-full h-full p-4"
        >
          {selectedFile.type.startsWith('image/') && (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-contain rounded-lg max-h-[600px]"
            />
          )}
          {selectedFile.type.startsWith('video/') && (
            <video
              src={previewUrl}
              controls
              className="w-full h-full object-contain rounded-lg max-h-[600px]"
            />
          )}
        </motion.div>
      ) : selectedFile ? (
        <div className="text-center space-y-4 px-8">
          <div className="text-6xl">🎵</div>
          <p className="text-xl text-foreground font-medium">{selectedFile.name}</p>
          <p className="text-muted-foreground">Audio file ready for analysis</p>
        </div>
      ) : (
        <div className="text-center space-y-4 px-8">
          <p className="text-2xl text-foreground font-semibold">Drag and Drop</p>
          <p className="text-foreground">
            or <span className="underline text-primary cursor-pointer">upload</span> your media here
          </p>
          <p className="text-muted-foreground">We support all image, video, and audio file formats (max 10MB)</p>
        </div>
      )}
    </div>
  );
}

// ResultCard Component
function ResultCard({ isAnalyzing, hasResult, result, onNewAnalysis, error }) {
  const handleCopyResults = () => {
    if (!result) return;
    
    const results = `Analysis Result: ${result.isDeepfake ? 'Deepfake Detected' : 'Appears Authentic'}
Confidence Score: ${result.confidence}%
Source: ${result.sourceInfo}
Context: ${result.context}
Timestamp: ${new Date().toISOString()}`;
    
    navigator.clipboard.writeText(results);
    alert('Results copied to clipboard!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl shadow-xl overflow-hidden border border-border"
    >
      <div className="p-8 space-y-6">
        {isAnalyzing ? (
          <div className="text-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              <RefreshCw className="w-12 h-12 text-primary" />
            </motion.div>
            <p className="mt-4 text-card-foreground">Analyzing media with AI...</p>
            <p className="text-muted-foreground text-sm mt-2">This may take a few moments</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Analysis Failed</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <button
              onClick={onNewAnalysis}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : hasResult && result ? (
          <>
            {/* Result Header */}
            <div className="flex items-start gap-3">
              {!result.isDeepfake ? (
                <CheckCircle2 className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" />
              ) : (
                <AlertTriangle className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
              )}
              <div>
                <h2 className="text-xl font-bold text-foreground mb-1">
                  {!result.isDeepfake ? 'Appears Authentic' : 'Deepfake Detected'}
                </h2>
                <p className="text-muted-foreground">
                  This media appears to be {!result.isDeepfake ? 'genuine' : 'AI-generated or manipulated'}
                </p>
              </div>
            </div>

            {/* Confidence Score */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-foreground font-medium">Confidence Score</span>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-primary">{result.confidence}%</span>
                  <span className="text-muted-foreground text-sm">
                    ({result.confidence > 80 ? 'Very Confident' : result.confidence > 60 ? 'Confident' : 'Low Confidence'})
                  </span>
                </div>
              </div>
              <Progress value={result.confidence} className="h-3" />
            </div>

            {/* Source Analysis */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <span>Source Analysis</span>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-muted-foreground">{result.sourceInfo}</p>
              </div>
            </div>

            {/* Context & Details */}
            <div className="space-y-3">
              <h3 className="text-foreground font-medium">Context & Details</h3>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-muted-foreground leading-relaxed">
                  {result.context}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={onNewAnalysis}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-all"
              >
                <RefreshCw className="w-5 h-5" />
                New Analysis
              </button>
              <button
                onClick={handleCopyResults}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all"
              >
                <Copy className="w-5 h-5" />
                Copy Results
              </button>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Analysis completed at {new Date().toLocaleTimeString()}
              </p>
              <p className="text-xs text-muted-foreground">Made with love ❤️</p>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-foreground font-medium">Upload media to see analysis results</p>
            <p className="text-muted-foreground text-sm mt-2">Supports images, videos, and audio files</p>
            
            {/* Prototype Notice */}
            <div className="mt-6 p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border border-amber-200 dark:border-amber-800 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <Info className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-1">
                    🚧 Prototype Notice
                  </h4>
                  <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
                    This is not the final outcome of LLM. It's under maintenance as we are relying on AI detection for this prototype.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Main App Component
export default function App() {
  const [theme, setTheme] = useState('light');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Apply theme class to document root
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleFileSelect = async (file) => {
    setSelectedFile(file);
    setIsAnalyzing(true);
    setHasResult(false);
    setResult(null);
    setError(null);
    
    try {
      // Use real Gemini API
      const apiResult = await analyzeWithGemini(file);
      
      // Transform API result to match UI interface
      const transformedResult = {
        isDeepfake: apiResult.deepfake_status === 'deepfake',
        confidence: Math.round(apiResult.confidence * 100),
        sourceInfo: apiResult.source,
        context: apiResult.context
      };

      setResult(transformedResult);
      setHasResult(true);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.message || 'Failed to analyze the file. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNewAnalysis = () => {
    setSelectedFile(null);
    setHasResult(false);
    setIsAnalyzing(false);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Animated Background Lines */}
      <div className='absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none'>
        <BackgroundLines />
      </div>

      <Header theme={theme} onThemeToggle={toggleTheme} />

      <div className="container mx-auto px-6 py-8 pt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Upload Area */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <DropZone onFileSelect={handleFileSelect} selectedFile={selectedFile} />
          </motion.div>

          {/* Right Column - Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ResultCard
              isAnalyzing={isAnalyzing}
              hasResult={hasResult}
              result={result}
              onNewAnalysis={handleNewAnalysis}
              error={error}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
