import React, { useState, useEffect } from 'react';
import { FaPlay, FaStop, FaRedo } from 'react-icons/fa';

const TemporalTools = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (s) => `${String(Math.floor(s / 3600)).padStart(2, '0')}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="glass-card">
      <h2 className="section-title">
        <span className="dot red" /> Start Your Journey
      </h2>
      <div className="stopwatch">
        <div className="time">{formatTime(time)}</div>
       
        <div className="buttons">
  <button title="Start" onClick={() => setRunning(true)}><FaPlay /></button>
  <button title="Stop" onClick={() => setRunning(false)}><FaStop /></button>
  <button title="Reset" onClick={() => { setRunning(false); setTime(0); }}><FaRedo /></button>
</div>
      </div>
    </div>
  );
};

export default TemporalTools;
