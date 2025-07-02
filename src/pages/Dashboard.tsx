import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  UploadCloud, FileAudio, Play, Pause, Download,
  FileText, FileImage, Clock
} from 'lucide-react';
import AudioUploader from '../components/audio/AudioUploader';
import ProcessingStatus from '../components/audio/ProcessingStatus';
import SummaryResult from '../components/summary/SummaryResult';
import WaveformVisualizer from '../components/audio/WaveformVisualizer';

const Dashboard = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState("Uploading...");
  const [summary, setSummary] = useState<string | null>(null);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (file && audioRef.current) {
      audioRef.current.src = URL.createObjectURL(file);
    }
  }, [file]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const resetState = () => {
    setFile(null);
    setIsProcessing(false);
    setProcessingStage("Uploading...");
    setSummary(null);
    setTranscription(null);
    setError(null);
    setIsPlaying(false);
  };

  const downloadAs = (format: 'txt' | 'pdf' | 'docx') => {
    const element = document.createElement('a');
    let content = `Summary:\n${summary}\n\nTranscription:\n${transcription}`;
    let blob: Blob;

    switch (format) {
      case 'txt':
        blob = new Blob([content], { type: 'text/plain' });
        element.download = 'summary.txt';
        break;
      case 'pdf':
        blob = new Blob([content], { type: 'application/pdf' });
        element.download = 'summary.pdf';
        break;
      case 'docx':
        blob = new Blob([content], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        element.download = 'summary.docx';
        break;
    }

    element.href = URL.createObjectURL(blob);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleFileUpload = async (uploadedFile: File) => {
    setFile(uploadedFile);
    setIsProcessing(true);
    setError(null);
    setProcessingStage("Uploading...");

    const formData = new FormData();
    formData.append('file', uploadedFile);

    try {
      const response = await fetch('http://localhost:5050/summarize', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unknown error');
      }

      setProcessingStage("Complete");
      setSummary(data.summary);
      setTranscription(data.transcription);
    } catch (err: any) {
      setError(err.message || 'Upload or processing failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="pt-24 pb-10 app-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400">
          Audio Summarization System
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Upload your audio recordings and get instant AI-powered transcriptions and summaries.
          Download your results in multiple formats.
        </p>
      </motion.div>

      {!file && !summary && (
        <AudioUploader setFile={handleFileUpload} />
      )}

      {file && !summary && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-panel-dark rounded-xl p-6 max-w-3xl mx-auto"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-full bg-primary-500 bg-opacity-20">
              <FileAudio className="text-primary-400" size={24} />
            </div>
            <div>
              <h3 className="font-medium text-white">{file.name}</h3>
              <p className="text-sm text-gray-400">
                {(file.size / (1024 * 1024)).toFixed(2)} MB · Audio File
              </p>
            </div>
          </div>

          <ProcessingStatus 
            isProcessing={isProcessing} 
            stage={processingStage} 
            progress={100} 
          />

          {error && (
            <div className="mt-6 p-4 bg-red-900 bg-opacity-20 border border-red-700 rounded-lg">
              <p className="text-red-400">{error}</p>
              <button 
                onClick={resetState}
                className="mt-3 button-ghost text-sm"
              >
                Try Again
              </button>
            </div>
          )}
        </motion.div>
      )}

      {summary && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="glass-panel-dark rounded-xl p-6 max-w-4xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePlayPause}
                  className="p-3 rounded-full bg-primary-600 hover:bg-primary-700 transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <div>
                  <h3 className="font-medium text-white">{file?.name}</h3>
                  <p className="text-sm text-gray-400 flex items-center gap-1">
                    <Clock size={14} />
                    <span>0:00</span>
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => downloadAs("txt")} className="button-ghost !p-2" title="Download as Text">
                  <FileText size={18} />
                </button>
                <button onClick={() => downloadAs("pdf")} className="button-ghost !p-2" title="Download as PDF">
                  <FileImage size={18} />
                </button>
                <button onClick={() => downloadAs("docx")} className="button-ghost !p-2" title="Download as Word Document">
                  <Download size={18} />
                </button>
              </div>
            </div>

            <audio ref={audioRef} className="hidden" />

            <WaveformVisualizer isPlaying={isPlaying} />
          </div>

          <SummaryResult summary={summary} transcription={transcription} />

          <div className="text-center mt-10">
            <button onClick={resetState} className="button-secondary">
              <UploadCloud size={18} />
              Process New Audio
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;