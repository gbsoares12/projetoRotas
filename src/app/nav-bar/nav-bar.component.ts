import { Component, OnInit } from '@angular/core';
import { faTools } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {
  faTools = faTools;
  modalVisible: boolean;
  constructor() { }

  ngOnInit() {
  }
  estadoAtualModal(estado: boolean) {
    this.modalVisible = estado;
  }
  abrirModalLogin() {
    this.modalVisible = true;
  }

}
