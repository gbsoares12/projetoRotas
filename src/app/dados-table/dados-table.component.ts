import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { RotasIbiramaService } from './rotas-ibirama.service';
import { Rota } from './Rota';
import { SelectItem } from 'primeng/components/common/selectitem';


@Component({
  selector: 'app-dados-table',
  templateUrl: './dados-table.component.html',
  providers: [RotasIbiramaService],
  styleUrls: ['./dados-table.component.css']
})
export class DadosTableComponent implements OnInit {
  blockSpecial: RegExp = /^[^<>*#!%&|=-_?:;.,'"`()$+¨/}{]+$/;
  rotas: Rota[];
  coleta: SelectItem[];
  constructor(private rotasIbiramaService: RotasIbiramaService) {
    this.coleta = [{ label: 'Seletiva', value: 'SELETIVA' }, { label: 'Convencional', value: 'CONVENCIONAL' }];
  }

  ngOnInit() {
    this.getRotas();
  }
  getRotas(): void {
    this.rotasIbiramaService.getRotas()
      .subscribe(rotas => this.rotas = rotas);
  }
  pesquisar(nomeRua: string, bairro: string, coleta: string[]) {

    let tipoColeta: string;
    if (coleta) {
      if (coleta.length < 2) {
        tipoColeta = coleta[0];
      } else {
        tipoColeta = 'undefined';
      }
    }

    if (!nomeRua && !bairro && !tipoColeta) {
      this.getRotas();
    } else if (nomeRua || bairro || coleta) {
      this.rotasIbiramaService.montaFiltros(nomeRua, bairro, tipoColeta)
        .subscribe(rotas => this.rotas = rotas);
    }
  }

  search(searchTerm: string) {
    if (searchTerm) {
      this.rotasIbiramaService.searchRotas(searchTerm)
        .subscribe(rotas => this.rotas = rotas);
    }
  }
}

