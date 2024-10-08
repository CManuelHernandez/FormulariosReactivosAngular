import { FormControl } from '@angular/forms';

export const cantBeAdmin = (control: FormControl) => {
  const value: string = control.value.trim().toLowerCase();
  if (value === 'admin') {
    return {
      noAdmin: true,
    };
  }
  return null;
};
