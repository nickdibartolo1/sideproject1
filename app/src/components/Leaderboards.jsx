import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import classes from "./HeaderMenu.module.css";

function Leaderboards() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Leaderboards">
        {/* Modal content */}
      </Modal>

      <Button className={classes.button} onClick={open}>Leaderboards</Button>
    </>
  );
}

export default Leaderboards;