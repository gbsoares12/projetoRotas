import { Component, OnInit, AfterContentChecked, AfterViewInit } from '@angular/core';

import { RotasIbiramaService } from './rotas-ibirama.service';
import { Rota } from './Rota';
import { SelectItem } from 'primeng/components/common/selectitem';
import { faRecycle, faTruck, faInfoCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dados-table',
  templateUrl: './dados-table.component.html',
  providers: [RotasIbiramaService],
  styleUrls: ['./dados-table.component.css']
})
export class DadosTableComponent implements OnInit, AfterContentChecked, AfterViewInit {
  faRecycle = faRecycle;
  faTruck = faTruck;
  faInfoCircle = faInfoCircle;
  faExclamationCircle = faExclamationCircle;
  blockSpecial: RegExp = /^[^<>*#!%&|=-_?:;.,'"`()$+¨/}{]+$/;
  rotas: Rota[];
  rotasFormatadas: Rota[];
  coleta: SelectItem[];
  teste: string[];
  bairroSelect: SelectItem[];
  bairros: string[];
  bairroSelecionado: string;
  tipoColetaSelecionada: string[];
  constructor(private rotasIbiramaService: RotasIbiramaService) {
    this.coleta = [{ label: 'Seletiva', value: 'SELETIVA' }, { label: 'Convencional', value: 'CONVENCIONAL' }];
    this.bairroSelect = [{ label: 'Selecione um bairro', value: ' ' }];
  }

  ngOnInit() {
    this.getRotas();
    this.getBairros();
  }
  ngAfterViewInit(): void {
    if (this.rotas !== undefined) {
      this.rotas.forEach(rota => {
        let novoNome: string;
        let novaDescricao: string;
        const arrayNome = rota.nome_rua.split('(');
        if (arrayNome.length > 1) {
          const descricaoFormatada = arrayNome[1].split(')');
          novoNome = arrayNome[0];
          novaDescricao = arrayNome[1];
          rota.nome_rua = novoNome;
          rota.descricao = descricaoFormatada[0];
        }
      });
    }
  }

  ngAfterContentChecked(): void {

  }

  montaSelectBairro(): void {
    if (this.bairros !== undefined) {
      this.bairroSelect = [];
      this.bairroSelect = [{ label: 'Selecione um bairro', value: ' ' }];
      this.bairros.forEach(bairro => {
        this.bairroSelect.push({ label: bairro, value: bairro });
      });
    }
  }
  getRotas(): void {
    this.rotasIbiramaService.getRotas()
      .subscribe(rotas => this.rotas = rotas);
  }

  getBairros(): void {
    this.rotasIbiramaService.getBairros()
      .subscribe(bairros => this.bairros = bairros);
  }

  pesquisar(nomeRua: string) {
    let bairro: string;
    bairro = this.bairroSelecionado;
    if (this.bairroSelecionado === undefined) {
      bairro = '';
    }
    let tipoColeta: string;
    if (this.tipoColetaSelecionada) {
      if (this.tipoColetaSelecionada.length < 2) {
        tipoColeta = this.tipoColetaSelecionada[0];
      } else {
        tipoColeta = 'undefined';
      }
      if (!nomeRua && !bairro && this.tipoColetaSelecionada.length > 1) {
        this.getRotas();
      }
    }
    if (!nomeRua && !bairro && !tipoColeta) {
      this.getRotas();
    } else if (nomeRua || bairro || (this.tipoColetaSelecionada && this.tipoColetaSelecionada.length === 1)) {
      this.rotasIbiramaService.montaFiltros(nomeRua, bairro, tipoColeta)
        .subscribe(rotas => this.rotas = rotas, error => console.error(error));
    }
  }
}

