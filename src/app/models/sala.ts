import { Cama } from "./cama";
import { Medico } from "./medico";
import { Paciente } from "./paciente";

export class Sala {
    _id:string;
    nombre:string;
    camas: Cama[];
}
