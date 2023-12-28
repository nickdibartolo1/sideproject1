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

  const receiveTimerFromHeaderMenu = (finalTimeValue) => { //get final time value, convert from object to string and then set it
    if (finalTimeValue && typeof finalTimeValue === 'object' && 'seconds' in finalTimeValue && 'milliseconds' in finalTimeValue) {
      setTimer(finalTimeValue);
  
      const finalGameTime = `${finalTimeValue.seconds.toString().padStart(2, "0")}.${(finalTimeValue.milliseconds / 10).toFixed(0).padStart(2, "0")}`;
      setFinalTime(finalGameTime);

    } else {
      console.error("Invalid timer object:", finalTimeValue);
    }
  };

  return (
    <div>
      <HeaderMenu
        onReceiveTimer={receiveTimerFromHeaderMenu}
        timerActive={headerMenuTimerActive}
      ></HeaderMenu>
      <div style={{ position: "relative", textAlign: "center" }}>
        <h1>Word Match Game</h1>
        {start ? (
          <CardMatches
            onGameFinish={receiveTimerFromHeaderMenu}
            onEndTimer={setHeaderMenuTimerActive}
            finalScore={finalTime}
          ></CardMatches>
        ) : (
          <section>
            <p style={{textAlign: "center"}}>
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
