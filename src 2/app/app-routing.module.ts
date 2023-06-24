import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisorQRComponent } from './components/visor-qr/visor-qr.component';
//Import gestor Component
import { GestorComponentComponent } from './components/gestor-component/gestor-component.component';
const routes: Routes = [
  { path: 'Consulta/:parametro1', component: VisorQRComponent  },
  { path: 'Inicio', component: GestorComponentComponent},
  { path: '**', redirectTo: 'Inicio' } // Redirecciona a 'registro-beneficio' si la URL no coincide con ninguna ruta definida


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
