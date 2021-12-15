import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { ActivationStart, Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  public currentLinkLabel: string;
  public isData: boolean;
  public isHomePage: boolean;
  public parentLinks: Array<any>;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof ActivationStart)).subscribe((event) => {
      if (event instanceof ActivationStart) {
        const data = event.snapshot.data.breadcrumb;
        if (typeof data !== 'undefined') {
          this.isData = true;
          this.isHomePage = data.label === 'Home';
          this.currentLinkLabel = data.label;
          this.parentLinks = (data.parent && data.parent.length > 0) ? data.parent : [];
        }
      }
    });
  }

}
