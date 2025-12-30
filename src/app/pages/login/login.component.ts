import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  effect,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideAnchor,
  lucideMail,
  lucideLock,
  lucideEye,
  lucideEyeOff,
  lucideLoader2,
} from '@ng-icons/lucide';
import { HlmInput } from '@libs/ui/input';
import { HlmButton } from '@libs/ui/button';
import { HlmLabel } from '@libs/ui/label';
import { HlmCheckbox } from '@libs/ui/checkbox';
import { HlmIcon } from '@libs/ui/icon';

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    NgIcon,
    HlmInput,
    HlmButton,
    HlmLabel,
    HlmCheckbox,
    HlmIcon,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      lucideAnchor,
      lucideMail,
      lucideLock,
      lucideEye,
      lucideEyeOff,
      lucideLoader2,
    }),
  ],
})
export class LoginComponent {
  // Form signals using Angular 21 patterns
  readonly email = signal('');
  readonly password = signal('');
  readonly rememberMe = signal(false);
  readonly showPassword = signal(false);
  readonly isLoading = signal(false);

  // Computed validation states
  readonly isEmailValid = computed(() => {
    const email = this.email();
    if (!email) return true; // Don't show error for empty field initially
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  });

  readonly isPasswordValid = computed(() => {
    const password = this.password();
    if (!password) return true; // Don't show error for empty field initially
    return password.length >= 6;
  });

  readonly isFormValid = computed(() => {
    const email = this.email();
    const password = this.password();
    return (
      email.length > 0 &&
      password.length > 0 &&
      this.isEmailValid() &&
      this.isPasswordValid()
    );
  });

  readonly passwordInputType = computed(() =>
    this.showPassword() ? 'text' : 'password'
  );

  // Track if fields have been touched
  readonly emailTouched = signal(false);
  readonly passwordTouched = signal(false);

  readonly showEmailError = computed(
    () => this.emailTouched() && !this.isEmailValid()
  );
  readonly showPasswordError = computed(
    () => this.passwordTouched() && !this.isPasswordValid()
  );

  constructor() {

    // Effect to log form state changes (for debugging)
    effect(() => {
      console.log('Form state:', {
        email: this.email(),
        rememberMe: this.rememberMe(),
        isValid: this.isFormValid(),
      });
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((show) => !show);
  }

  onEmailBlur(): void {
    this.emailTouched.set(true);
  }

  onPasswordBlur(): void {
    this.passwordTouched.set(true);
  }

  onSubmit(): void {
    // Mark all fields as touched
    this.emailTouched.set(true);
    this.passwordTouched.set(true);

    if (!this.isFormValid()) {
      return;
    }

    this.isLoading.set(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Login submitted:', {
        email: this.email(),
        password: '***',
        rememberMe: this.rememberMe(),
      });
      this.isLoading.set(false);
    }, 1500);
  }
}
