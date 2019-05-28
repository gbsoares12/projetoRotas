import { Component, OnInit } from '@angular/core';

import { faTools } from '@fortawesome/free-solid-svg-icons';
import { DashboardAdminService } from '../dashboard-admin/dashboard-admin.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {
  faTools = faTools;
  modalVisible: boolean;
  constructor(private dashboardAdmService: DashboardAdminService) { }

  ngOnInit() {
  }
  estadoAtualModal(estado: boolean) {
    this.modalVisible = estado;
  }
  abrirModalLogin() {
    this.modalVisible = true;
  }

}
