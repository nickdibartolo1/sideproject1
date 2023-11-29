import { Button } from "@mantine/core";
import CardMatches from "./CardMatches";
import { useState } from "react";

const StartButton = () => {
  const [start, setStart] = useState(false);


  const startButtonClickHandler = () => {
    setStart(true);
    console.log("i have been awaken!");
  };

  return (
    <div>
      <h1>Word Match Game</h1>
      {start ? (<CardMatches></CardMatches>) : (
        <section>
          <p>Match all the terms with their definitions as fast as you can!</p>
          <div className="button">
            <Button variant="filled" onClick={startButtonClickHandler}>
              Start
            </Button>
          </div>
        </section>
      )}
    </div>
  );
};

export default StartButton;
