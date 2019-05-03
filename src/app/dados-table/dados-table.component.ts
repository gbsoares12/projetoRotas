import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dados-table',
  templateUrl: './dados-table.component.html',
  styleUrls: ['./dados-table.component.css']
})
export class DadosTableComponent implements OnInit {


  constructor() { }

  dadosColeta: any[];

  ngOnInit() {

    this.dadosColeta = [
      {
        nomeRua: 'Avenida Missler',
        numero: 'H3',
        segundaM: 'null',
        segundaT: 'null',
        tercaM: '15:00',
        tercaT: 'X',
        quartaM: 'null',
        quartaT: 'null',
        quintaM: 'null',
        quintaT: 'null',
        sextaM: '16:00',
        sextaT: 'X',
        sabadoM: 'null',
        sabadoT: 'null',
        km: '8,12',
        kmtotal: '16,24'
      },
      {
        nomeRua: 'Avenida Missler2',
        numero: 'H3',
        segundaM: 'null',
        segundaT: 'null',
        tercaM: '15:00',
        tercaT: 'X',
        quartaM: 'null',
        quartaT: 'null',
        quintaM: 'null',
        quintaT: 'null',
        sextaM: '16:00',
        sextaT: 'X',
        sabadoM: 'null',
        sabadoT: 'null',
        km: '8,12',
        kmtotal: '16,24'
      },
      {
        nomeRua: 'Avenida Missler3',
        numero: 'H3',
        segundaM: 'null',
        segundaT: 'null',
        tercaM: '15:00',
        tercaT: 'X',
        quartaM: 'null',
        quartaT: 'null',
        quintaM: 'null',
        quintaT: 'null',
        sextaM: '16:00',
        sextaT: 'X',
        sabadoM: 'null',
        sabadoT: 'null',
        km: '8,12',
        kmtotal: '16,24'
      },
    ];
  }


}
