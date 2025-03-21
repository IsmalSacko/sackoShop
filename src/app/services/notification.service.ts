import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private messageSource = new BehaviorSubject<{ type: 'success' | 'error', text: string } | null>(null);
  currentMessage = this.messageSource.asObservable();

  showMessage(type: 'success' | 'error', text: string) {
    this.messageSource.next({ type, text });
    setTimeout(() => {
      this.messageSource.next(null);
    }, 3000); // Disparaît après 3 secondes
  }
}
