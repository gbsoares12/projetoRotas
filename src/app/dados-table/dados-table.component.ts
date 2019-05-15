import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { RotasIbiramaService, RotasFiltro } from './rotas-ibirama.service';
import { Rota } from './Rota';


@Component({
  selector: 'app-dados-table',
  templateUrl: './dados-table.component.html',
  providers: [RotasIbiramaService],
  styleUrls: ['./dados-table.component.css']
})
export class DadosTableComponent implements OnInit {
  filtro = new RotasFiltro();
  constructor(private rotasIbiramaService: RotasIbiramaService) { }
  rotas: Rota[];
  ngOnInit() {
    this.getRotas();
  }
  getRotas(): void {
    this.rotasIbiramaService.getRotas()
      .subscribe(rotas => this.rotas = rotas);
  }

  search(searchTerm: string) {
    if (searchTerm) {
      this.rotasIbiramaService.searchRotas(searchTerm)
        .subscribe(rotas => this.rotas = rotas);
    }
  }
}
