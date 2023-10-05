import { Component, Input } from '@angular/core';

type Level = 'h1' | 'h2' | 'h3' | 'h4';

@Component({
  selector: 'x-heading',
  standalone: true,
  imports: [],
  template: `<div [innerHTML]="renderHeading()"></div>`,
})
export class HeadingComponent {
  @Input() public level!: Level;
  @Input() public content!: string;

  renderHeading() {
    const headings: Record<Level, string> = {
      'h1': `<h1 class="text-gray-900 dark:text-slate-100 text-3xl">${this.content}</h1>`,
      'h2': `<h2 class="text-gray-900 dark:text-slate-100 text-2xl">${this.content}</h2>`,
      'h3': `<h3 class="text-gray-900 dark:text-slate-100 text-xl">${this.content}</h3>`,
      'h4': `<h4 class="text-gray-900 dark:text-slate-100 text-lg">${this.content}</h4>`,
    };

    return headings[this.level];
  }
}
