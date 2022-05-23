import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class RedirectService {

  constructor (private router: Router) {}

  public redirect(link: string, time: number): void {
    setTimeout(() => {
      this.router.navigate([link]).then();
    }, time);
  }

}
