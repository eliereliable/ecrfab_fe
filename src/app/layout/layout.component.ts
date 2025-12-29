import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {
  HlmSidebarWrapper,
  HlmSidebarInset,
  HlmSidebarService,
} from '@libs/ui/sidebar';
import { AppSidebarComponent } from '../shared/components/app-sidebar/app-sidebar.component';
import {
  AppHeaderComponent,
  UserInfo,
} from '../shared/components/app-header/app-header.component';

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

  readonly currentUser: UserInfo = {
    name: 'John Smith',
    email: 'john.smith@ecrfab.com',
    initials: 'JS',
    role: 'Project Manager',
  };

  onLogout(): void {
    // Handle logout logic here
    console.log('Logging out...');
    this.router.navigate(['/login']);
  }
}
