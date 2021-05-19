import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'src/app/modules/elementTools/interfaces/page';
import { MainServicesService } from '../../provider-services/main-services.service';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit {
  @Input() notificationsCount: number;
  @Input() categories: any[];
  public height: number = 80;
  public opacity: number = 12;
  public size: number = 30;
  public small: boolean = false;

  @Input() currentCategory: string;
  pic = "https://storage.googleapis.com/explorehub_photos/ExploreHub_1621218811350blob.jpg"
  @Output() changeCategory: EventEmitter<any> = new EventEmitter();
  public pages: Page[] = []


  constructor(public mainService: MainServicesService, public router: Router, public modalCtrl: ModalController) { }

  ngOnInit() {
    this.mainService.scrollDown.subscribe(data => {
      this.small = data >= 80
      this.height = 80 - data
      this.opacity = 12 - data
      this.size = 30 - data
    })
  }

  goTo(path, fromHome = false) {
    setTimeout(() => {
      const params = fromHome ? { queryParams: { formDashboard: true } } : {}
      this.router.navigate(path, params)
    }, 300);
  }

  getNotificationCount() {
    this.mainService.getNotificationsCount().subscribe(
      (response: any) => {
        this.notificationsCount = response
      }
    )
  }

  retrieveTouristSpotByCategory(category) {
    this.currentCategory = category 
    this.router.navigate(["/service-provider/online-pages-list"], { queryParams: { category: category } })
  }


}
