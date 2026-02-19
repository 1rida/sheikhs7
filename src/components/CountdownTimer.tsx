'use client';

import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string; // ISO 8601 string, e.g., "2026-03-01T00:00:00Z"
}

const calculateTimeLeft = (targetDate: string) => {
  const difference = +new Date(targetDate) - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearTimeout(timer);
  }, [targetDate, timeLeft]);

  const formatTime = () => {
    const parts = [];
    if (timeLeft.days !== undefined) parts.push(String(timeLeft.days).padStart(2, '0'));
    if (timeLeft.hours !== undefined) parts.push(String(timeLeft.hours).padStart(2, '0'));
    if (timeLeft.minutes !== undefined) parts.push(String(timeLeft.minutes).padStart(2, '0'));
    if (timeLeft.seconds !== undefined) parts.push(String(timeLeft.seconds).padStart(2, '0'));
    return parts.join(':');
  };

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center shadow-inner">
      {Object.keys(timeLeft).length ? (
        <>
          <p className="text-lg font-semibold text-gray-700 mb-2">Offer Ends In:</p>
          <div className="text-xl font-bold text-gray-600">{formatTime()}</div>
        </>
      ) : (
        <p className="text-lg font-semibold text-gray-700">Offer has expired!</p>
      )}
    </div>
  );
};

export default CountdownTimer;
