import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor() { }
  recordPageChange(event : any) {
    // Call your analytics library
    console.log('Route triggered', event.urlAfterRedirects);
  }
}
