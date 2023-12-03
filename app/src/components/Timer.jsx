/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const Timer = ({ startButtonClickHandler }) => {
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let increaseTime;
    if (timerActive) {
      increaseTime = setTimeout(() => {
        setTime(time + 1);
      }, 1000);
    }

    return () => {
      clearTimeout(increaseTime);
    };
  }, [time, timerActive]);

  useEffect(() => {
    if (startButtonClickHandler) {
      setTimerActive(true);
    }
  }, [startButtonClickHandler]);

  return (
    <div>
      {/* <p>Time: {time}</p> */}
    </div>
  );
};

export default Timer;
