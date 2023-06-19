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
import { GestorComponentComponent } from './components/gestor-component/gestor-component.component';
import { CrearAgricultorComponent } from './components/crear-agricultor/crear-agricultor.component';
import { CompPruebaComponent } from './components/comp-prueba/comp-prueba.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import {HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegistroBeneficioComponent,
    ListarUsuariosComponent,
    UpdateUserComponent,
    CrearTrasportistaComponent,
    QRCODEComponent,
    VisorQRComponent,
    GestorComponentComponent,
    CrearAgricultorComponent,
    CompPruebaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    QRCodeModule
  ],
  providers: [
    // Agrega el interceptor como un proveedor
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
