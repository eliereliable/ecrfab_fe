import { Directive, computed, input } from '@angular/core';
import { BrnAvatarFallback } from '@spartan-ng/brain/avatar';
import { hlm } from '@spartan-ng/helm/utils';
import type { ClassValue } from 'clsx';

@Directive({
	selector: '[hlmAvatarFallback]',
	exportAs: 'avatarFallback',
	hostDirectives: [BrnAvatarFallback],
	host: {
		'[class]': '_computedClass()',
	},
})
export class HlmAvatarFallback {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });

	protected readonly _computedClass = computed(() => {
		return hlm('bg-muted flex size-full items-center justify-center rounded-full', this.userClass());
	});
}
