import React, { useEffect, useState } from 'react';
// Make sure you import the CSS

const AnalogClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const hourDeg = (time.getHours() % 12) * 30 + time.getMinutes() * 0.5;
  const minDeg = time.getMinutes() * 6 + time.getSeconds() *0.1;
  const secDeg = time.getSeconds() * 6;
  
  return (
    <div className="clock-wrapper">
      <div className="clock">
       {Array.from({ length: 12 }).map((_, i) => (
  <div
    key={i}
    className="number"
    style={{
      transform: `rotate(${i * 30}deg) translate(0, -62px) rotate(-${i * 30}deg)`
    }}
  >
    {i === 0 ? 12 : i}
  </div>
))}
<div className="hand hour" style={{ transform: `rotate(${hourDeg}deg)` }} />
<div className="hand minute" style={{ transform: `rotate(${minDeg}deg)` }} />
<div className="hand second" style={{ transform: `rotate(${secDeg}deg)` }} />
<div className="center-dot"></div>
</div>
</div>
  );
};

export default AnalogClock;
