import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardAdminService {

  visible: boolean;
  constructor() { }
  tornarVisivel(option: boolean) {
    return this.visible = option;
  }
  getEstado() {
    return this.visible;
  }


}
