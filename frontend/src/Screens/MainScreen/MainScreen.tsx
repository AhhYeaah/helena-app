import { useEffect, useState } from "react";
import { useApi } from "../../api/api";
import { Consulta } from "../../api/endpointOutputs";
import { CalendarComponent } from "../../Components/CalendarComponent/CalendarComponent";
import { isAfter, isSameDay } from "date-fns";
import { List } from "../../Components/List/List";
import { ReminderModal } from "../../Components/Modal/ReminderModal";

export function MainScreen() {
  const [events, setEvents] = useState<Consulta[]>([]);

  function refreshEvents() {
    return getEvents().then(({ data: newEvents }) => {
      return setEvents(
        newEvents.sort(
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        ) as any
      );
    });
  }

  const eventsToday = events.filter((event) => {
    const eventDate = new Date(event.startDate);
    const today = new Date();

    return isSameDay(eventDate, today);
  });

  const eventsAfter = events.filter((event) => {
    const eventDate = new Date(event.startDate);
    const today = new Date();

    return isAfter(eventDate, today) || isSameDay(eventDate, today);
  });

  const { getEvents } = useApi();
  useEffect(() => {
    refreshEvents();
  }, []);

  return (
    <>
      <ReminderModal events={eventsToday}></ReminderModal>
      <main className="grid grid-cols-3 grid-rows-1 bg-[#c9e0ff] h-screen">
        <div className="col-span-1 flex justify-center items-center">
          <div className="bg-white aspect-[3/4] overflow-auto h-[600px] rounded-md w-[450px] shadow-2xl border border-indigo-800 p-10 flex gap-5 flex-col">
            <List
              name={"Consultas que acontecem hoje:"}
              eventList={eventsToday}
            ></List>
            <List
              name={"Consultas que acontecerão em breve:"}
              eventList={eventsAfter}
            ></List>
          </div>
        </div>
        <div className="flex justify-center items-center col-span-2">
          <div className="aspect-[135/100] w-[1000px] border border-indigo-800 shadow-2xl rounded-md bg-white p-10">
            <CalendarComponent
              refreshEvents={refreshEvents}
              events={events}
            ></CalendarComponent>
          </div>
        </div>
      </main>
    </>
  );
}
