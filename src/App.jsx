import { useCallback, useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { MultiSectionDigitalClock } from "@mui/x-date-pickers/MultiSectionDigitalClock";
import dayjs from "dayjs";

function App() {
  const [selectedTime, setSelectedTime] = useState(
    dayjs().hour(0).minute(0).second(0)
  );
  const [initialTime, setInitialTime] = useState(
    dayjs().hour(0).minute(0).second(0)
  );
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let id;
    if (running && selectedTime.diff(dayjs().startOf("day"), "second") > 0) {
      id = setInterval(() => {
        setSelectedTime((prevTime) => prevTime.subtract(1, "second"));
      }, 1000);
    } else if (selectedTime.diff(dayjs().startOf("day"), "second") <= 0) {
      setRunning(false);
    }
    return () => clearInterval(id);
  }, [running, selectedTime]);

  const handleStart = () => {
    if (!running && selectedTime.diff(dayjs().startOf("day"), "second") > 0) {
      setRunning(true);
    }
  };

  const handleReset = useCallback(() => {
    setRunning(false);
    setSelectedTime(initialTime);
  }, [initialTime]);

  const handleStop = useCallback(() => {
    setRunning(false);
  }, []);

  const handleTimeChange = (newTime) => {
      setSelectedTime(newTime);
      setInitialTime(newTime);
      setRunning(false)
  };

  return (
    <div className="grid place-items-center h-screen bg-blue-100">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["MultiSectionDigitalClock"]}>
          <MultiSectionDigitalClock
            timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
            views={["hours", "minutes", "seconds"]}
            value={initialTime}
            onChange={handleTimeChange}
            ampm={false}
          />
        </DemoContainer>
      </LocalizationProvider>
      <h1 className="font-bold text-9xl">{selectedTime.format("HH:mm:ss")}</h1>
      <div className="flex gap-10">
        <button onClick={handleStart}>start</button>
        <button onClick={handleReset}>reset</button>
        <button onClick={handleStop}>stop</button>
      </div>
    </div>
  );
}

export default App;
