import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    // Ensure the initial state is set to 0
    setElapsedTime(0);
  }, []);

  const startTimer = () => {
    setRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setElapsedTime(0);
    setRunning(false);
  };

  const formatTimer = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `Time: ${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <>
      <h1>Stopwatch</h1>
      <p>{formatTimer(elapsedTime)}</p>
      <button onClick={startTimer}>{running ? "Stop" : "Start"}</button>
      <button onClick={resetTimer}>Reset</button>
    </>
  );
};

export default Stopwatch;

