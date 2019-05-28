import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { RotasIbiramaService } from './rotas-ibirama.service';
import { Rota } from './Rota';
import { SelectItem } from 'primeng/components/common/selectitem';
import { faRecycle, faTruck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dados-table',
  templateUrl: './dados-table.component.html',
  providers: [RotasIbiramaService],
  styleUrls: ['./dados-table.component.css']
})
export class DadosTableComponent implements OnInit {
  faRecycle = faRecycle;
  faTruck = faTruck;
  blockSpecial: RegExp = /^[^<>*#!%&|=-_?:;.,'"`()$+¨/}{]+$/;
  rotas: Rota[];
  coleta: SelectItem[];
  teste: string[];
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
      if (!nomeRua && !bairro && coleta.length > 1) {
        this.getRotas();
      }
    }

    if (!nomeRua && !bairro && !tipoColeta) {
      this.getRotas();
    } else if (nomeRua || bairro || (coleta && coleta.length === 1)) {
      this.rotasIbiramaService.montaFiltros(nomeRua, bairro, tipoColeta)
        .subscribe(rotas => this.rotas = rotas, error => console.error(error));
    }
  }
}

