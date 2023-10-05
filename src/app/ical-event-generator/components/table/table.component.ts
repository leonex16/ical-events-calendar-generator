import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormArray } from '@angular/forms';

import { DropdownComponent, OnAction } from './dropdown.component';

export { OnAction } from './dropdown.component';

@Component({
  selector: 'x-table',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownComponent
  ],
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {
  @Input() public headers!: string[];
  @Input() public rows!: string[][];

  @Output() public onAction = new EventEmitter<OnAction>();

  public tableForm = new FormGroup({
    selectAll: new FormControl(false),
    rows: new FormArray([]),
  });

  ngOnInit(): void {
    this.initializeRowsForm();
  }

  getRowsForm(): FormArray {
    return this.getFormControl<FormArray>('rows');
  }

  actionHandler(onAction: OnAction): void {
    this.onAction.emit(onAction);
  }

  private getFormControl<T = FormControl>(name: string): T{
    return this.tableForm.get(name) as T;
  }

  private initializeRowsForm(): void {
    this.getRowsForm().clear();
    const rowsControls = this.rows.map(this.createRowControl);
    rowsControls.forEach(control => this.getRowsForm().push(control));
  }

  private createRowControl(): FormControl<boolean | null> {
    return new FormControl(false);
  }
}
