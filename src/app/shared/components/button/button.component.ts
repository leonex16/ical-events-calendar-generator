import { Component, Input } from '@angular/core';

@Component({
  selector: 'x-button',
  standalone: true,
  imports: [],
  template: `
  <button
    [type]="type"
    class="px-5 py-2.5 text-sm font-medium text-white inline-flex justify-center items-center bg-{{color}}-600 hover:bg-{{color}}-700 focus:ring-2 focus:outline-none focus:ring-{{color}}-300 rounded-lg text-center dark:bg-{{color}}-600 dark:hover:bg-{{color}}-700 dark:focus:ring-{{color}}-600 w-full">
    <ng-content select="icon"></ng-content>
    <ng-content></ng-content>
  </button>`,
})
export class ButtonComponent {
  @Input() public color!: string;
  @Input() public type: string = 'button';
}
