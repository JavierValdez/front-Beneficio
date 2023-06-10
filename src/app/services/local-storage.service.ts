// local-storage.service.ts
import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storageEvent$: Observable<Event> = fromEvent(window, 'storage');

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  get tokenChange$(): Observable<Event> {
    return this.storageEvent$;
  }
}
