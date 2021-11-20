import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { MainServicesService } from '../../provider-services/main-services.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
})
export class BoardPage implements OnInit {
  @ViewChild('tab', { read: ViewContainerRef }) tab: ViewContainerRef;
  @ViewChild('tabmenu', { read: ViewContainerRef }) menu: ViewContainerRef;
  @ViewChild('pending', { read: ViewContainerRef }) pending: ViewContainerRef;
  @ViewChild('booked', { read: ViewContainerRef }) booked: ViewContainerRef;
  @ViewChild('cancelled', { read: ViewContainerRef }) cancelled: ViewContainerRef;
  @ViewChild('Rejected', { read: ViewContainerRef }) Rejected: ViewContainerRef;
  @ViewChild('closed', { read: ViewContainerRef }) closed: ViewContainerRef;
  @ViewChild('statistics', { read: ViewContainerRef }) statistics: ViewContainerRef;
  @ViewChild('processing', { read: ViewContainerRef }) processing: ViewContainerRef;

  public clickedTab: string = 'Pending'
  public boxPosition: number;
  public tabWidth: number;
  public hideLeft: boolean = false;
  public hideRight: boolean = false;
  public height: any = window.innerHeight - 177;

  constructor(public router: Router, public mainService: MainServicesService) { }

  // ngAfterViewInit() {
  //   this.init()
  // }

  ngOnInit() {
    this.init()
    this.mainService.goToCurrentTab.subscribe(currentTab => {
      setTimeout(() => {
        this.goToCurrentTab(currentTab)
        if (currentTab != this.clickedTab) {
          this.goToSection(currentTab, this.tab.element.nativeElement);
          this.tabWidth = this.menu.element.nativeElement.scrollLeft

        }
      }, 200);
    })
  }


  init() {
    setTimeout(() => {
      const url = this.router.url.split('/').reverse();
      const path = url[0];
      let currentTab = path[0].toUpperCase() + path.substring(1);
      currentTab = currentTab.includes("?") ? currentTab.split("?")[0] : currentTab;
      if (this.tab) {
        this.goToSection(currentTab, this.tab.element.nativeElement);
        this.goToCurrentTab(currentTab)
      }
    }, 500);
  }

  goToCurrentTab(currentTab) {
    switch (currentTab) {
      case 'Closed':
        this.closed.element.nativeElement.scrollIntoView()
        break;
      case 'Booked':
        this.booked.element.nativeElement.scrollIntoView()
        break;
      case 'Processing':
        this.processing.element.nativeElement.scrollIntoView()
        break;
      case 'Pending':
        this.pending.element.nativeElement.scrollIntoView()
        break;
      case 'Cancelled':
        this.cancelled.element.nativeElement.scrollIntoView()
        break;
      case 'Rejected':
        this.cancelled.element.nativeElement.scrollIntoView()
        break;
      case 'Statistics':
        this.statistics.element.nativeElement.scrollIntoView()
        break;
      default:
        break;
    }
  }

  goToSection(tab: string, div: HTMLElement, url = null) {
    const width = 110
    this.clickedTab = tab
    if (url) {
      const currentPage = this.mainService.currentPage
      const route = ["/service-provider/dashboard/" + currentPage.pageType + "/" + currentPage._id + "/board/" + url[0]]
      if (url.length > 1) route.push(url[1])
      this.router.navigate(route)
    }
    switch (tab) {
      case 'Pending':
        this.boxPosition = 0;
        break;
      case 'Processing':
        this.boxPosition = width;
        break;
      case 'Booked':
        this.boxPosition = width * 2;
        break;
      case 'Closed':
        this.boxPosition = width * 3;
        break;
      case 'Cancelled':
        this.boxPosition = width * 4;
        break;
      case 'Rejected':
        this.boxPosition = width * 5;
        break;
      default:
        this.boxPosition = width * 6
        break;
    }
  }

  scrollTo(right = false) {
    this.menu.element.nativeElement.scrollLeft = this.menu.element.nativeElement.scrollLeft + (right ? 340 : -340)
    this.hideLeft = this.menu.element.nativeElement.scrollLeft == 0
    this.hideRight = this.menu.element.nativeElement.scrollLeft == 340
  }

}

