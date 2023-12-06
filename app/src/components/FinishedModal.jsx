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
      <Modal opened={opened} onClose={close} title="Congratulations!">
        <h2>Game Finished!</h2>
      </Modal>
    </>
  );
}
export default FinishedModal;
