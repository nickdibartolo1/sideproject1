import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

function FinishedModal () {
    const [opened, { open, close }] = useDisclosure(false);

    return (
      <>
        <Modal opened={opened} onClose={close} title="Congratulations!">
          {/* Modal content */}
        </Modal>
  
        <Button onClick={open}>Ldg</Button>
      </>
    );
  }
export default FinishedModal;