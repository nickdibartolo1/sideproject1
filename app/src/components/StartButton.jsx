import { Button } from "@mantine/core";
import { useState } from "react";

const StartButton = () => {
  const [start, setStart] = useState(false);

  const startButtonClickHandler = () => {
    setStart();
    console.log("i have been awaken!")
  };

  return (
    <div>
      <p>Match all the terms with their definitions as fast as you can!</p>
      <Button variant="filled" onClick={startButtonClickHandler}>Start</Button>
    </div>
  );
};

export default StartButton;
