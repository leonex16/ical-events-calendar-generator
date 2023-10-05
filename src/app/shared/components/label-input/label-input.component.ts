import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'x-label-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LabelInputComponent),
      multi: true
    }
  ],
  template: `
  <ng-container *ngIf="formGroup" [formGroup]="formGroup">
    <label [for]="formControlName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ label | titlecase }}</label>
    <input [formControlName]="formControlName" [type]="type" [id]="formControlName"
      class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  </ng-container>
  `,
})
export class LabelInputComponent implements ControlValueAccessor {
  @Input() public formGroup?: FormGroup;
  @Input() public formControlName!: string;
  @Input() public label!: string;
  @Input() public type: string = 'text';

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
}
