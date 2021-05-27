import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ElementValues } from '../../elementTools/interfaces/ElementValues';
import { PageCreatorService } from '../../page-creator/page-creator-service/page-creator.service';

@Component({
  selector: 'app-text-input-display',
  templateUrl: './text-input-display.component.html',
  styleUrls: ['./text-input-display.component.scss'],
})
export class TextInputDisplayComponent implements OnInit {
  @Input() values: ElementValues;
  @Input() hasError: boolean = false;
  @Input() errorMessage: string = "";
  @Output() emitEvent: EventEmitter<any> = new EventEmitter();
  constructor(public creator: PageCreatorService) { }

  ngOnInit() {
    this.validate()
  }

  validate() {
    console.log(this.values.data.type)
    if (this.values.data.defaultValue && this.values.data.type == "gmail") {
      const pt = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-z]{2,4}$');
      console.log(pt.test(this.values.data.defaultValue))
      if (!pt.test(this.values.data.defaultValue)) {
        this.hasError = true
        this.errorMessage = "Invalid Email"
      } else {
        this.hasError = false;
        this.errorMessage = ""
      }
      this.passData(this.hasError)
    } else if (this.values.data.defaultValue && this.values.data.required) { 
      this.hasError = false;
      this.errorMessage = ""
      this.passData()
    } 
    
  }
  passData(hassError = false) {
    
    this.emitEvent.emit({
      userInput: true,
      validationError: hassError,
      errorMessage: this.errorMessage,
      data: {
        inputId: this.values._id,
        inputFieldType: "text-input",
        inputLabel: this.values.data.label,
        settings: {},
        value: this.values.data.defaultValue
      }
    })
  }

}
