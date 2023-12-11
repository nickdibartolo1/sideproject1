/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";

function FinishedModal({ showModal }) {
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (showModal) {
      open();
    } else {
      close();
    }
  }, [showModal, open, close]);

  return (
    <>
      <Modal style={{textAlign: "center"}} opened={opened} onClose={close}>
        <h2>Game Finished!</h2>
        <h3>Your time was: </h3>
      </Modal>
    </>
  );
}
export default FinishedModal;
