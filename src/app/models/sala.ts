import { Cama } from "./cama";
import { Medico } from "./medico";
import { Paciente } from "./paciente";

export class Sala {
    _id:string;
    numero:string;
    camas:[Cama];
    estado:[];
    paciente:Paciente;
    medico:Medico;
    observacion:string;
    piso:string;
}
