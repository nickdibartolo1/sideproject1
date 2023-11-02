import "@mantine/core/styles.css";
// import Test from "./components/test";

import { MantineProvider } from "@mantine/core";
import StartButton from "./components/StartButton";
// import CardMatches from "./components/CardMatches";

function App() {
  return (
    <>
      <MantineProvider>
        {/* <Test></Test> */}
        <StartButton />
        
      </MantineProvider>
    </>
  );
}

export default App;
