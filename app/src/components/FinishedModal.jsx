/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";

function FinishedModal({ showModal }) {
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (showModal) {
      open();
    } else {
      close();
    }
  }, [showModal, open, close]);

  const handleRefresh = () => { 
    window.location.reload();
  };

  return (
    <>
      <Modal style={{textAlign: "center"}} opened={opened} onClose={close}>
        <h2>Game Finished!</h2>
        <h3>Your time was: {} </h3>
        <Button onClick={handleRefresh}>Play Again</Button>
      </Modal>
    </>
  );
}
export default FinishedModal;
