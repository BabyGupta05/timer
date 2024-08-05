import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [time, setTime] = useState(10);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let id;
    if (running && time > 0) {
      id = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    if (time <= 0) {
      setRunning(false);
    }
    return () => clearInterval(id);
  }, [running, time]);

  const handleStart = () => {
    if (!running) {
      setRunning(true);
    }
  };

  const handleReset = useCallback(() => {
    if (running) {
      setRunning(false);
    }
    setTime(10);
  }, [running]);

  const handleStop = useCallback(() => {
    if (running) {
      setRunning(false);
    }
  }, [running]);

  return (
    <div>
      <h1 className="font-bold text-9xl">{time}</h1>
      <div className="flex gap-10">
        <button onClick={handleStart}>start</button>
        <button onClick={handleReset}>reset</button>
        <button onClick={handleStop}>stop</button>
      </div>
    </div>
  );
}

export default App;
