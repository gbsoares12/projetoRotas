import { Component } from '@angular/core';

import { faTools } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent{
  faTools = faTools;
  modalVisible: boolean;
  constructor() { }

  estadoAtualModal(estado: boolean) {
    this.modalVisible = estado;
  }
  abrirModalLogin(estado: boolean) {
    this.modalVisible = true;
  }

}
