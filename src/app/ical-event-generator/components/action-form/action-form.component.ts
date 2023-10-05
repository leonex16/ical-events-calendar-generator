import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

import { ButtonComponent } from '../../../shared/components/button/button.component';
import { LabelInputComponent } from '../../../shared/components/label-input/label-input.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

import { EventForm, } from '../../interfaces/event-form.interface';
import { MODES, Mode, } from '../../interfaces/mode.interface';
import { EventFormService } from '../../services/event-form.service';

import { CheckBoxComponent } from './checkbox.component';
import { TextAreaComponent } from './textarea.component';

@Component({
  standalone: true,
  selector: 'x-action-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    CheckBoxComponent,
    LabelInputComponent,
    TextAreaComponent,
    ModalComponent
  ],
  templateUrl: './action-form.component.html'
})

export class ActionFormComponent implements OnInit {
  public mode?: Mode;
  public highlightErrors = false;
  public modeMap= new Map<Mode, string>([
    ['new', 'Crear Evento'],
    ['edit', 'Editar Evento'],
  ]);
  public readonly eventForm = new FormGroup({
    title: new FormControl('Super buen evento', [Validators.required]),
    description: new FormControl('El mejor evento de CHILE'),
    allDay: new FormControl(false),
    startDate: new FormControl(new Date().toISOString().slice(0,-14)),
    endDate: new FormControl(new Date().toISOString().slice(0,-14)),
    startDatetime: new FormControl(new Date().toISOString().slice(0,-5)),
    endDatetime: new FormControl(new Date().toISOString().slice(0,-5)),
  });

  constructor(
    private readonly router: Router,
    private readonly activeRoute: ActivatedRoute,
    private readonly eventFormService: EventFormService,
  ) {}

  ngOnInit(): void {
    this.initializeMode();
  }

  onSubmit(): void {
    // if (!this.eventForm.touched || this.eventForm.invalid) {
    //   this.setHighlightErrors();
    //   return
    // };
    this.eventFormService.save(this.getEventFormData());
    this.onClose();
  }

  onClose(): void {
    this.router.navigate([''], {replaceUrl: true});
  }

  private initializeMode(): void {
    this.activeRoute.queryParams
      .pipe(
        filter(params => Boolean(params['mode'])),
        map(params => params['mode'].toLowerCase()),
        filter<Mode>(mode => MODES.includes(mode)),
      )
      .subscribe(mode => this.mode = mode);
  }

  private setHighlightErrors(): void {
    const errors = this.eventForm.get('title')!.errors;
    this.highlightErrors = Boolean(errors);
  }

  private getEventFormData(): EventForm {
    const form = this.eventForm.value;
    const { startDate, endDate, ...structWithDatetmie } = form;
    const { startDatetime, endDatetime, ...structWithDate } = form;

    return form.allDay
      ? structWithDate
      : structWithDatetmie
  }
}
