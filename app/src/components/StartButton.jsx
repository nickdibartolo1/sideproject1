import { Button } from "@mantine/core";
import CardMatches from "./CardMatches";
import { useState } from "react";
import HeaderMenu from "./HeaderMenu";

const StartButton = () => {
  const [start, setStart] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [timer, setTimer] = useState(null);
  const [finalTime, setFinalTime] = useState(0);
  const [headerMenuTimerActive, setHeaderMenuTimerActive] = useState(false);

  const startButtonClickHandler = () => {
    setStart(true);
    setHeaderMenuTimerActive(true); // Start the timer in HeaderMenu
    console.log("I have been awakened!");
  };

  const receiveTimerFromHeaderMenu = (timerValue) => {
    // Receive timer value from HeaderMenu
    console.log("Received timer value from HeaderMenu:", timerValue);
    // Use the timer value as needed in the StartButton component
    setTimer(timerValue);
  };

  const handleGameFinish = (timeScore) => {
    setHeaderMenuTimerActive(false); // Stop the timer in HeaderMenu when the game finishes
    setFinalTime(timeScore)
    console.log("Game has finished!");
    console.log("Game has finished!", "Final time:", timeScore);
  };

  return (
    <div>
      <HeaderMenu
        onReceiveTimer={receiveTimerFromHeaderMenu}
        timerActive={headerMenuTimerActive} 
      ></HeaderMenu>
      <div style={{ position: "relative" }}>
        <h1>Card Match Game</h1>
        {start ? (
          <CardMatches onGameFinish={handleGameFinish} ></CardMatches>
        ) : (
          <section>
            <p>
              Match all the terms with their definitions as fast as you can!
            </p>
            <div className="button">
              <Button className="button-style" variant="filled" onClick={startButtonClickHandler}>
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
