import React, { useState, useEffect } from 'react';

const Stopwatch = () => {
  const [running, setRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running]);

  const startTimer = () => {
    setRunning(true);
  };

  const stopTimer = () => {
    setRunning(false);
  };

  const resetTimer = () => {
    setRunning(false);
    setElapsedTime(0);
  };

  const formatTimer = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `Time: ${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div>
      <h1>Stopwatch</h1>
      <p>{formatTimer(elapsedTime)}</p>
      {running ? (
        <button onClick={stopTimer}>Stop</button>
      ) : (
        <button onClick={startTimer}>Start</button>
      )}
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default Stopwatch;
