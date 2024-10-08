import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/* import {
  cantBeAdmin,
  emailPattern,
  firstNameAndLastnamePattern,
} from '../../../shared/validators/validators'; */

import { ValidatorsService } from '../../../shared/service/validators.service';
import { EmailValidator } from '../../../shared/validators/email.validator.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent implements OnInit {
  public myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorsService,
    private emailValidator: EmailValidator
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.pattern(
              this.validatorService.firstNameAndLastnamePattern
            ),
          ],
        ],
        /* email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorService.emailPattern),
        ],
        [new EmailValidator()],
      ], */
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(this.validatorService.emailPattern),
          ],
          [this.emailValidator],
        ],
        username: [
          '',
          [Validators.required, this.validatorService.cantBeAdmin],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password2: ['', [Validators.required]],
      },
      {
        validators: [
          this.validatorService.isFieldOneEqualFieldTwo(
            'password',
            'password2'
          ),
        ],
      }
    );
  }

  isValidField(field: string) {
    return this.validatorService.isValidField(this.myForm, field);
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
  }
}
