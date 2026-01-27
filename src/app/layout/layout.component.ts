import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {
  HlmSidebarInset,
  HlmSidebarService,
  HlmSidebarWrapper,
} from '@libs/ui/sidebar';
import {
  AppHeaderComponent
} from '../shared/components/app-header/app-header.component';
import { AppSidebarComponent } from '../shared/components/app-sidebar/app-sidebar.component';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    HlmSidebarWrapper,
    HlmSidebarInset,
    AppSidebarComponent,
    AppHeaderComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  private readonly router = inject(Router);
  readonly sidebarService = inject(HlmSidebarService);
}
