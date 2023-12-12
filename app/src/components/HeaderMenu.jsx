/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Group, Burger, Container, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./HeaderMenu.module.css";
import Leaderboards from "./Leaderboards";

export function HeaderMenu({ onReceiveTimer, timerActive }) {
  const [opened, { toggle }] = useDisclosure(false);
  const [time, setTime] = useState(0);
  const [headerMenuTimerActive, setHeaderMenuTimerActive] = useState(false);

  useEffect(() => {
    let increaseTime;

    if (timerActive || headerMenuTimerActive) {
      // Start the timer if either parent or child triggers it
      increaseTime = setTimeout(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearTimeout(increaseTime);
    };
  }, [time, timerActive, headerMenuTimerActive]);


  useEffect(() => {
    onReceiveTimer(time);
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
          <p>Time: {time}</p>
          <Group gap={5} visibleFrom="sm">
            <Button className={classes.button} onClick={handleRefresh}>Restart</Button>
            <Leaderboards></Leaderboards>
          </Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        </div>
      </Container>
    </header>
  );
}

export default HeaderMenu;
