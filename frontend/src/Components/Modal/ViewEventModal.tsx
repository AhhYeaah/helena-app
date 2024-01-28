import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Consulta } from "../../api/endpointOutputs";
import { useApi } from "../../api/api";
import { ConsultaDescriptor } from "./Descriptor/ConsultaDescriptor";

type ViewEventModalProps = {
  control: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  };
  refreshEvents: () => Promise<void>;
  interactedEvent: Consulta | null;
};

export function ViewEventModal({
  control,
  refreshEvents,
  interactedEvent,
}: ViewEventModalProps) {
  const { deleteEvent } = useApi();

  async function handleDeleteEvent() {
    if (!interactedEvent) return;

    await deleteEvent(String(interactedEvent.id));
    await refreshEvents();
    control.onClose();
  }

  if (!interactedEvent) return null;

  return (
    <>
      <Modal isOpen={control.isOpen} onClose={control.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Visualizar consulta</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ConsultaDescriptor consulta={interactedEvent}></ConsultaDescriptor>
            <div className="flex justify-center">
              <span className="mt-2 text-xs text-gray-400 ">
                Deletar esse evento irá remover tambem qualquer evento
                relacionado a ele ( Consultas criadas automaticamente ).
              </span>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleDeleteEvent}>
              Deletar consulta
            </Button>
            <Button onClick={control.onClose}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
