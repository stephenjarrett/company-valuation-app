import { FormGroup } from '@angular/forms';

export function getYearRange(): number[] {
  const max = new Date().getFullYear();
  const min = max - 300;
  return Array.from({ length: max - min + 1 }, (v, k) => k + min);
}

export function isNil(value: any): value is null | undefined {
  return value === null || typeof value === 'undefined';
}

export function toggleFormFieldsState(toggle: boolean, form: FormGroup) {
  const state = toggle ? 'enable' : 'disable';
  Object.keys(form.controls).forEach(key => {
    form.controls[key][state]();
  });
}
