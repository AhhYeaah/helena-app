import { format } from "date-fns";
import { Consulta } from "../../../api/endpointOutputs";

export function parseDate(date: string) {
  return format(new Date(date), "dd/MM/yyyy - HH:mm");
}

export function ConsultaPeriodDescriptor({ consulta }: { consulta: Consulta }) {
  return (
    <div>
      <div className="flex justify-center gap-2">
        <span className="font-bold">Inicio da consulta:</span>
        <span>{parseDate(consulta?.startDate)}</span>
      </div>
      <div className="flex justify-center gap-2">
        <span className="font-bold">Término da consulta:</span>
        <span>{parseDate(consulta?.endDate)}</span>
      </div>
    </div>
  );
}
