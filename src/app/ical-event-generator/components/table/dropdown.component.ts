import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';

type Action = 'edit' | 'clone' | 'schedule' | 'remove';

export interface OnAction {
  action: Action,
  payload: Record<'id', string>;
}

@Component({
  selector: 'x-table-dropdown',
  standalone: true,
  template: `
  <ng-container>
    <button
      (click)="onToggleMenu()"
      class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      type="button">
      <span class="material-symbols-outlined">
        more_vert
      </span>
    </button>

    <!-- Dropdown menu -->
    <div
      [class]="{ 'hidden': !toggleMenu }"
      class="z-10 absolute top-[58px] right-[32%] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
        <li>
          <button (click)="clickHandler('edit')" class="flex gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">
            <span class="material-symbols-outlined">edit</span>
            Editar
          </button>
        </li>
        <li>
          <button (click)="clickHandler('clone')" class="flex gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">
            <span class="material-symbols-outlined">content_copy</span>
            Duplicar
          </button>
        </li>
        <li>
          <button (click)="clickHandler('schedule')" class="flex gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">
            <span class="material-symbols-outlined">schedule</span>
            Programar
          </button>
        </li>
        <li>
          <button (click)="clickHandler('remove')" class="flex gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">
            <span class="material-symbols-outlined">delete</span>
            Borrar
          </button>
        </li>
      </ul>
    </div>
  </ng-container>
  `,
})
export class DropdownComponent implements AfterViewInit, OnDestroy {
  @Input() id!: string;
  @Output() onAction = new EventEmitter<OnAction>();

  public toggleMenu = false;
  private subscriptions: Subscription[] = [];

  ngAfterViewInit(): void {
    this.onEscapeKeyDown();
  }

  ngOnDestroy(): void {
    this.clearSubscriptions();
  }

  onToggleMenu(open?: boolean): void {
    this.toggleMenu = open ?? !this.toggleMenu;
    if (!this.toggleMenu) return;
    setTimeout(() => this.onToggleMenu(false), 3000);
  }

  clickHandler(action: Action): void {
    this.onAction.emit({ action: action, payload: { id: this.id }})
    this.onToggleMenu();
  }

  private onEscapeKeyDown(): void {
    const subscription = fromEvent<KeyboardEvent>(document.body, 'keydown')
      .subscribe(({ key }) =>
        key === 'Escape' && this.onToggleMenu(false))
    this.subscriptions.push(subscription);
  }

  private clearSubscriptions(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe())
  }
}
