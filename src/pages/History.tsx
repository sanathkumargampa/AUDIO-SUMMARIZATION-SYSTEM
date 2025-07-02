import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, FileAudio, Clock } from 'lucide-react';

interface HistoryItem {
  id: number;
  filename: string;
  timestamp: string;
  summary: string;
  transcription: string;
}

const History = () => {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    fetch('http://localhost:5050/api/history')
      .then(res => res.json())
      .then(data => {
        const formatted = data.map((item: any, index: number) => ({
          id: index,
          filename: item.filename,
          timestamp: new Date(item.timestamp).toLocaleString(),
          summary: item.summary,
          transcription: item.transcription
        }));
        setHistoryItems(formatted);
      })
      .catch(err => console.error('Failed to fetch history:', err));
  }, []);

  return (
    <div className="pt-24 pb-10 app-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400">
          Summarization History
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Review previously summarized recordings. Transcriptions and summaries are listed below.
        </p>
      </motion.div>

      <div className="space-y-6 max-w-4xl mx-auto">
        {historyItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="glass-panel-dark rounded-xl p-5"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <FileAudio className="text-primary-400" size={20} />
                <span className="text-white font-medium text-lg">{item.filename}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <Clock size={16} />
                <span>{item.timestamp}</span>
              </div>
            </div>

            <div className="mt-3">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="text-secondary-400" size={18} />
                <h4 className="text-white font-semibold">Summary</h4>
              </div>
              <p className="text-gray-300 text-sm whitespace-pre-line">{item.summary}</p>
            </div>

            <div className="mt-4">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="text-accent-400" size={18} />
                <h4 className="text-white font-semibold">Transcription</h4>
              </div>
              <p className="text-gray-400 text-sm whitespace-pre-line">{item.transcription}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default History;