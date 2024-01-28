import axios, { AxiosResponse } from "axios";
import { CreateConsultaInput, GetConsultaOutput } from "./endpointOutputs";

export type ApiOutput<T> = Promise<AxiosResponse<T, any>>;

export function useApi() {
  const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  async function getEvents(): ApiOutput<GetConsultaOutput> {
    return client.get<GetConsultaOutput>("/consulta");
  }

  async function deleteEvent(id: string): ApiOutput<GetConsultaOutput> {
    return client.delete("/consulta/" + id);
  }

  async function createEvent(
    consulta: CreateConsultaInput
  ): ApiOutput<GetConsultaOutput> {
    return client.post("/consulta", consulta);
  }

  return { getEvents, deleteEvent, createEvent };
}
