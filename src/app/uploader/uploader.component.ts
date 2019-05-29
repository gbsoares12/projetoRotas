import { Component, OnInit } from '@angular/core';
import { UploaderService } from './uploader.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  providers: [ UploaderService ],
  styleUrls: ['./uploader.component.css']
})

export class UploaderComponent {
  message: string;

  constructor(private uploaderService: UploaderService) {}

  onPicked(input: HTMLInputElement) {
    const file = input.files;
    if (file[0]) {
      this.uploaderService.upload(file[0])
    }
  }
}
