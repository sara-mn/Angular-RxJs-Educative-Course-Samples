import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { filter, tap } from 'rxjs';
import {AnalyticsService} from './services/analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rx-photos';

  constructor(private router: Router,
              private analytics: AnalyticsService) {
  }

  ngOnInit() {
    this.router.events
      .pipe(
        tap(console.log),
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event:any) => {
        this.analytics.recordPageChange(event);
      });
  }
}
