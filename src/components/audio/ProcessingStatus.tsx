import React from 'react';
import { motion } from 'framer-motion';
import { Mic, FileText, FileCheck, UserCircle as LoaderCircle } from 'lucide-react';

interface ProcessingStatusProps {
  isProcessing: boolean;
  stage: 'transcribing' | 'summarizing' | 'completed' | null;
  progress: number;
}

const ProcessingStatus: React.FC<ProcessingStatusProps> = ({ 
  isProcessing, 
  stage, 
  progress 
}) => {
  const stages = [
    { id: 'transcribing', label: 'Transcribing Audio', icon: <Mic size={18} /> },
    { id: 'summarizing', label: 'Summarizing Content', icon: <FileText size={18} /> },
    { id: 'completed', label: 'Processing Complete', icon: <FileCheck size={18} /> },
  ];

  const currentStageIndex = stages.findIndex(s => s.id === stage);

  return (
    <div className="mt-2">
      <div className="mb-3 flex justify-between items-center">
        <h4 className="font-medium">Processing Status</h4>
        <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
      </div>

      <div className="relative mb-8">
        <div className="absolute left-0 right-0 h-1 bg-gray-700 rounded-full">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="absolute left-0 h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
          />
        </div>
        
        <div className="relative flex justify-between mt-6">
          {stages.map((s, index) => {
            // Determine if this stage is complete, active, or pending
            const isComplete = currentStageIndex > index;
            const isActive = currentStageIndex === index;
            const isPending = currentStageIndex < index;
            
            return (
              <div key={s.id} className="flex flex-col items-center">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ 
                    scale: isActive ? 1.1 : 1, 
                    opacity: isPending ? 0.5 : 1 
                  }}
                  className={`relative w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                    isComplete 
                      ? 'bg-primary-500' 
                      : isActive 
                        ? 'bg-primary-500 animate-pulse-slow' 
                        : 'bg-gray-700'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0"
                    >
                      <LoaderCircle className="w-full h-full text-primary-300" />
                    </motion.div>
                  )}
                  <span className="relative z-10">{s.icon}</span>
                </motion.div>
                <p className={`text-xs text-center ${
                  isActive ? 'text-primary-400 font-medium' : isPending ? 'text-gray-500' : 'text-gray-300'
                }`}>
                  {s.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-center text-sm text-gray-400">
        {isProcessing ? (
          <p>Please wait while we process your audio file. This may take a few minutes depending on the file size.</p>
        ) : (
          <p>Ready to process your audio file.</p>
        )}
      </div>
    </div>
  );
};

export default ProcessingStatus;