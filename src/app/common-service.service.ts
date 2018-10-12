import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
providedIn:  'root'
})
export class CommonsareService {
public isUserLoggedIn:  BehaviorSubject<boolean> =  new BehaviorSubject<boolean>(false);

loginbuttonTrigger =  new EventEmitter<any>();
logoutbuttonTrigger = new EventEmitter<any>();
constructor() { }
}
