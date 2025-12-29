import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
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

export interface UserInfo {
  name: string;
  email: string;
  avatar?: string;
  initials: string;
  role: string;
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

  readonly user = input<UserInfo>({
    name: 'John Doe',
    email: 'john.doe@ecrfab.com',
    initials: 'JD',
    role: 'Project Manager',
  });

  readonly logout = output<void>();

  onLogout(): void {
    this.logout.emit();
  }
}
