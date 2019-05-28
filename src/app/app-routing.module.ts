import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploaderComponent } from './uploader/uploader.component';
import { AuthGaurdService } from './service/auth-gaurd.service';

const routes: Routes = [{ path: 'dashboardAdmin', component: UploaderComponent, canActivate:[AuthGaurdService]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
