import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ElementValues } from '../../elementTools/interfaces/ElementValues';
import { PageCreatorService } from '../../page-creator/page-creator-service/page-creator.service';

@Component({
  selector: 'app-number-input-display',
  templateUrl: './number-input-display.component.html',
  styleUrls: ['./number-input-display.component.scss'],
})

export class NumberInputDisplayComponent implements OnInit {
  @Input() values: ElementValues;
  @Input() hasError: boolean = false;
  @Input() errorMessage: string = "";
  @Output() emitEvent: EventEmitter<any> = new EventEmitter();
  min = null;
  message = null
  max = null;
  number: number = null;
  constructor(
    public toastController: ToastController,
    public alert: AlertController,
    public creator: PageCreatorService) { }

  ngOnInit() {

    let data = this.values.data;
    this.min = data.min != null ? data.min : null;
    this.max = data.max != null ? data.max : null;
    this.number = this.values.data.defaultValue
    if (this.values.data.type == "otherType") {
      this.message = "Only accepts value";
      if (this.min && this.max && this.min == this.max) {
        this.message += ` with the length of ${this.max}`

      } else if (this.min && this.max && this.min != this.max) {
        this.message += ` with the length not less than ${this.min} and not more ${this.max}`
      } else if (this.min) {
        this.message += ` with the length not less than ${this.min}`
      } else if (this.max) {
        this.message += ` with the length not more than ${this.min}`
      }
    } else if (this.values.data.type == "mobileNumber") {
      this.message = "Invalid Phone Number"
    } else {
      this.message = "Only accepts value";
      if (this.min && this.max) {
        this.message += ` between ${this.min} and ${this.max}`
      } else if (this.min) {
        this.message += ` above ${this.min}`
      } else if (this.max) {
        this.message += ` below ${this.max}`
      }
    }
    if (this.number) {
      this.finalValidation()
    }
    if (this.errorMessage) {
      this.message = this.errorMessage
    }
  }


  validate() {
    // if (!this.values.data.type) {
    //   if ((this.max != null && this.number > this.max) || (this.min != null && this.number < this.min)) {
    //     this.hasErrors = true;
    //   }
    //   else {
    //     this.hasErrors = false
    //   }
    // } else if (this.values.data.type == "otherType") {

    // }
  }

  finalValidation() {
    if (!this.values.data.type) {

      if ((this.max != null && this.number > this.max) || (this.min != null && this.number < this.min)) {
        this.presentAlert(this.message)
      } else {
        this.hasError = false;
        this.passData();
      }
    } else {
      const number = (this.number + "").split("")
      let hasAlpha = false
      number.forEach(char => {
        if (char.toLowerCase() != char.toUpperCase()) {
          hasAlpha = true
        }
      })
      if (hasAlpha) {
        this.message = "Invalid value"
        this.presentAlert(this.message)
      } else {
        if (this.values.data.type == "mobileNumber") {
          if ((number.length == 11 && number[0] == "0") || (number.length == 12 && number[0] != "0")) {
            this.hasError = false
            this.passData();
          } else {
            this.presentAlert(this.message)
          }

        } else {
          const number = (this.number + "").split("")
          if ((this.max != null && number.length > this.max) || (this.min != null && number.length < this.min)) {
            this.presentAlert(this.message)
          } else {
            this.hasError = false
            this.passData();
          }
        }
      }
    }
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }


  async presentAlert(message) {
    // const alert = await this.alert.create({
    //   cssClass: "my-custom-class",
    //   header: message,
    //   buttons: ["OK"],
    // });
    // await alert.present();
    this.hasError = true;
    this.passData(true)
  }

  passData(validationError = false) {
    this.emitEvent.emit({
      userInput: true,
      validationError: validationError,
      errorMessage: this.errorMessage,
      data: {
        inputId: this.values._id,
        inputFieldType: "number-input",
        inputLabel: this.values.data.label,
        settings: {},
        value: this.number
      }
    })
  }
}
