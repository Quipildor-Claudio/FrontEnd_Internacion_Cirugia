import { Medico } from "./medico";
import { Paciente } from "./paciente";

export class Cama {
  _id: string;
  numero: string;
  paciente: Paciente;
  medico: Medico;
  observacion: string;
  piso: string;
  estado: string;
}
