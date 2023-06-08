import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroBeneficioComponent } from './components/registro-beneficio/registro-beneficio.component';
import { VisorQRComponent } from './components/visor-qr/visor-qr.component';

const routes: Routes = [
  { path: 'registro-beneficio', component: RegistroBeneficioComponent },
  { path: 'Consulta/:parametro1/:parametro2', component: VisorQRComponent  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
