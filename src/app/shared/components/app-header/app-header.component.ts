import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  output,
} from '@angular/core';
import { HlmAvatar, HlmAvatarFallback, HlmAvatarImage } from '@libs/ui/avatar';
import { HlmButton } from '@libs/ui/button';
import {
  HlmDropdownMenu,
  HlmDropdownMenuItem,
  HlmDropdownMenuLabel,
  HlmDropdownMenuSeparator,
  HlmDropdownMenuTrigger,
} from '@libs/ui/dropdown-menu';
import { HlmIcon } from '@libs/ui/icon';
import { HlmSidebarService, HlmSidebarTrigger } from '@libs/ui/sidebar';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { AppBreadcrumbComponent } from '../app-breadcrumb/app-breadcrumb.component';
import {
  lucideBell,
  lucideChevronDown,
  lucideLogOut,
  lucideMenu,
  lucideSettings,
  lucideUser,
} from '@ng-icons/lucide';
import { SecurityService } from '../../../core/services/security.service';

export interface UserInfo {
  name: string;
  email: string;
  avatar?: string;
  initials: string;
}

@Component({
  selector: 'app-header',
  imports: [
    NgIcon,
    HlmIcon,
    HlmButton,
    HlmSidebarTrigger,
    HlmAvatar,
    HlmAvatarImage,
    HlmAvatarFallback,
    HlmDropdownMenu,
    HlmDropdownMenuTrigger,
    HlmDropdownMenuItem,
    HlmDropdownMenuLabel,
    HlmDropdownMenuSeparator,
    AppBreadcrumbComponent,
  ],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      lucideMenu,
      lucideBell,
      lucideLogOut,
      lucideUser,
      lucideSettings,
      lucideChevronDown,
    }),
  ],
})
export class AppHeaderComponent {
  readonly sidebarService = inject(HlmSidebarService);
  readonly securityService = inject(SecurityService);

  readonly logout = output<void>();

  // Computed user info from SecurityService
  readonly user = computed<UserInfo>(() => {
    const userName = this.securityService.userName() || 'User';
    const email = this.securityService.email() || '';
    const initials = this.getInitials(userName);

    return {
      name: userName,
      email: email,
      initials: initials,
    };
  });

  /**
   * Generate initials from user name
   * @param name Full name of the user
   * @returns Initials (max 2 characters)
   */
  private getInitials(name: string): string {
    if (!name) return 'U';
    
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  onLogout(): void {
    this.securityService.logout();
    this.logout.emit();
  }
}
