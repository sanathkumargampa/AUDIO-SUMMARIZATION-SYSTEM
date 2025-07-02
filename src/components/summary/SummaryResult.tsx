import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, FileCheck, Copy, Check } from 'lucide-react';

interface SummaryResultProps {
  summary: string;
  transcription: string;
}

const SummaryResult: React.FC<SummaryResultProps> = ({ summary, transcription }) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'transcription'>('summary');
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [copiedTranscription, setCopiedTranscription] = useState(false);

  const copyToClipboard = async (text: string, type: 'summary' | 'transcription') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'summary') {
        setCopiedSummary(true);
        setTimeout(() => setCopiedSummary(false), 2000);
      } else {
        setCopiedTranscription(true);
        setTimeout(() => setCopiedTranscription(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-panel-dark rounded-xl p-6 max-w-4xl mx-auto"
    >
      <div className="flex border-b border-gray-700 mb-6">
        <button
          className={`px-4 py-3 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'summary' 
              ? 'border-primary-500 text-primary-400' 
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('summary')}
        >
          <FileCheck size={18} />
          <span>Summary</span>
        </button>
        <button
          className={`px-4 py-3 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'transcription' 
              ? 'border-primary-500 text-primary-400' 
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('transcription')}
        >
          <FileText size={18} />
          <span>Full Transcription</span>
        </button>
      </div>

      <div className="relative">
        {activeTab === 'summary' ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-lg">Summary</h3>
              <button
                onClick={() => copyToClipboard(summary, 'summary')}
                className="button-ghost !py-1 !px-3 text-sm"
              >
                {copiedSummary ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedSummary ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <div className="bg-dark-200 p-4 rounded-lg leading-relaxed max-h-96 overflow-y-auto">
              {summary || "The AI-generated summary will appear here."}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-lg">Full Transcription</h3>
              <button
                onClick={() => copyToClipboard(transcription, 'transcription')}
                className="button-ghost !py-1 !px-3 text-sm"
              >
                {copiedTranscription ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedTranscription ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <div className="bg-dark-200 p-4 rounded-lg leading-relaxed max-h-96 overflow-y-auto">
              {transcription || "The full transcription will appear here."}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SummaryResult;