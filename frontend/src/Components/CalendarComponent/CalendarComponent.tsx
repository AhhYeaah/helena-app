import React, { useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { Consulta } from "../../api/endpointOutputs";
import { useDisclosure } from "@chakra-ui/react";
import { ViewEventModal } from "../Modal/ViewEventModal";
import { CreateEventModal } from "../Modal/CreateEventModal";
import multiMonthPlugin from "@fullcalendar/multimonth";

function mapConsultaIntoEvent(consultas: Consulta[]) {
  return consultas.map((consulta) => {
    return {
      id: String(consulta.id),
      title: consulta.name,
      start: consulta.startDate,
      end: consulta.endDate,
    };
  });
}

export function CalendarComponent({
  refreshEvents,
  events,
}: {
  events: Consulta[];
  refreshEvents: () => Promise<void>;
}) {
  const viewModal = useDisclosure();
  const createModal = useDisclosure();

  const [interactedEvent, setInteractedEvent] = useState<Consulta | null>(null);
  const [lastPeriod, setLastPeriod] = useState<{
    start: Date;
    end: Date;
  } | null>(null);

  function openViewEventModal(eventId: string) {
    setInteractedEvent(
      events.find((consulta) => Number(consulta.id) == Number(eventId)) ?? null
    );
    viewModal.onOpen();
  }

  function createViewEventModal({ start, end }: any) {
    setLastPeriod({ start: new Date(start), end: new Date(end) });

    createModal.onOpen();
  }

  return (
    <>
      <ViewEventModal
        control={viewModal}
        interactedEvent={interactedEvent}
        refreshEvents={refreshEvents}
      />

      <CreateEventModal
        control={createModal}
        period={lastPeriod!}
        refreshEvents={refreshEvents}
      />

      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          multiMonthPlugin,
          interactionPlugin,
        ]}
        headerToolbar={{
          left: "prev,today,next",
          center: "title",
          right: "timeGridDay,dayGridMonth,multiMonthYear",
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        select={createViewEventModal}
        locale={"pt-br"}
        selectMirror={true}
        dayMaxEvents={true}
        events={mapConsultaIntoEvent(events)}
        eventClick={(e) => openViewEventModal(e.event.id)}
      />
      <span className="mt-2 text-xs text-gray-400">
        Para criar um evento com um horario especifico, altere a visualização
        para dia.
      </span>
    </>
  );
}
