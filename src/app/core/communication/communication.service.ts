import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private componentMethodCallSource = new Subject<void>();

  componentMethodCalled$ = this.componentMethodCallSource.asObservable();

  callComponentMethod() {
    this.componentMethodCallSource.next();
  }
}
