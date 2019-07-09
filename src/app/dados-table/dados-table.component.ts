import { Component, OnInit, AfterContentChecked } from '@angular/core';

import { RotasIbiramaService } from './rotas-ibirama.service';
import { Rota } from './Rota';
import { SelectItem } from 'primeng/components/common/selectitem';
import { faRecycle, faTruck, faInfoCircle, faExclamationCircle, faThumbsDown, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-dados-table',
  templateUrl: './dados-table.component.html',
  providers: [RotasIbiramaService],
  styleUrls: ['./dados-table.component.css']
})
export class DadosTableComponent implements OnInit, AfterContentChecked {
  faRecycle = faRecycle;
  faTruck = faTruck;
  faInfoCircle = faInfoCircle;
  faCircleNotch = faCircleNotch;
  faExclamationCircle = faExclamationCircle;
  rotas: Rota[];
  coleta: SelectItem[];
  bairroSelect: SelectItem[];
  bairros: string[];
  bairroSelecionado: string;
  tipoColetaSelecionada: string[];
  rotasFormatadas: Rota[];
  RotasRua: Rota[];
  ruasBuscadas: string[];
  ruasSelect: SelectItem[];
  ruaSelecionada: string;
  tamanhoRotas: any;
  tamanhoRotasFormatadas: any;
  constructor(private rotasIbiramaService: RotasIbiramaService) {
    this.coleta = [{ label: 'Seletiva', value: 'SELETIVA' }, { label: 'Convencional', value: 'CONVENCIONAL' }];
  }
  ngOnInit() {
    this.getRotas();
    this.getBairros();
  }
  ngAfterContentChecked(): void {
    this.formataNome();
    this.montaSelectBairros();
  }
  montaSelectBairros(): void {
    if (this.bairros !== undefined) {
      if (!this.bairroSelect) {
        this.bairroSelect = [{ label: 'Selecione', value: ' ' }];
        this.bairros.forEach(bairro => {
          this.bairroSelect.push({ label: bairro, value: bairro });
        });
      }
    }
  }
  formataNome(): void {
    if (this.rotas !== undefined && this.rotas !== null) {
      if (this.tamanhoRotas !== this.rotas.length) {
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
        this.tamanhoRotas = this.rotas.length;
        this.rotasFormatadas = this.rotas;
      }
    }
    if (this.rotasFormatadas !== undefined && this.rotasFormatadas !== null) {
        this.rotasFormatadas.forEach(rota => {
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
  getRotas(): void {
    this.rotasIbiramaService.getRotas()
      .subscribe(rotas => this.rotas = rotas);
  }
  getBairros(): void {
    this.rotasIbiramaService.getBairros()
      .subscribe(bairros => this.bairros = bairros);
  }
  pesquisarRua(): void {
    this.ruasSelect = [{ label: 'Selecione', value: ' ' }];
    this.rotas.forEach(rota => {
      if (rota.bairro === this.bairroSelecionado) {
        this.ruasSelect.push({ label: rota.nome_rua, value: rota.nome_rua });
      }
    });
    this.rotasFormatadas = [];
    this.rotas.forEach(rota => {
      if (rota.bairro === this.bairroSelecionado) {
        this.rotasFormatadas.push(rota);
      }
    });
    this.ruaSelecionada = undefined;
    if (this.bairroSelecionado === ' ') {
      this.pesquisar();
    }
  }
  pesquisarRuaBairro(): void {
    this.rotasFormatadas = [];
    this.rotas.forEach(rota => {
      if (rota.nome_rua === this.ruaSelecionada) {
        this.rotasFormatadas.push(rota);
      }
    });
  }
  pesquisar(): void {
    let bairro: string;
    let nomeRua: string;
    let tipoColeta: string;
    nomeRua = this.ruaSelecionada;
    bairro = this.bairroSelecionado;
    if (this.bairroSelecionado === undefined) {
      bairro = '';
    }
    if (this.ruaSelecionada === undefined) {
      nomeRua = '';
    }
    if (this.tipoColetaSelecionada) {
      if (this.tipoColetaSelecionada.length < 2) {
        tipoColeta = this.tipoColetaSelecionada[0];
      } else {
        tipoColeta = 'undefined';
      }
    }
    if (nomeRua || bairro || (this.tipoColetaSelecionada && this.tipoColetaSelecionada.length === 1)) {
      this.rotasIbiramaService.montaFiltros(nomeRua, bairro, tipoColeta)
        .subscribe(rotas => this.rotasFormatadas = rotas, error => console.error(error));
    }
  }
}

