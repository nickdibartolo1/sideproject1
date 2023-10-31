import "@mantine/core/styles.css";
import Test from "./components/test";

import { MantineProvider } from "@mantine/core";
import StartButton from "./components/StartButton";
import CardMatches from "./components/CardMatches";

console.log("ghsodghdg");

function App() {
  return (
    <>
      <MantineProvider>
        <Test></Test>
        <StartButton />
        <CardMatches/>
      </MantineProvider>
    </>
  );
}

export default App;
