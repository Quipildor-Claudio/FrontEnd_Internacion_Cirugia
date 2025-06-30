export interface Diagnostico {
  tipo: string;
  descripcion: string;
  fecha: Date;
}
export class Paciente {
    _id:string;
    dni:string;
    nombre:string;
    apellido:string;
    fecha_nac: Date;
    sexo: string;
    diagnosticos: Diagnostico[];
    fechaIngreso: Date;
    fechaSalida: Date;
}
