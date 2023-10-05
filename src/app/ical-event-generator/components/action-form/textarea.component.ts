import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'x-action-form-textarea',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true
    }
  ],
  template: `
  <ng-container *ngIf="formGroup" [formGroup]="formGroup">
    <label [for]="formControlName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
    <textarea [formControlName]="formControlName" [id]="formControlName" rows="5"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"></textarea>
  </ng-container>
  `,
})
export class TextAreaComponent implements ControlValueAccessor {
  @Input() public formGroup?: FormGroup;
  @Input() public formControlName!: string;

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
}
