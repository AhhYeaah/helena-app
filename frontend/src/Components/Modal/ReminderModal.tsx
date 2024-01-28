import {
  Button,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import { Consulta } from "../../api/endpointOutputs";
import { parseDate } from "./Descriptor/ConsultaPeriodDescriptor";
import { useEffect } from "react";
import { isSameDay } from "date-fns";
import despertadorSom from "../../assets/despertador.mp3";

type ReminderModalProps = {
  events: Consulta[];
};

export function ReminderModal({ events }: ReminderModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const lastReminder = sessionStorage.getItem("reminderDay");
    if (lastReminder) {
      const lastReminderDate = new Date(lastReminder);
      const today = new Date();

      const noReminderToday = !isSameDay(lastReminderDate, today);

      if (noReminderToday) {
        if (events.length > 0) {
          new Audio(despertadorSom).play();
          onOpen();
          sessionStorage.setItem("reminderDay", new Date().toISOString());
        }
      }
    } else {
      if (events.length > 0) {
        new Audio(despertadorSom).play();
        onOpen();
        sessionStorage.setItem("reminderDay", new Date().toISOString());
      }
    }
  }, [events]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Aviso</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <span> As seguintes consultas acontecerão hoje:</span>
              <div className="ml-4">
                <UnorderedList>
                  {events.map((consultas: any, index) => {
                    return (
                      <ListItem key={index}>
                        <span className="font-bold">
                          {parseDate(consultas.startDate)}{" "}
                        </span>
                        <span>- {consultas.name}</span>
                      </ListItem>
                    );
                  })}
                </UnorderedList>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Ok</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
