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
      {start ? (
        <CardMatches></CardMatches>
      ) : (
        <div>
          <p>Match all the terms with their definitions as fast as you can!</p>
          <Button variant="filled" onClick={startButtonClickHandler}>
            Start
          </Button>
        </div>
      )}
    </div>
  );
};

export default StartButton;
