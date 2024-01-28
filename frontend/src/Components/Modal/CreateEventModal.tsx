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
import { TextInput } from "../Input/TextInput";
import { parseDate } from "./Descriptor/ConsultaPeriodDescriptor";
import { useApi } from "../../api/api";
import { addMonths } from "date-fns";

type CreateEventModalProps = {
  control: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  };
  refreshEvents: () => Promise<void>;
  period: {
    start: Date;
    end: Date;
  };
};

export function CreateEventModal({
  control,
  refreshEvents,
  period,
}: CreateEventModalProps) {
  const { createEvent } = useApi();

  if (!period) return null;

  async function handleEventCreation() {
    const name = (document.getElementsByName("name")[0] as HTMLInputElement)
      .value;

    const planoOfSaudeiton = (
      document.getElementsByName("planoOfSaudeiton")[0] as HTMLInputElement
    ).value;

    await createEvent({
      name,
      planoOfSaudeiton: planoOfSaudeiton ? planoOfSaudeiton : undefined,
      startDate: period.start.toISOString(),
      endDate: period.end.toISOString(),
    });

    await refreshEvents();

    control.onClose();
  }

  return (
    <>
      <Modal isOpen={control.isOpen} onClose={control.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Visualizar consulta</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-col gap-5">
              <TextInput
                label={"Nome"}
                name={"name"}
                placeholder={"Nome do evento"}
                readOnly={false}
              ></TextInput>
              <TextInput
                label={"Plano de saude"}
                name={"planoOfSaudeiton"}
                placeholder={"Nome do plano"}
                readOnly={false}
              ></TextInput>
              <div className="grid grid-cols-2 gap-5">
                <TextInput
                  label="Inicio"
                  name={"endDate"}
                  value={parseDate(period.start)}
                  readOnly={true}
                ></TextInput>
                <TextInput
                  label={"Término"}
                  name={"startDate"}
                  value={parseDate(period.end)}
                  readOnly={true}
                ></TextInput>
              </div>
              <span className="mt-2 text-xs text-gray-400">
                A criação deste evento irá criar um segundo evento com o mesmo
                nome daqui a 6 meses. ( {parseDate(addMonths(period.start, 6))}{" "}
                )
              </span>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={control.onClose}>
              Fechar
            </Button>
            <Button colorScheme="blue" onClick={handleEventCreation}>
              Criar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
