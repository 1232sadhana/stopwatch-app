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

  const startTimer = () => {
    setRunning(true);
  };

  const resetTimer = () => {
    setElapseTime(0);
    setRunning(false);
  };

  const formatTimer = (elapseTime) => {
    const minutes = Math.floor(elapseTime / 60);
    const seconds = elapseTime % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <>
      <h1>Stopwatch</h1>
      <p>Time: {formatTimer(elapseTime)}</p>
      <button onClick={running ? resetTimer : startTimer}>{running ? "Stop" : "Start"}</button>
      {elapseTime > 0 && !running && (
        <button onClick={resetTimer} disabled={running}>
          Reset
        </button>
      )}
    </>
  );
}
