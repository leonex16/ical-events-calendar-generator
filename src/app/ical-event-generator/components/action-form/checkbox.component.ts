import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'x-action-form-checkbox',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckBoxComponent),
      multi: true
    }
  ],
  template: `
  <ng-container *ngIf="formGroup" [formGroup]="formGroup">
    <label class="relative inline-flex items-center mb-0 sm:mb-5 cursor-pointer">
      <input [formControlName]="formControlName" type="checkbox" value="" class="sr-only peer">
      <div
        class="w-11 h-6 bg-gray-200 rounded-full outline outline-1 outline-transparent dark:outline-gray-300 peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
      </div>
      <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{{label | titlecase}}</span>
    </label>
  </ng-container>
  `,
})
export class CheckBoxComponent implements ControlValueAccessor {
  @Input() public formGroup?: FormGroup;
  @Input() public formControlName!: string;
  @Input() public label!: string;

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
}
