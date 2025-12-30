import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideAnchor,
  lucideShield,
  lucideUsers,
  lucideGlobe,
  lucideChevronRight,
  lucideLogIn,
} from '@ng-icons/lucide';
import { HlmButton } from '@libs/ui/button';
import { HlmIcon } from '@libs/ui/icon';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NgIcon, HlmButton, HlmIcon],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      lucideAnchor,
      lucideShield,
      lucideUsers,
      lucideGlobe,
      lucideChevronRight,
      lucideLogIn,
    }),
  ],
})
export class LandingComponent {
  readonly loginUrl =
    'https://localhost:44345/Auth/login?returnUrl=http%3A%2F%2Flocalhost%3A4200';

  onLogin(): void {
    window.location.href = this.loginUrl;
  }
}
