import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CamaService } from '../../services/cama.service';
import { SalaService } from '../../services/sala.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-camas',
  imports: [CommonModule, RouterLink],
  templateUrl: './camas.component.html',
  styleUrl: './camas.component.css'
})
export class CamasComponent implements OnInit {
  title = "";
  camas: any[] = [];
  sala: any = null;
  salaId?: string;

  constructor(private salaService: SalaService, private camaService: CamaService, private route: ActivatedRoute, private router: Router) {

  }
  ngOnInit(): void {
    // Verificar si estamos editando
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.salaId = params['id'];
        this.getSala();

      }
    });
  }

  getSala() {
    this.salaService.get(this.salaId).subscribe((sala: any) => {
      this.sala = sala;
      console.log(sala);
      this.title = `Camas de la Sala: ${sala.nombre}`;
    });
  }




}





