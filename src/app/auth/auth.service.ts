import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor() { }

  getToken(): string {
      return <string>localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  getAuthorities(): string[] {
    const authorities = localStorage.getItem('rol');
    return authorities ? JSON.parse(authorities) : [];
  }

  setAuthorities(authorities: string[]): void {
    let rol:any = authorities[0];
    console.log("rol");
    console.log(rol.authority);
    localStorage.setItem('rol', rol.authority);
  }

  removeAuthorities(): void {
    localStorage.removeItem('rol');
  }

  setUsuario(usuario: string): void {
    localStorage.setItem('usuario', usuario);
  }
  getUsuario(): string {
    return <string>localStorage.getItem('usuario');
  }

}
