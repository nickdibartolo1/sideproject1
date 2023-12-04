/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const Timer = ({ startOnTimer }) => {
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let increaseTime;

    if (timerActive) {
      increaseTime = setTimeout(() => {
         setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearTimeout(increaseTime);
    };
  }, [time, timerActive]);

  useEffect(() => {
    console.warn('startOnTimer changed:', startOnTimer);
    if (startOnTimer) {
      setTimerActive(true);
    }
  }, [startOnTimer]);

  return (
    <div>
      {/* <p>Time: {time}</p> */}
    </div>
  );
};

export default Timer;
