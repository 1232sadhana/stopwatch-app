// Stopwatch.jsx

import { useEffect, useState } from "react";

export default function Stopwatch() {
  const [running, setRunning] = useState(false);
  const [elapseTime, setElapseTime] = useState(0);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setElapseTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  useEffect(() => {
    // Ensure the initial state is set to 0
    setElapseTime(0);
  }, []);

  const startTimer = () => {
    setRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setElapseTime(0);
    setRunning(false);
  };

  const formatTimer = (elapseTime) => {
    let seconds = elapseTime;
    let minutes = Math.floor(seconds / 60);
    let sec = seconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = sec < 10 ? `0${sec}` : sec;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <>
      <h1>Stopwatch</h1>
      <p>{`Time: ${formatTimer(elapseTime)}`}</p>
      <button onClick={startTimer}>{running ? "Stop" : "Start"}</button>
      <button onClick={resetTimer}>Reset</button>
    </>
  );
}
