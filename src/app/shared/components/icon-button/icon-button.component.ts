import { Component, Input } from '@angular/core';

@Component({
  selector: 'x-icon-button',
  standalone: true,
  imports: [],
  template: `
  <button type="button" class="text-{{color}}-700 border border-{{color}}-700 hover:bg-{{color}}-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-{{color}}-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center dark:border-{{color}}-500 dark:text-{{color}}-500 dark:hover:text-white dark:focus:ring-{{color}}-800 dark:hover:bg-{{color}}-500 m-auto">
    <span class="material-symbols-outlined">
      {{materialIcon}}
    </span>
    <span class="sr-only">{{materialIcon}} Icon</span>
  </button>`,
})
export class IconButtonComponent {
  @Input() public color!: string;
  @Input() public materialIcon!: string;
}
