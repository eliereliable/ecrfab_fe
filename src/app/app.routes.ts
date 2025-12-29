import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: 'erl-glossary',
        loadComponent: () =>
          import('./pages/erl-glossary/erl-glossary.component').then(
            (m) => m.ErlGlossaryComponent
          ),
      },
      {
        path: 'uss-gravely-required-report-log',
        loadComponent: () =>
          import(
            './pages/uss-gravely-required-report-log/uss-gravely-required-report-log.component'
          ).then((m) => m.UssGravelyRequiredReportLogComponent),
      },
      {
        path: 'uss-gravely-waf-log',
        loadComponent: () =>
          import(
            './pages/uss-gravely-waf-log/uss-gravely-waf-log.component'
          ).then((m) => m.UssGravelyWafLogComponent),
      },
      {
        path: 'cfr-log',
        loadComponent: () =>
          import('./pages/cfr-log/cfr-log.component').then(
            (m) => m.CfrLogComponent
          ),
      },
      {
        path: 'jsr',
        loadComponent: () =>
          import('./pages/jsr/jsr.component').then(
            (m) => m.JsrComponent
          ),
      },
      {
        path: 'time-by-job',
        loadComponent: () =>
          import('./pages/time-by-job/time-by-job.component').then(
            (m) => m.TimeByJobComponent
          ),
      },
      {
        path: 'tip',
        loadComponent: () =>
          import('./pages/tip/tip.component').then(
            (m) => m.TipComponent
          ),
      },
      {
        path: '',
        redirectTo: 'erl-glossary',
        pathMatch: 'full',
      },
    ],
  },
];
