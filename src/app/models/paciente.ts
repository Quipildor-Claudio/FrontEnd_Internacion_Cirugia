export class Paciente {
    _id:string;
    dni:string;
    nombre:string;
    apellido:string;
    edad:number;
    fecha_nac:Date;
    sexo:string;
    diagnosticos:[];
    fechaIngreso:Date;
    fechaSalida:Date;
}
