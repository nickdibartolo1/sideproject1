import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import StartButton from "./components/StartButton";
import "./index.css";

function App() {
  return (
    <MantineProvider>
      <StartButton />
    </MantineProvider>
  );
}

export default App;
