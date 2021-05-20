import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'src/app/modules/elementTools/interfaces/page';
import { AuthService } from 'src/app/services/auth-services/auth-service.service';
import { MainServicesService } from '../provider-services/main-services.service';

@Component({
  selector: 'app-page-list-card',
  templateUrl: './page-list-card.component.html',
  styleUrls: ['../list-of-pages/list-of-pages.page.scss'],
})
export class PageListCardComponent implements OnInit {
  @Input() page: Page;
  @Output() viewPage: EventEmitter<any> = new EventEmitter();
  @Output() clickOption: EventEmitter<any> = new EventEmitter();
  @Input() searchResult: boolean;
  public bookings: number = 0
  public quantity: number = 0
  public manuallyBooked: number = 0
  public pending: number = 0
  public available:number = 0
  public processing: number = 0
  public pageName: string = "--------"
  public pageDescription: string = ""
  constructor(public router: Router, public mainService: MainServicesService, public authService: AuthService) { }

  ngOnInit() { 
    if (this.page) {
      this.pageName = this.getValue("pageName")
      this.pageDescription = this.getValue("description")
      if (this.page['pageServices']) {

        this.page['pageServices'].forEach(service => {
          if (service.type == "item") {
            this.bookings += service.booked? service.booked: 0
            this.processing += service.toBeBooked? service.toBeBooked : 0
            this.pending += service.pending?service.pending: 0
            this.manuallyBooked += service.manuallyBooked? service.manuallyBooked: 0
        
            service.data.forEach(element => {
              if (element.data.defaultName == "quantity") {
                this.quantity += element.data.text ? parseInt(element.data.text): 0
                
              }
            });
          }
        })
        this.available = this.quantity - (this.bookings + this.pending + this.processing+ this.manuallyBooked)
      }
    }
  }

  getValue(type) {
    let value = "";
    this.page.components.forEach(comp => {

      if (comp.data.defaultName == type) {
        value = comp.data.text
      }
    })
    return value
  }


  view(page) {
   this.viewPage.emit(page)
  }

  clickOpt(e, id) {
    e.stopPropagation()
    setTimeout(() => {
      this.clickOption.emit(id)
    }, 200);
  }

  getStatus(page) {
    const status = page.status;
    return {
      'onlineBg': status == 'Online',
      'pendingBg': status == 'Pending',
      'unfinishedBg': status == 'Unfinished',
      'processingBg': status == 'Processing',
      'notOperatingBg': status == "Not Operating",
      'rejectedBg': status == 'Rejected' || status == 'Cancelled'
    }
  }
}
