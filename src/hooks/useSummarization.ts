import { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

export const useSummarization = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState<'transcribing' | 'summarizing' | 'completed' | null>(null);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [summary, setSummary] = useState<string>('');
  const [transcription, setTranscription] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Mock processing function since we don't have the actual backend yet
  const processAudio = async (audioFile: File) => {
    setIsProcessing(true);
    setError(null);
    setProcessingStage('transcribing');
    
    try {
      // This is where we would normally upload and process the file with the backend API
      // For now, we'll simulate the process with timeouts
      
      // Simulate transcription progress
      for (let progress = 0; progress <= 50; progress += 5) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setProcessingProgress(progress);
      }
      
      // Simulate transcription completion
      setProcessingStage('summarizing');
      
      // Sample transcription text
      const mockTranscription = "Today we'll be discussing the advancements in artificial intelligence and its applications in everyday life. " +
        "AI has made significant strides in recent years, particularly in the areas of natural language processing and computer vision. " +
        "These technologies have enabled new applications like voice assistants, automated transcription services, and advanced image recognition. " +
        "Companies around the world are investing heavily in AI research and development, with the goal of creating more intuitive and helpful systems. " +
        "However, these developments also raise important ethical considerations regarding privacy, bias, and the future of work. " +
        "It's crucial that we approach AI development with thoughtfulness and care, ensuring that these powerful tools benefit humanity as a whole. " +
        "In the coming years, we'll likely see AI integrated into even more aspects of our daily lives, from healthcare to transportation to education. " +
        "The potential for positive impact is enormous, but so too is the responsibility to develop these technologies responsibly.";
      
      setTranscription(mockTranscription);
      
      // Simulate summarization progress
      for (let progress = 50; progress <= 100; progress += 5) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setProcessingProgress(progress);
      }
      
      // Sample summary text
      const mockSummary = "This audio discusses recent AI advancements in natural language processing and computer vision, " +
        "which have enabled new applications like voice assistants and image recognition. While companies are investing heavily in AI development, " +
        "there are important ethical considerations around privacy, bias, and employment impacts. " +
        "The speaker emphasizes the need for responsible AI development to ensure these technologies benefit humanity as they become more integrated into daily life.";
      
      setSummary(mockSummary);
      setProcessingStage('completed');
      
      // Simulate a slight delay before completing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (err) {
      console.error('Processing error:', err);
      setError('An error occurred while processing your audio file. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Process the audio file when it's set
  useState(() => {
    if (file) {
      processAudio(file);
    }
  });

  // Reset the state to upload a new file
  const resetState = () => {
    setFile(null);
    setIsProcessing(false);
    setProcessingStage(null);
    setProcessingProgress(0);
    setSummary('');
    setTranscription('');
    setError(null);
  };
  
  // Download the summary or transcription in different formats
  const downloadAs = (format: 'txt' | 'pdf' | 'docx') => {
    const text = summary;
    const fileName = file ? file.name.replace(/\.[^/.]+$/, '') : 'summary';
    
    if (format === 'txt') {
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, `${fileName}-summary.txt`);
    } 
    else {
      // In a real application, we would generate PDFs and DOCXs on the server
      // For now, we'll just show an alert
      alert(`Downloading as ${format.toUpperCase()} would be implemented with backend support.`);
    }
  };
  
  return {
    file,
    setFile,
    isProcessing,
    processingStage,
    processingProgress,
    summary,
    transcription,
    error,
    resetState,
    downloadAs
  };
};