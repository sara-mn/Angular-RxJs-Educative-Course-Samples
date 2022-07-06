import {Component, OnInit} from '@angular/core';
import {FormControl, AbstractControl, ValidatorFn} from '@angular/forms';


@Component({
  selector: 'app-phone-num',
  templateUrl: './phone-num.component.html',
  styleUrls: ['./phone-num.component.scss']
})
export class PhoneNumComponent implements OnInit {
  phoneNumber = new FormControl("",[ (control: AbstractControl) => {
    // remove anything that isn't a digit
    const numDigits = control.value.replace(/[^\d]+/g, '').length;
    // Only worried about US-based numbers for now, no need for country code
    if (numDigits === 10) { return null; }
    // Uh oh, something's wrong
    if (numDigits > 10) {
      return {
        tooLong: { numDigits }
      };
    } else {
      return {
        tooShort: { numDigits }
      };
    }

  }]);

  constructor() {
    // this.phoneNumber.addValidators(this.firstValidation(control))
  }

  ngOnInit(): void {
  }

  // firstValidation (control: AbstractControl) : ValidatorFn {
  //   // remove anything that isn't a digit
  //   const numDigits = control.value.replace(/[^\d]+/g, '').length;
  //   // Only worried about US-based numbers for now, no need for country code
  //   if (numDigits === 10) {
  //     return null;
  //   }
  //   // Uh oh, something's wrong
  //   if (numDigits > 10) {
  //     return {
  //       tooLong: {numDigits}
  //     };
  //   } else {
  //     return {
  //       tooShort: {numDigits}
  //     };
  //   }
  // }
}
