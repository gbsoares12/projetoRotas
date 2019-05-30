import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ModalService } from '../modal-login/index-modal';
import { AuthenticationService } from '../service/authentication.service';
import { DashboardAdminService } from './dashboard-admin.service';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  providers: [MessageService]
})

export class DashboardAdminComponent implements OnInit {
  username: string;
  password: string;
  invalidLogin = false;
  @Input() visible: boolean;
  @Output() estadoLogin = new EventEmitter();

  // tslint:disable-next-line: max-line-length
  constructor(private modalService: ModalService, private loginservice: AuthenticationService, private dashboardAdmService: DashboardAdminService, private messageService: MessageService) { }
  ngOnInit() {
    this.visible = this.dashboardAdmService.getEstado();
  }
  checkLogin() {
    (this.loginservice.authenticate(this.username, this.password).subscribe(
      data => {

        this.invalidLogin = false;
        this.openModal('dashboradAdmin');
        this.fecharLogin(false);
        this.showSuccess();
      },
      error => {
        this.invalidLogin = true;
        this.showError();
      }
    )
    );
  }
  logout() {
    this.loginservice.logOut();
    this.closeModal('dashboradAdmin');
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

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Logado com sucesso', detail: 'Bem vindo ao dashboard do administrador' });
  }

  showError() {
// tslint:disable-next-line: max-line-length
    this.messageService.add({ severity: 'error', summary: 'Usuário e senha não corresponde a um usuário cadastrado', detail: 'Valição falhou' });
  }

}
