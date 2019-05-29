import { Component, OnInit } from '@angular/core';

import { faRecycle, faTruck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-informativos',
  templateUrl: './informativos.component.html',
  styleUrls: ['./informativos.component.css']
})
export class InformativosComponent implements OnInit {
  faRecycle = faRecycle;
  faTruck = faTruck;
  constructor() { }

  ngOnInit() {
  }

}
