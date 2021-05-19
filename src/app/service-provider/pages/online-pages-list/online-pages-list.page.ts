import { Component, HostListener, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { Page } from 'src/app/modules/elementTools/interfaces/page';
import { MainServicesService } from '../../provider-services/main-services.service';

@Component({
  selector: 'app-online-pages-list',
  templateUrl: './online-pages-list.page.html',
  styleUrls: ['./online-pages-list.page.scss'],
})
export class OnlinePagesListPage implements OnInit, ViewWillEnter {
  public pages: Page[] = []
  notificationsCount = 0
  public category: string = "all"
  public loading: boolean = true
  @HostListener('scroll', ['$event', 'list'])

  public categories = []
  constructor(public router: Router, public route: ActivatedRoute, public mainService: MainServicesService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.category = params && params.category ? params.category : "all"
      this.mainService.getOnlinePages(this.category).subscribe(
        (response: Page[]) => {
          this.pages = response;
          this.loading = false
        }
      )
      this.getNotificationCount()
      this.mainService.notification.subscribe(
        (data: any) => {
          if (!data.receiver.includes("all")) {
            this.getNotificationCount()
          }
        }
      )
    })

  }
  scrollHandler(event, list) {
    this.mainService.scrollDown.emit(list.scrollTop)
  }

  ionViewWillEnter() {
    this.getAllCategories()
    this.getNotificationCount()
  }

  getNotificationCount() {
    this.mainService.getNotificationsCount().subscribe(
      (response: any) => {
        this.notificationsCount = response
      }
    )
  }

  getAllCategories() {
    this.mainService.getAllCategories().subscribe(
      (response: any) => {
        this.categories = response.categories.filter(category => category.touristSpots.length > 0)

        this.categories = this.categories.map(category => {
          const touristSpots = category.touristSpots
          if (touristSpots.length > 0) {
            
            // const spot = touristSpots[Math.floor(Math.random() * (touristSpots.length - 1))];
            let index = Math.floor(Math.random() * touristSpots.length)
            let spot = touristSpots[index]
            if (spot && spot.components) {
              

              spot.components.forEach(element => {
                if (element.type == "photo") {
                  if (!category["coverPhoto"]) category["coverPhoto"] = element.data[0].url
                }
              });
            }
          }
          return category
        })
      }
    )
  }

  viewPage(page) {
    this.router.navigate(['/service-provider/view-page', page.pageId, page.pageType])
  }

  onChangeCategory(data) {
    this.pages = data.pages
  }

}
