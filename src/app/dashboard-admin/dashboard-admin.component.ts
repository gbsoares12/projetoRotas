import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { ModalService } from '../modal-login/index-modal';
import { AuthenticationService } from '../service/authentication.service';
import { DashboardAdminService } from './dashboard-admin.service';
@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})

export class DashboardAdminComponent implements OnInit {
  username: string;
  password: string;
  invalidLogin = false;
  @Input() visible: boolean;

  @Output() estadoLogin = new EventEmitter();

  constructor(private modalService: ModalService, private router: Router,
              private loginservice: AuthenticationService, private dashboardAdmService: DashboardAdminService) { }
  ngOnInit() {
    this.visible = this.dashboardAdmService.getEstado();
  }
  checkLogin() {
    (this.loginservice.authenticate(this.username, this.password).subscribe(
      data => {
        this.router.navigate(['']);
        this.invalidLogin = false;
      },
      error => {
        this.invalidLogin = true;
      }
    )
    );
  }
  fecharLogin(event: boolean) {
    this.visible = event;
    this.estadoLogin.emit(this.visible);
  }
  openModal(id: string) {
    this.modalService.open(id);
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }

}
