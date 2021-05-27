import { Component, ComponentFactoryResolver, EventEmitter, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ViewWillEnter } from '@ionic/angular';
import { ElementComponent } from 'src/app/modules/elementTools/interfaces/element-component';
import { ElementValues } from 'src/app/modules/elementTools/interfaces/ElementValues';
import { InputValue } from 'src/app/modules/elementTools/interfaces/InputValues';
import { PageCreatorService } from 'src/app/modules/page-creator/page-creator-service/page-creator.service';
import { ChoicesInputDisplayComponent } from 'src/app/modules/page-input-field-display/choices-input-display/choices-input-display.component';
import { DateInputDisplayComponent } from 'src/app/modules/page-input-field-display/date-input-display/date-input-display.component';
import { NumberInputDisplayComponent } from 'src/app/modules/page-input-field-display/number-input-display/number-input-display.component';
import { TextInputDisplayComponent } from 'src/app/modules/page-input-field-display/text-input-display/text-input-display.component';
import { bookingData } from '../../provider-services/interfaces/bookingData';
import { MainServicesService } from '../../provider-services/main-services.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss', '../../../modules/page-creator/page-creator.component.scss'],
})
export class BookPage implements OnInit, ViewWillEnter {
  public bookingInfo: ElementValues[] = [];
  public bookingId: String;
  public pageType: string;
  public booking: any;
  public isManual: boolean = false;
  public pageId: string;
  public invalidInputs: any[] =[]
  public hasError: boolean = false
  public requiredInputs: any[] = []
  public fromDraft: boolean = false
  public update: boolean = false;
  public noServices: boolean;
  public inputValue: InputValue[] = [];
  components = {
    'text-input': TextInputDisplayComponent,
    'number-input': NumberInputDisplayComponent,
    'date-input': DateInputDisplayComponent,
    'choices-input': ChoicesInputDisplayComponent
  }
  @ViewChild('pageInputField', { read: ViewContainerRef }) pageInputField: ViewContainerRef;
  constructor(
    public route: ActivatedRoute,
    public mainService: MainServicesService,
    public creator: PageCreatorService,
    public alertController: AlertController,
    public router: Router,
    public componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.mainService.canLeave = false;
    this.route.queryParams.subscribe(params => {
      if (params) {
        if (params.edit) {
          this.mainService.canLeave = true
        }
        if (params.manual) {
          this.isManual = true
        }
        if (params.draft) {
          this.fromDraft = true;
        }
        // if (params.noServices) this.noServices = true
      }
    })

    this.route.paramMap.subscribe(params => {
      this.pageId = params.get('pageId');
      this.pageType = params.get('pageType');
      this.bookingId = params.get('bookingId')
      this.mainService.getPageBookingInfo({ pageId: this.pageId, pageType: this.pageType, bookingId: this.bookingId }).subscribe(
        (response: any) => {
          this.bookingInfo = response.bookingInfo;
          this.makeInputValueCont()
          this.booking = response.booking
          if (this.booking.status != "Unfinished" && this.booking.status != "Cancelled" && this.booking.status != "Rejected") {
            this.router.navigate(["/service-provider/bookings/Pending"])
          } else {
            this.noServices = this.booking.pageId.services.length == 0
            if (response.booking) {
              this.update = response.booking.bookingInfo.length > 0;
              if (response.booking.bookingInfo.length > 0) this.inputValue = response.booking.bookingInfo;
              this.setValues();
            }
            this.setPage();
          }
        }
      )
    })
  }

  setValues() {
    if (this.inputValue.length > 0) {
      this.inputValue.forEach(value => {
        this.bookingInfo = this.bookingInfo.map(input => {
          if (input._id == value.inputId) {
            input.data.defaultValue = value.value;
          }
          return input;
        })
      })
    }
  }

  ionViewWillEnter() {
    this.bookingInfo = [];
  }

  setPage() {
    if (this.pageInputField) this.pageInputField.clear()
    this.creator.preview = true;
    setTimeout(() => {
      this.bookingInfo.forEach((component: any) => {
        let hasError = false
        let error = ""
        this.requiredInputs.forEach(field => {
          if ((field['_id'] == component._id && !component.data.defaultValue && component.data.required)  || (field['_id'] == component._id && field['_id'] == component._id)) {
            hasError = true
            error = field['errorMessage']
          }
        })
        this.renderComponent(component, "page_booking_info", hasError, error)
      })
    }, 100);
  }

  renderComponent(componentValues: any, parent, hasError = false, error) {
    if (componentValues.type) {
      const factory = this.componentFactoryResolver.resolveComponentFactory<ElementComponent>(this.components[componentValues.type]);
      const comp = this.pageInputField.createComponent<ElementComponent>(factory);
      comp.instance.values = componentValues.unSaved ? null : componentValues;
      comp.instance.parentId = this.pageId
      comp.instance.parent = parent;
      comp.instance.hasError = hasError
      comp.instance.errorMessage = error
      comp.instance.emitEvent = new EventEmitter();
      comp.instance.emitEvent.subscribe(data => this.catchEvent(data))
    }
  }

  makeInputValueCont() {
    this.bookingInfo.forEach(data => {
      let value: InputValue;
      value = {
        inputFieldType: data.type,
        inputId: data._id,
        value: data.data.defaultValue,
        inputLabel: data.data.label,
        settings: {}
      }
      this.inputValue.push(value)
    })
  }

  catchEvent(data) {
    if (data.userInput) {
      
      if (data.validationError) {
        console.log("1")
        this.invalidInputs = this.invalidInputs.filter(input => data.data.inputId != input['_id'])
        this.invalidInputs.push({_id: data.data.inputId, errorMessage: data.errorMessage})
      } else {
          console.log("2")
          this.invalidInputs = this.invalidInputs.filter(input => data.data.inputId != input['_id'])
      }
      console.log(this.invalidInputs)
      let updated = false;
      this.inputValue = this.inputValue.map((val: InputValue) => {
        if (val.inputId == data.data.inputId) {
          val = data.data
          updated = true;
        }
        return val;
      })
      if (!updated) {
        this.inputValue.push(data.data);
      }
    
    }

  }

  validateStateAndEndDate() {
    let startDate = null
    let endDate = null
    let curDate = new Date()
    let hasError = false
    this.bookingInfo.forEach(data => {
      if (data.type == "date-input") {
        if (data.data.type == "startDate") startDate = startDate ? startDate : data
        if (data.data.type == "endDate") endDate = endDate ? endDate : data

      }
    })

    let startDateValue = null
    let endDateValue = null
    this.inputValue.forEach(value => {
      if (startDate && value.inputId == startDate._id) startDateValue = value.value
      if (endDate && value.inputId == endDate._id) endDateValue = value.value
    })

    if (startDateValue) {
      console.log(startDateValue)
      startDateValue = new Date(startDateValue.month.text+". "+startDateValue.day.text+", "+startDateValue.year.text+", "+ startDateValue.hour.text+":"+startDateValue.minute.text+" "+startDateValue.ampm.text)
    }
    if (endDateValue) {
      endDateValue = new Date(endDateValue.month.text+". "+endDateValue.day.text+", "+endDateValue.year.text+", "+ endDateValue.hour.text+":"+endDateValue.minute.text+" "+endDateValue.ampm.text)
    }


    if (startDateValue && startDateValue < curDate) {
      this.requiredInputs.push({_id: startDate._id,errorMessage:  `Invalid date`})
      hasError = true
    } if (endDateValue && endDateValue < curDate) {
      hasError = true
      this.requiredInputs.push({ _id: endDate._id, errorMessage: `Invalid date`})
    } else if (startDateValue && endDateValue && startDateValue >= endDateValue) {
      hasError = true

      this.requiredInputs.push({_id: startDate._id, errorMessage: "Invalid date range"})
      this.requiredInputs.push({_id: endDate._id, errorMessage: "Invalid date range"})
    }  

    return hasError

  }

  submitBooking() {
    const requiredFields = []
    const requiredInputs = []
    let hasError = false
    this.bookingInfo.forEach(data => {
      if (data.data.required) {
        let hasValue = false;
        this.inputValue.forEach(value => {
          if (value.inputId == data._id && value.value || data.data.defaultValue) {
            hasValue = true;
          }
        })
        if (!hasValue) {
          // if (data.data.defaultValue) {
          //   const value: InputValue = {
          //     inputLabel: data.data.label, inputId: data._id, inputFieldType: data.type, value: data.data.defaultValue, settings: {}
          //   }
          //   this.inputValue.push(value)
          // }
          requiredInputs.push({_id: data._id, errorMessage: "This field is required"})
          requiredFields.push(data.data.label)
          hasError = true
        }
      }
    })
    this.requiredInputs = requiredInputs
    let inValidDates = this.validateStateAndEndDate()
    console.log("hassError:",hasError) 
    console.log("invalid inputs:",this.invalidInputs) 
    hasError = inValidDates ? inValidDates : hasError
    if (this.invalidInputs.length > 0) hasError = true
    this.requiredInputs = [...this.requiredInputs, ...this.invalidInputs]
    console.log(this.requiredInputs)
    if (!hasError) {
      setTimeout(() => {
        this.mainService.canLeave = true;
        this.mainService.addBookingInfo(this.bookingId, this.inputValue).subscribe(
          (response: bookingData) => {
            let params = { queryParams: {} }
            if (this.isManual) params.queryParams["manual"] = true
            if (this.fromDraft) params.queryParams["draft"] = true
            this.router.navigate(["/service-provider/booking-review", this.pageId, this.pageType, this.bookingId], params)
          }
        )
      }, 100);
    } else {
      // if (requiredFields.length > 0) {

      //   const error = "Required field" + (requiredFields.length > 1 ? "s" : "") + ": " + requiredFields.join(", ");
      //   this.presentAlert(error);
      // }
      // if (this.invalidInputs.length == 0) {
        this.setValues();
        this.setPage();
      // }
    }

  }
  editSelectedServices() {
    this.mainService.canLeave = true;
    let params = { queryParams: {} }
    if (this.isManual) params.queryParams["manual"] = true
    if (this.fromDraft) params.queryParams["draft"] = true
    this.router.navigate(["/service-provider/select-service", this.pageId, this.bookingId], params)
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: message,
      buttons: ["OK"],
    });
    await alert.present();
  }

}
