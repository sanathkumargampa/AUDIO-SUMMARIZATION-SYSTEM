import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface WaveformVisualizerProps {
  isPlaying: boolean;
}

const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({ isPlaying }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to match its display size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Generate fake waveform data
    const generateWaveformData = () => {
      const data = [];
      const steps = 100;
      for (let i = 0; i < steps; i++) {
        // Create a smooth sine wave with some random variations
        const baseHeight = Math.sin(i / steps * Math.PI * 4) * 0.5 + 0.5;
        const randomVariation = Math.random() * 0.3;
        data.push(baseHeight + randomVariation);
      }
      return data;
    };

    const waveformData = generateWaveformData();
    
    // Draw the waveform
    const drawWaveform = () => {
      if (!ctx) return;
      
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const barWidth = canvas.width / waveformData.length;
      const barMargin = 2;
      const maxBarHeight = canvas.height * 0.8;
      
      // Draw each bar
      waveformData.forEach((value, index) => {
        const height = value * maxBarHeight;
        const x = index * barWidth;
        const y = (canvas.height - height) / 2;
        
        // Create gradient
        const gradient = ctx.createLinearGradient(0, y, 0, y + height);
        gradient.addColorStop(0, '#7dd3fc'); // light blue
        gradient.addColorStop(1, '#0ea5e9'); // medium blue
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x + barMargin/2, y, barWidth - barMargin, height);
      });
    };
    
    drawWaveform();
    
    // Animate the waveform if playing
    let animationId: number;
    if (isPlaying) {
      let step = 0;
      const animate = () => {
        // Shift the waveform data to simulate movement
        const first = waveformData.shift();
        if (first !== undefined) {
          waveformData.push(first);
        }
        
        drawWaveform();
        step++;
        animationId = requestAnimationFrame(animate);
      };
      
      animate();
    }
    
    // Clean up animation on unmount
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPlaying]);
  
  return (
    <div className="relative w-full h-24 mb-2">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isPlaying ? 0.4 : 0 }}
        transition={{ duration: 20, ease: "linear" }}
        className="absolute left-0 top-0 h-full w-full origin-left bg-gradient-to-r from-primary-500 from-0% to-transparent to-5% opacity-20"
      />
    </div>
  );
};

export default WaveformVisualizer;