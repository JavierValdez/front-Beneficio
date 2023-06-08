import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegistroBeneficioComponent } from './components/registro-beneficio/registro-beneficio.component';
import { FormsModule } from '@angular/forms';
import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';

import { ReactiveFormsModule } from '@angular/forms';
import { CrearTrasportistaComponent } from './components/crear-trasportista/crear-trasportista.component';

import { QRCodeModule } from 'angularx-qrcode';
import { QRCODEComponent } from './components/qrcode/qrcode.component';
import { VisorQRComponent } from './components/visor-qr/visor-qr.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegistroBeneficioComponent,
    ListarUsuariosComponent,
    UpdateUserComponent,
    CrearTrasportistaComponent,
    QRCODEComponent,
    VisorQRComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    QRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }