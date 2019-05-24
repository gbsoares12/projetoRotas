import { Component, OnInit } from '@angular/core';

import { faTools } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  faTools = faTools;
  visible: boolean;


  constructor() { }

  ngOnInit() {
  }

  showDialog() {
    this.visible = true;
  }
}
