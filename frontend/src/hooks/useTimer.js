import { useState, useEffect, useRef } from "react";

const useTimer = (userInput) => {
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [cpm, setCpm] = useState(0);
  const [complete, setComplete] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (elapsedTime !== 0) calcCpm();
  }, [elapsedTime]);

  const startTimer = () => {
    const start = Date.now();
    setStartTime(start);
    const interval = setInterval(() => {
      const currentTime = Date.now();
      setElapsedTime((currentTime - start) / 1000);
    }, 10);
    timerRef.current = interval;
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setComplete(true);
  };

  const reset = () => {
    stopTimer();
    setComplete(false);
    setElapsedTime(0);
    setStartTime(null);
    setCpm(0);
  };

  const calcCpm = () => {
    const currentTime = Date.now();
    const minutes = (currentTime - startTime) / 60000;
    setCpm(Math.round(userInput.length / minutes));
  };

  return {
    elapsedTime,
    cpm,
    complete,
    startTime,
    reset,
    startTimer,
    stopTimer,
  };
};

export default useTimer