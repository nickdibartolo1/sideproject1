/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Group, Container, Button } from "@mantine/core";
import classes from "./HeaderMenu.module.css";

export function HeaderMenu({ onReceiveTimer, timerActive }) {
  const [time, setTime] = useState({ seconds: 0, milliseconds: 0 });
  const [headerMenuTimerActive, setHeaderMenuTimerActive] = useState(false);

  useEffect(() => {
    let timer;

    if (timerActive || headerMenuTimerActive) {
      // Start the timer if either parent or child triggers it
      timer = setInterval(() => {
        setTime((prevTime) => {
          const milliseconds = prevTime.milliseconds + 10; // Count milliseconds by 10s
          if (milliseconds === 1000) {
            return { seconds: prevTime.seconds + 1, milliseconds: 0 };
          }
          return { ...prevTime, milliseconds };
        });
      }, 10);
    }
    return () => {
      clearInterval(timer);
    };
  }, [timerActive, headerMenuTimerActive]);

  useEffect(() => {
    onReceiveTimer(time); // start time when timer is received from startButton
  }, [time, onReceiveTimer]);


  useEffect(() => {
    setHeaderMenuTimerActive(timerActive); // Update child timer when parent changes
  }, [timerActive]);

  const handleRefresh = () => { // refresh the page when the Restart button is clicked for restart
    window.location.reload();
  };

  return (
    <header className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          <p>
            Time:{" "}
            {`${time.seconds.toString().padStart(2, "0")}:${(
              time.milliseconds / 10
            )
              .toFixed(0)
              .padStart(2, "0")}`}
          </p>
          <Group gap={5}>
            <Button className={classes.button} onClick={handleRefresh}>
              Restart
            </Button>
          </Group>
        </div>
      </Container>
    </header>
  );
}

export default HeaderMenu;
