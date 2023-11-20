import { Button } from "@mantine/core";
import CardMatches from "./CardMatches";
import { useState } from "react";
// import Deselector from "./Deselector";

const StartButton = () => {
  const [start, setStart] = useState(false);
  // const [select, setSelect] = useState(-1);

  // function handleOutsideClick() {
  //   setSelect(-1);
  //   console.log("DESELECT");
  // }

  const startButtonClickHandler = () => {
    setStart(true);
    console.log("i have been awaken!");
  };

  return (
    <div>
      {start ? (
        
        // <Deselector handleClickOutside={handleOutsideClick}>
            <CardMatches></CardMatches>
            // </Deselector>
          
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
