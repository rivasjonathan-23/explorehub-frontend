import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { MainServicesService } from '../../provider-services/main-services.service';
import { popupData } from '../../view-booking-as-provider/view-booking-as-provider.page';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss'],
})
export class ConfirmPopupComponent implements OnInit {
  @Input() popupData: popupData;
  @Output() clicked:EventEmitter<any> = new EventEmitter()
  constructor(public mainService: MainServicesService) {
    this.popupData = {
      title:"",
      type: '',
      otherInfo: "",
      show: false
    }
   }

  ngOnInit() {
    this.mainService.noNetwork.subscribe(data => {
      if (data) {

        this.popupData = {
          title: "Please connect to a network",
          type: 'info',
          otherInfo: 'Check your internet connection',
          show: true
        }
      }
    })
  }

  click(e, action) {
    e.stopPropagation()
    setTimeout(() => {
      if (this.popupData.type == "info") this.popupData.show = false
      this.clicked.emit(action)
    }, 200);
  }

  close(e) {
    e.stopPropagation()
    this.clicked.emit("no")
  }
}
