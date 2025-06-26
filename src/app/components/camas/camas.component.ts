import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-camas',
  imports: [CommonModule],
  templateUrl: './camas.component.html',
  styleUrl: './camas.component.css'
})
export class CamasComponent implements OnInit{
  title="Sala 5"
   camas: any[] = [];

  ngOnInit(): void {
    this.camas = [
      { dni: '12345678', nombre: 'Juan Pérez', diagnostico: 'Neumonía', cama: '101' },
      { dni: '87654321', nombre: 'María López', diagnostico: 'Fractura', cama: '102' },
      { dni: '11223344', nombre: 'Carlos Gómez', diagnostico: 'Covid-19', cama: '103' }
    ];
  }
}
