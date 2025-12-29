import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-breadcrumb.component.html',
  styleUrl: './app-breadcrumb.component.scss',
})
export class AppBreadcrumbComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  // Route labels mapping
  private readonly routeLabels: Record<string, string> = {
    'erl-glossary': 'ERL Glossary',
    'uss-gravely-required-report-log': 'USS Gravely Required Report Log',
    'uss-gravely-waf-log': 'USS Gravely WAF Log',
    'cfr-log': 'CFR Log',
    jsr: 'JSR',
    'time-by-job': 'Time By Job',
    tip: 'TIP',
    dashboard: 'Dashboard',
  };

  readonly pageTitle = signal<string>('Dashboard');

  constructor() {
    // Update page title on route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.pageTitle.set(this.getCurrentPageTitle());
      });

    // Set initial title
    this.pageTitle.set(this.getCurrentPageTitle());
  }

  private getCurrentPageTitle(): string {
    let route = this.activatedRoute.root;

    // Traverse the route tree to find the last segment
    while (route.firstChild) {
      route = route.firstChild;
      const routeSnapshot = route?.snapshot;

      // If this is the last child with a URL segment, return its label
      if (routeSnapshot?.url?.length > 0 && !route.firstChild) {
        const segment = routeSnapshot.url[0].path;
        return this.getRouteLabel(segment);
      }
    }

    // Default to Dashboard if at root
    return 'Dashboard';
  }

  private getRouteLabel(segment: string): string {
    // Check if we have a custom label for this route
    if (this.routeLabels[segment]) {
      return this.routeLabels[segment];
    }

    // Convert kebab-case to Title Case
    return segment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
