import { addMonths } from "date-fns";
import { Consulta } from "../../../api/endpointOutputs";
import { ConsultaPeriodDescriptor } from "./ConsultaPeriodDescriptor";

export function ConsultaDescriptor({ consulta }: { consulta: Consulta }) {
  const isSecondConsulta = consulta?.name.includes("Segunda Consulta -");
  if (isSecondConsulta) {
    return (
      <div className="flex gap-3 flex-col mb-3">
        <div className="flex justify-center gap-2">
          <span className="font-bold">Nome:</span>
          <span>{consulta?.name}</span>
        </div>
        <div className="flex justify-center gap-2">
          <span className="font-bold">Plano de saude:</span>
          <span>{consulta?.planoOfSaudeiton}</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="font-bold">Esta é a segunda consulta:</span>
          <ConsultaPeriodDescriptor
            consulta={consulta}
          ></ConsultaPeriodDescriptor>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex gap-3 flex-col mb-3">
        <div className="flex justify-center gap-2">
          <span className="font-bold">Nome:</span>
          <span>{consulta?.name}</span>
        </div>
        <div className="flex justify-center gap-2">
          <span className="font-bold">Plano de saude:</span>
          <span>{consulta?.planoOfSaudeiton}</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="font-bold">Primeira Consulta</span>
          <ConsultaPeriodDescriptor
            consulta={consulta}
          ></ConsultaPeriodDescriptor>
        </div>

        <div className="flex flex-col items-center">
          <span className="font-bold">Segunda Consulta</span>
          <ConsultaPeriodDescriptor
            consulta={{
              ...consulta,
              startDate: addMonths(
                new Date(consulta.startDate),
                6
              ).toISOString(),

              endDate: addMonths(new Date(consulta.endDate), 6).toISOString(),
            }}
          ></ConsultaPeriodDescriptor>
        </div>
      </div>
    );
  }
}
