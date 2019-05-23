import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { UploaderComponent } from './uploader/uploader.component';
import { DadosTableComponent } from './dados-table/dados-table.component';
import { HttpErrorHandler } from './mensagens/http-error-handler.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MessageService } from './mensagens/message.service';

import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { ButtonModule } from 'primeng/components/button/button';
import { TableModule } from 'primeng/table';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InformativosComponent } from './informativos/informativos.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FieldsetModule } from 'primeng/fieldset';
import { NomesExtensosComponent } from './dados-table/nomes-extensos/nomes-extensos.component';



@NgModule({
  declarations: [
    AppComponent,
    DadosTableComponent,
    UploaderComponent,
    InformativosComponent,
    NomesExtensosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    FormsModule,
    TooltipModule,
    ButtonModule,
    InputTextModule,
    HttpClientModule,
    KeyFilterModule,
    SelectButtonModule,
    FieldsetModule,
    BrowserAnimationsModule
  ],
  providers: [
    HttpErrorHandler,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
