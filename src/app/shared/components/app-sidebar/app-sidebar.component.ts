import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HlmIcon } from '@libs/ui/icon';
import {
  HlmSidebar,
  HlmSidebarContent,
  HlmSidebarGroup,
  HlmSidebarGroupContent,
  HlmSidebarHeader,
  HlmSidebarMenu,
  HlmSidebarMenuBadge,
  HlmSidebarMenuButton,
  HlmSidebarMenuItem,
  HlmSidebarMenuSub,
  HlmSidebarMenuSubButton,
  HlmSidebarMenuSubItem,
  HlmSidebarService,
} from '@libs/ui/sidebar';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCalendar,
  lucideChevronDown,
  lucideChevronRight,
  lucideClipboardList,
  lucideFileText,
  lucideLayoutDashboard,
  lucideSettings,
  lucideShip,
  lucideUsers,
  lucideWrench,
} from '@ng-icons/lucide';

export interface NavItem {
  label: string;
  icon: string;
  route?: string;
  children?: NavItem[];
  badge?: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIcon,
    HlmIcon,
    HlmSidebar,
    HlmSidebarContent,
    HlmSidebarGroup,
    HlmSidebarGroupContent,
    HlmSidebarHeader,
    HlmSidebarMenu,
    HlmSidebarMenuButton,
    HlmSidebarMenuItem,
    HlmSidebarMenuSub,
    HlmSidebarMenuSubButton,
    HlmSidebarMenuSubItem,
    HlmSidebarMenuBadge,
  ],
  templateUrl: './app-sidebar.component.html',
  styleUrl: './app-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      lucideLayoutDashboard,
      lucideShip,
      lucideUsers,
      lucideFileText,
      lucideSettings,
      lucideClipboardList,
      lucideWrench,
      lucideCalendar,
      lucideChevronDown,
      lucideChevronRight,
    }),
  ],
})
export class AppSidebarComponent {
  readonly sidebarService = inject(HlmSidebarService);

  readonly expandedItems = signal<Set<string>>(new Set());

  readonly navItems: NavItem[] = [
    {
      label: 'ERL Glossary',
      icon: 'lucideClipboardList',
      route: '/erl-glossary',
    },
    {
      label: 'USS Gravely Required Report Log',
      icon: 'lucideFileText',
      route: '/uss-gravely-required-report-log',
    },
    {
      label: 'USS Gravely WAF Log',
      icon: 'lucideClipboardList',
      route: '/uss-gravely-waf-log',
    },
    {
      label: 'CFR Log',
      icon: 'lucideShip',
      route: '/cfr-log',
    },
    {
      label: 'JSR',
      icon: 'lucideWrench',
      route: '/jsr',
    },
    {
      label: 'Time By Job',
      icon: 'lucideCalendar',
      route: '/time-by-job',
    },
    {
      label: 'TIP',
      icon: 'lucideUsers',
      route: '/tip',
    },
  ];

  toggleExpanded(label: string): void {
    this.expandedItems.update((set) => {
      const newSet = new Set(set);
      if (newSet.has(label)) {
        newSet.delete(label);
      } else {
        newSet.add(label);
      }
      return newSet;
    });
  }

  isExpanded(label: string): boolean {
    return this.expandedItems().has(label);
  }
}
