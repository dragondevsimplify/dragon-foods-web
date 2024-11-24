import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidator {
  static urlValidator(control: AbstractControl): ValidationErrors | null {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' +
      '((localhost:\\d{1,5})|' +
      '([\\da-z.-]+)\\.([a-z.]{2,6}))' +
      '([\\/\\w .-]*)*\\/?$',
      'i'
    )
    const isValid = urlPattern.test(control.value)
    return isValid ? null : { invalidUrl: true }
  }
}

