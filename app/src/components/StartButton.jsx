import { Button } from "@mantine/core";
import CardMatches from "./CardMatches";
import { useState } from "react";
import HeaderMenu from "./HeaderMenu";

const StartButton = () => {
  const [start, setStart] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [timer, setTimer] = useState(null); 
  const [finalTime, setFinalTime] = useState(null);
  const [headerMenuTimerActive, setHeaderMenuTimerActive] = useState(false);

  const startButtonClickHandler = () => {
    setStart(true);
    setHeaderMenuTimerActive(true); // Start the timer in HeaderMenu
    console.log("I have been awakened!");
  };

  const receiveTimerFromHeaderMenu = (x) => {
    if (x && typeof x === 'object' && 'seconds' in x && 'milliseconds' in x) {
      setTimer(x);
  
      const finalGameTime = `${x.seconds.toString().padStart(2, "0")}:${(x.milliseconds / 10).toFixed(0).padStart(2, "0")}`;
      setHeaderMenuTimerActive(false);
      setFinalTime(finalGameTime);
  
      // console.log("Game has finished!");
      // console.log("Final time:", finalGameTime);
    } else {
      console.error("Invalid timer object:", x);
    }
  };

  // const receiveTimerFromHeaderMenu = (x) => {
  //   // Use the timer value as needed in the StartButton component
  //   setTimer(x);
  //    // Get the current time when the game finishes

  // };

  // const handleGameFinish = () => {
  //   // Get the current time when the game finishes
  //   // const finalGameTime = `${finalTimerValue.seconds.toString().padStart(2, "0")}:${(finalTimerValue.milliseconds / 10).toFixed(0).padStart(2, "0")}`;
  //   const finalGameTime = "5464";
  //   setHeaderMenuTimerActive(false);

  //   // Set the finalTime to the current time
  //   setFinalTime(finalGameTime);

  //   console.log("Game has finished!");
  //   console.log("Final time:", finalGameTime);
  // };

  return (
    <div>
      <HeaderMenu
        onReceiveTimer={receiveTimerFromHeaderMenu}
        timerActive={headerMenuTimerActive}
      ></HeaderMenu>
      <div style={{ position: "relative" }}>
        <h1>Card Match Game</h1>
        {start ? (
          <CardMatches
            onGameFinish={receiveTimerFromHeaderMenu}
            finalScore={finalTime}
          ></CardMatches>
        ) : (
          <section>
            <p>
              Match all the terms with their definitions as fast as you can!
            </p>
            <div className="button">
              <Button
                className="button-style"
                variant="filled"
                onClick={startButtonClickHandler}
              >
                Start
              </Button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default StartButton;
