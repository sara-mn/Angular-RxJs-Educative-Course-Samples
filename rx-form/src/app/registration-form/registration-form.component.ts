import {Component, OnInit} from '@angular/core';
import {AbstractControl, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {debounceTime, map} from 'rxjs';
import {HttpService} from '../services/http.service';
const addressModel = {
  street: ['', Validators.required],
  apartment: [''],
  city: ['', Validators.required],
  state: ['', Validators.required],
  zip: ['', [
    Validators.required,
    Validators.pattern(/\d{5}/)
  ]]
};

const ccModel = {
  cc: ['', [
    Validators.required,
    (ac: AbstractControl) => {
      // Convert string to array of digits
      const ccArr: number[] = ac.value.split('').map((digit:any) => Number(digit));
      // double every other digit, starting from the right
      let shouldDouble = false;
      const sum = ccArr.reduceRight((accumulator:number, item:number) => {
        if (shouldDouble) {
          item = item * 2;
          // sum the digits, tens digit will always be one
          if (item > 9) {
            item = 1 + (item % 10);
          }
        }
        shouldDouble = !shouldDouble;
        return accumulator + item;
      }, 0);

      if (sum % 10 !== 0) {
        return { ccInvalid: true };
      }
    }
  ]],
  cvc: ['', Validators.required],
  expirationMonth: ['', [
    Validators.required,
    Validators.min(1),
    Validators.max(12)
  ]],
  expirationYear: ['', [
    Validators.required,
    Validators.min((new Date()).getFullYear())
  ]]
};
@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  registrationForm: UntypedFormGroup;
  endpoint: string = '';

  constructor(private formBuilder: UntypedFormBuilder,
              private httpService: HttpService) {
    const checkAddress = (control: AbstractControl) => {
      const address = {
        street: control.get('street')?.value,
        apartment: control.get('apartment')?.value,
        city: control.get('city')?.value,
        state: control.get('state')?.value,
        zip: control.get('zip')?.value
      };
      return this.httpService.get(this.endpoint + 'reactiveForms/addressCheck/' + address)
        .pipe(
          debounceTime(333),
          map((res: any) => {
            if (!res.validAddress) {
              return {invalidAddress: true};
            }
          })
        );
    };
    this.registrationForm = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(5)],
        [(control: AbstractControl) => {
          return this.httpService.get<any>(this.endpoint + '/' + control.value)
            .pipe(
              map((res: any) => {
                if (res.taken) {
                  return {usernameTaken: true};
                }
              })
            );
        }]
      ],
      password: ['', [
        Validators.required,
        Validators.minLength(12),
        (control: AbstractControl) => {
          const currentVal: string = control.value;
          // Password must contain at least three of the four options
          // Uppercase, lowercase, number, special symbol
          let matches = 0;
          if (currentVal.match(/[A-Z]+/)) {
            matches++;
          }
          if (currentVal.match(/[a-z]+/)) {
            matches++;
          }
          if (currentVal.match(/\d+/)) {
            matches++;
          }
          if (currentVal.replace(/[A-Za-z0-9]/g, '')) {
            matches++;
          }
          if (matches < 3) {
            return {passwordComplexityFailed: true};
          }

        }
      ]],
      confirmPassword: ['', [
        Validators.required
      ]],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern(/^[1-9]\d{2}-\d{3}-\d{4}/),
        (control: AbstractControl) => {
          // remove anything that isn't a digit
          const numDigits = control.value.replace(/[^\d]+/g, '').length;
          // Only worried about US-based numbers for now, no need for country code
          if (numDigits === 10) {
            return null;
          }
          // Uh oh, something's wrong
          if (numDigits > 10) {
            return {
              tooLong: {numDigits}
            };
          } else {
            return {
              tooShort: {numDigits}
            };
          }

        }]],
      email: ['', [
        Validators.email,
        Validators.required
      ]],
      addresses: this.formBuilder.array([
        this.formBuilder.group(addressModel, {
          asyncValidator: checkAddress
        })
      ]),
      creditCard: this.formBuilder.group(ccModel)
    }, {
      validators: (ac: AbstractControl) => {
        const pw = ac.get('password')?.value;
        const cpw = ac.get('confirmPassword')?.value;
        if (pw !== cpw) {
          ac.get('confirmPassword')?.setErrors({passwordMismatch: true});
        }
      }
    });
  }

  ngOnInit(): void {
    if (window.localStorage.registrationForm) {
      this.registrationForm.setValue(
        JSON.parse(window.localStorage.registrationForm));
    }

    this.registrationForm.valueChanges
      .subscribe((newForm : any) => {
        window.localStorage.registrationForm = JSON.stringify(newForm);
      });
  }

  get username() {
    return this.registrationForm.get('username');
  }

  get phoneNumber() {
    return this.registrationForm.get('phoneNumber');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword');
  }

  get addresses() {
    return this.registrationForm.get('addresses') as UntypedFormArray;
  }

  addAddress() {
    this.addresses.push(this.formBuilder.group(addressModel));
  }

  save() {
    return this.httpService.post(this.endpoint + 'reactiveForms/user/save',
      this.registrationForm.value)
      .subscribe(
        next => window.localStorage.registrationForm = '',
        err => console.log(err),
        () => console.log('done')
      );
  }
}
