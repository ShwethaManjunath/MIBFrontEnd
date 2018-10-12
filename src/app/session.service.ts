import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  setValueToSession(key: string, value: any) {
    if (sessionStorage) {
      // alert('key: ' + key + 'value :' + value);
      sessionStorage.setItem(key, JSON.stringify(value));
    } else {
      alert('Your current browser doesnot support Session');
    }
  }

  getValueFromSession(key: string) {
    if (sessionStorage.getItem(key) !== '') {
      return JSON.parse(sessionStorage.getItem(key));
    } else {
      alert('No such value in session');
    }
  }

  removeSessionItem(key: string) {
    sessionStorage.removeItem(key);
  }

  clearSession() {
    sessionStorage.clear();
}

}
