import { Button } from "@mantine/core";
import CardMatches from "./CardMatches";
import { useState } from "react";
import HeaderMenu from "./HeaderMenu"

const StartButton = () => {
  const [start, setStart] = useState(false);

  const startButtonClickHandler = () => {
    setStart(true);
    console.log("i have been awaken!");
  };

  return (
    <div>
      <HeaderMenu startButtonClickHandler={startButtonClickHandler}></HeaderMenu>
      <div style={{ position: "relative", top: "6rem" }}>
        <h1>Word Match Game</h1>
        {start ? (
          <CardMatches></CardMatches>
        ) : (
          <section>
            <p>
              Match all the terms with their definitions as fast as you can!
            </p>
            <div className="button">
              <Button variant="filled" onClick={startButtonClickHandler}>
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
