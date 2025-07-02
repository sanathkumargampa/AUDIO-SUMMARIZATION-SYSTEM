import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Cpu, FileText, Clock, RefreshCw } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    transcriptionModel: 'whisper-medium',
    summarizationModel: 'pegasus-large',
    maxAudioLength: 60,
    parallelProcessing: true,
    summarizationLength: 'medium',
    autoSave: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setSettings({
      ...settings,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save settings logic would go here
    alert('Settings saved successfully!');
  };

  return (
    <div className="pt-24 pb-10 app-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-gray-400">
          Configure your audio processing preferences.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="glass-panel-dark rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-full bg-primary-500 bg-opacity-20">
                <Cpu className="text-primary-400" size={20} />
              </div>
              <h3 className="text-xl font-medium">AI Model Settings</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="transcriptionModel" className="block text-sm font-medium text-gray-300 mb-2">
                  Transcription Model
                </label>
                <select
                  id="transcriptionModel"
                  name="transcriptionModel"
                  value={settings.transcriptionModel}
                  onChange={handleChange}
                  className="input-field w-full"
                >
                  <option value="whisper-small">Whisper Small (Faster)</option>
                  <option value="whisper-medium">Whisper Medium (Balanced)</option>
                  <option value="whisper-large">Whisper Large (Highest Quality)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  The model used for transcribing audio to text.
                </p>
              </div>

              <div>
                <label htmlFor="summarizationModel" className="block text-sm font-medium text-gray-300 mb-2">
                  Summarization Model
                </label>
                <select
                  id="summarizationModel"
                  name="summarizationModel"
                  value={settings.summarizationModel}
                  onChange={handleChange}
                  className="input-field w-full"
                >
                  <option value="pegasus-small">Pegasus Small (Faster)</option>
                  <option value="pegasus-medium">Pegasus Medium (Balanced)</option>
                  <option value="pegasus-large">Pegasus Large (Highest Quality)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  The model used for summarizing transcribed text.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-panel-dark rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-full bg-secondary-500 bg-opacity-20">
                <FileText className="text-secondary-400" size={20} />
              </div>
              <h3 className="text-xl font-medium">Processing Options</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="summarizationLength" className="block text-sm font-medium text-gray-300 mb-2">
                  Summary Length
                </label>
                <select
                  id="summarizationLength"
                  name="summarizationLength"
                  value={settings.summarizationLength}
                  onChange={handleChange}
                  className="input-field w-full"
                >
                  <option value="short">Short (Concise)</option>
                  <option value="medium">Medium (Balanced)</option>
                  <option value="long">Long (Detailed)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Controls how long the generated summary will be.
                </p>
              </div>

              <div>
                <label htmlFor="maxAudioLength" className="block text-sm font-medium text-gray-300 mb-2">
                  Maximum Audio Length (minutes)
                </label>
                <input
                  type="number"
                  id="maxAudioLength"
                  name="maxAudioLength"
                  value={settings.maxAudioLength}
                  onChange={handleChange}
                  min="1"
                  max="180"
                  className="input-field w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Maximum audio length that can be processed (1-180 minutes).
                </p>
              </div>
            </div>
          </div>

          <div className="glass-panel-dark rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-full bg-accent-500 bg-opacity-20">
                <RefreshCw className="text-accent-400" size={20} />
              </div>
              <h3 className="text-xl font-medium">System Settings</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="parallelProcessing"
                  name="parallelProcessing"
                  checked={settings.parallelProcessing}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-600 text-primary-600 focus:ring-primary-500 bg-dark-100"
                />
                <label htmlFor="parallelProcessing" className="ml-2 block text-sm font-medium text-gray-300">
                  Enable Parallel Processing
                </label>
                <p className="text-xs text-gray-500 mt-1 ml-6">
                  Use multiple CPU cores to speed up processing.
                </p>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoSave"
                  name="autoSave"
                  checked={settings.autoSave}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-600 text-primary-600 focus:ring-primary-500 bg-dark-100"
                />
                <label htmlFor="autoSave" className="ml-2 block text-sm font-medium text-gray-300">
                  Auto-Save Results
                </label>
                <p className="text-xs text-gray-500 mt-1 ml-6">
                  Automatically save processing results to history.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              type="submit" 
              className="button-primary"
            >
              <Save size={18} />
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;