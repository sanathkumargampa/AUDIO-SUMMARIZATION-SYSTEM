import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileAudio, AlertCircle } from 'lucide-react';

interface AudioUploaderProps {
  setFile: (file: File) => void;
}

const AudioUploader: React.FC<AudioUploaderProps> = ({ setFile }) => {
  const [error, setError] = React.useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      return;
    }

    const file = acceptedFiles[0];
    
    // Check if the file is an audio file
    if (!file.type.startsWith('audio/')) {
      setError('Please upload an audio file (WAV, MP3, etc.)');
      return;
    }
    
    // Check file size (limit to 25MB)
    if (file.size > 25 * 1024 * 1024) {
      setError('File size exceeds 25MB limit');
      return;
    }
    
    setError(null);
    setFile(file);
  }, [setFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.wav', '.mp3', '.m4a', '.ogg']
    },
    maxFiles: 1
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <div 
        {...getRootProps()} 
        className={`glass-panel rounded-xl p-10 cursor-pointer border-2 border-dashed transition-all duration-300 ${
          isDragActive 
            ? 'border-primary-500 bg-primary-500 bg-opacity-5' 
            : 'border-gray-700 hover:border-primary-500 hover:bg-primary-500 hover:bg-opacity-5'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 p-4 rounded-full bg-primary-500 bg-opacity-10">
            {isDragActive ? (
              <FileAudio className="text-primary-400 animate-pulse" size={32} />
            ) : (
              <UploadCloud className="text-primary-400" size={32} />
            )}
          </div>
          <h3 className="text-xl font-medium mb-2">
            {isDragActive ? 'Drop the audio file here' : 'Upload audio file'}
          </h3>
          <p className="text-gray-400 mb-4 max-w-md">
            Drag and drop your audio file here, or click to browse. We support WAV, MP3, and other audio formats.
          </p>
          <button className="button-primary">
            <UploadCloud size={18} />
            Select Audio File
          </button>
          <p className="text-xs text-gray-500 mt-4">
            Maximum file size: 25MB
          </p>
        </div>
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-red-900 bg-opacity-20 border border-red-700 rounded-lg flex items-center gap-3"
        >
          <AlertCircle className="text-red-500" size={20} />
          <p className="text-red-400">{error}</p>
        </motion.div>
      )}

      <div className="mt-8 p-6 glass-panel-dark rounded-xl">
        <h3 className="text-lg font-medium mb-4">How it works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-primary-500 bg-opacity-20 flex items-center justify-center mb-3">
              <span className="text-primary-400 font-semibold">1</span>
            </div>
            <h4 className="font-medium mb-2">Upload Audio</h4>
            <p className="text-sm text-gray-400">Upload any audio recording you want to transcribe and summarize.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-secondary-500 bg-opacity-20 flex items-center justify-center mb-3">
              <span className="text-secondary-400 font-semibold">2</span>
            </div>
            <h4 className="font-medium mb-2">AI Processing</h4>
            <p className="text-sm text-gray-400">Our AI models transcribe and summarize your audio with high accuracy.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-accent-500 bg-opacity-20 flex items-center justify-center mb-3">
              <span className="text-accent-400 font-semibold">3</span>
            </div>
            <h4 className="font-medium mb-2">Download Results</h4>
            <p className="text-sm text-gray-400">Get your transcription and summary in multiple formats (PDF, TXT, DOCX).</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AudioUploader;