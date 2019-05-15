import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ButtonModule} from 'primeng/components/button/button';
import {InputTextModule} from 'primeng/components/inputtext/inputtext';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/components/tooltip/tooltip';
import { FormsModule } from '@angular/forms';
import { HttpErrorHandler } from './mensagens/http-error-handler.service';
import { MessageService } from './mensagens/message.service';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DadosTableComponent } from './dados-table/dados-table.component';

@NgModule({
  declarations: [
    AppComponent,
    DadosTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    FormsModule,
    TooltipModule,
    ButtonModule,
    InputTextModule,
    HttpClientModule
  ],
  providers: [
    HttpErrorHandler,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
