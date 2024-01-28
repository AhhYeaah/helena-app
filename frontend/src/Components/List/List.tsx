import { ListItem, UnorderedList } from "@chakra-ui/react";
import { parseDate } from "../Modal/Descriptor/ConsultaPeriodDescriptor";

export function List({ name, eventList }: { name: string; eventList: any[] }) {
  return (
    <div>
      <span className="text-xl mb-1">{name}</span>
      <div className="ml-4 text-lg">
        <UnorderedList>
          {eventList.map((consultas: any, index) => {
            const item = (
              <ListItem key={index}>
                <span className="font-bold">
                  {parseDate(consultas.startDate)}{" "}
                </span>
                <span>- {consultas.name}</span>
              </ListItem>
            );
            return item;
          })}
        </UnorderedList>
      </div>
    </div>
  );
}
